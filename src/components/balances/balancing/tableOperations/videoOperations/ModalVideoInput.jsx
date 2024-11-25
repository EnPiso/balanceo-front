import React, {useEffect, useState} from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {FaBackward, FaSave} from "react-icons/fa";
import CustomButton from "../../../../../ui/CustomButton.jsx";
import {useRecoilState} from "recoil";
import {checkOperationsBalancing, listVideosOperations} from "../../../../../infraestructure/states/states_videos.js";
import InputListVideos from "./inputListVideos.jsx";
import {FaEraser} from "react-icons/fa6";
import {postData, postDataFile, updateData} from "../../../../../infraestructure/call_api/crud.js";
import {urlMain} from "../../../../../infraestructure/data/const.js";
import toast from "react-hot-toast";
import {toastMessageCustom} from "../../../../../infraestructure/data/toastMessage.js";

const ModalVideoInput = ({isModalInput,setIsModalInput}) => {
  const [selOpeVideos, setSelOpeVideos] = useRecoilState(checkOperationsBalancing);
  const [videos, setVideos] = useState([]); // Estado para almacenar los videos
  const [videosOperations, setVideosOperations] = useRecoilState(listVideosOperations)


  const handleApi = () => {
    const formData = new FormData();
    videos.forEach((video, index) => {
      formData.append(`videos[]`, video.file); // Asegúrate de que `video.file` sea un objeto File
    });
    formData.append("operation_balancing_id", selOpeVideos.operation_balancing_id);

    const postDataOrder = async (formData) => {
        try {
          const result = await postDataFile(urlMain + "videos", formData)
          console.log(result)
          console.log(videosOperations)
          const videos = [...videosOperations, ...result.videos]
          setVideosOperations(videos)
          setSelOpeVideos(null)
          toast.success(toastMessageCustom.videoSave)
          setIsModalInput(false)
          setVideos([])
        } catch (error) {
          console.error('Error setting data', error);
        }
      };

      postDataOrder(formData);
    }



  return (
    <>
      <Modal size="5xl" isOpen={isModalInput} onOpenChange={()=> setIsModalInput(!isModalInput)} scrollBehavior="inside">
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

                    <CustomButton
                      color="default"
                      variant="bordered"
                      startContent={<FaSave color="green"/>}
                      onClick={handleApi}
                      title="Guardar videos"
                    />
                      <CustomButton
                        color="default"
                        variant="bordered"
                        startContent={<FaEraser color="red"/>}
                        onClick={()=> setVideos([])}
                        title="Borrar"
                      />

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
