import React, {useEffect, useState} from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Spinner} from "@nextui-org/react";
import {FaBackward, FaSave} from "react-icons/fa";
import CustomButton from "../../../../../ui/CustomButton.jsx";
import {useRecoilState} from "recoil";
import {checkOperationsBalancing, listVideosOperations, videoShow} from "../../../../../infraestructure/states/states_videos.js";
import InputListVideos from "./inputListVideos.jsx";
import {FaEraser} from "react-icons/fa6";
import {postData, postDataFile, updateData} from "../../../../../infraestructure/call_api/crud.js";
import {urlMain} from "../../../../../infraestructure/data/const.js";
import toast from "react-hot-toast";
import {toastMessageCustom} from "../../../../../infraestructure/data/toastMessage.js";
import { allOperationsProduct } from '../../../../../infraestructure/states/operation_states.js';

const ModalVideoInput = ({isModalInput,setIsModalInput,item}) => {
  const [selOpeVideos, setSelOpeVideos] = useRecoilState(checkOperationsBalancing);
  const [videos, setVideos] = useState([]); // Estado para almacenar los videos
  const [videosOperations, setVideosOperations] = useRecoilState(listVideosOperations)
  const [operationsProduct, setOperationsProduct] = useRecoilState(allOperationsProduct)
  const [showVideos, setShowVideos]  = useRecoilState(videoShow)
  

  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=> {
    setVideos([])
  }, [])

  const handleApi = () => {
    setIsLoading(true)
    const formData = new FormData();
    videos.forEach((video, index) => {
      formData.append(`videos[]`, video.file); // Asegúrate de que `video.file` sea un objeto File
    });
    formData.append("operation_balancing_id", selOpeVideos.operation_balancing_id);

    const postDataOrder = async (formData) => {
        try {
          const result = await postDataFile(urlMain + "videos", formData)
          
          const videos = [...videosOperations, ...result.videos]

          const video_length = result.videos.length
          const operation_id = item.id
          const updatedItem = { ...item, video_count: item.video_count + video_length };

          // Crear un nuevo array actualizado
          const updatedItems = operationsProduct.map(operation =>
            operation.id === operation_id
              ? updatedItem // Crear un nuevo objeto actualizado
              : operation // Dejar los demás elementos iguales
          );
          setOperationsProduct(updatedItems)
  
          
          setVideosOperations(videos)
          setSelOpeVideos(null)
          toast.success(toastMessageCustom.videoSave)
          setIsModalInput(false)
          setVideos([])
          videosOperations.length < 1 && setShowVideos(false)
          
        } catch (error) {
          console.error('Error setting data', error);
        } finally {
          setIsLoading(false)
        }
      };

      postDataOrder(formData);
    }



  return (
    <>
      <Modal 
        backdrop="transparent" 
        placement='center' size="5xl" 
        isOpen={isModalInput} 
        onOpenChange={(close)=> {
          setIsModalInput(!isModalInput)
          !close && 
            setVideos([])
            setIsModalInput(false)
        }} 
        scrollBehavior="inside">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {
                  selOpeVideos && selOpeVideos.operation
                }
              </ModalHeader>
              <ModalBody>
                <InputListVideos
                  videos={videos}
                  setVideos={setVideos}
                />
              </ModalBody>
              <ModalFooter>
                    {
                      isLoading ? 
                        <Spinner color="default" size='lg'/> : 
                        <>
                        {
                          videos.length >= 1 && (
                            <CustomButton
                              color="default"
                              variant="bordered"
                              startContent={<FaSave color="green"/>}
                              onClick={handleApi}
                              title="Guardar videos"
                            />
                          )
                        }
                          
                        </>
                        
                    }
                    
                    {
                      videos.length >= 1  && (
                        <CustomButton
                          color="default"
                          variant="bordered"
                          startContent={<FaEraser color="red"/>}
                          onClick={()=> setVideos([])}
                          title="Borrar"
                        />
                      )
                    } 
                      

                    <CustomButton
                      color="default"
                      variant="bordered"
                      startContent={<FaBackward />}
                      onClick={()=> setIsModalInput(false)}
                      title="Regresar"
                    />

              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
export default ModalVideoInput
