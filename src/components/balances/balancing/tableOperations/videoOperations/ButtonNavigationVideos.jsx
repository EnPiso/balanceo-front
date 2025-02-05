import React, {useEffect,useState} from 'react'
import {FaPlay, FaVideo} from "react-icons/fa6";
import {useRecoilState} from "recoil";
import {
  listVideosOperations,
  listVideosOpers,
  videoOperation
} from "../../../../../infraestructure/states/states_videos.js";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Badge} from "@nextui-org/react";
import { FaRegPlayCircle, FaWindowClose } from 'react-icons/fa';
import ConfirmDeleteVideo from './ConfirmDeleteVideo.jsx';
import { deleteData, updateData } from '../../../../../infraestructure/call_api/crud.js';
import { urlMain } from '../../../../../infraestructure/data/const.js';
import toast from 'react-hot-toast';
import { allOperationsProduct } from '../../../../../infraestructure/states/operation_states.js';
import DropDownItemVideo from './DropDownItemVideo.jsx';



const ButtonNavigationVideos = ({showVideos}) => {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["text"]));
  const [videosOperations, setVideosOperations] = useRecoilState(listVideosOperations)
  const [videoObjOperation, setVideoObjOperation] = useRecoilState(videoOperation)
  const [operationsProduct, setOperationsProduct] = useRecoilState(allOperationsProduct);


  const [isOpen, setIsOpen] = useState(false); // Estado para controlar la apertura/cierre del menú
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);

  const [videoDelete, setVideoDelete] = useState(false);

  const [isLoading, setIsLoading] = useState(false)
  

  const handleVideo = (video) => {
  
    setVideoObjOperation(video)
  }


  const handleDelete = (video, index) => {
    const deleteObj = {
      video: video,
      index: index
    }
    setVideoDelete(deleteObj)
  
    setIsOpenConfirm(true)
  }

  const handleApi = () => {
    const id = videoDelete.video.id
    setIsLoading(true)

    const deleteVideo = async () => {
      
      try {
        const result = await updateData(urlMain + `videos/${id}/delete_video`, {})
        
        const id_delete = parseInt(result.id)

        const updateVideos = videosOperations.filter(video => video.id !== id_delete);
        setVideosOperations(updateVideos)
        
        const updateOperationsProduct = operationsProduct.map(obj => {
          if (obj.id === showVideos.id) {
              return { ...obj, video_count: showVideos.video_count - 1 };
          }
          return obj;
        });
        
        
        setOperationsProduct(updateOperationsProduct)
        // setVideoObjOperation(null)
        toast("Se ha eliminado el vídeo exítosamente")
        setIsOpen(false)
        // guardar imagen de la tabla del balanceo en product
      } catch (error) {
        console.error('Error setting data', error);
      } finally {
        setIsLoading(false)
      }
    };

    deleteVideo()

  }


  return (


    <>
    <div className="fixed bottom-4 left-4 bg-zinc-800 text-white  dark:bg-zinc-100 dark:text-zinc-700 rounded-full shadow-md z-50">

      <DropDownItemVideo
        // key={JSON.stringify(videosOperations)}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        videosOperations={videosOperations}
        handleVideo={handleVideo}
        handleDelete={handleDelete}
      />

     

      </div>
        


      <ConfirmDeleteVideo
        isOpen={isOpenConfirm}
        setIsOpen={setIsOpenConfirm}
        handleSave={() => handleApi()}
        title="¿Quieres eliminar  "
        description={`Eliminar el video # ${videoDelete && videoDelete.index}?`}
        isLoading={isLoading}
      />

    </>
    


  )
}
export default ButtonNavigationVideos
