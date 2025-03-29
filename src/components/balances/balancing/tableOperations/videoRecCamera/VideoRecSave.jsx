import React, { useState } from 'react'
import { FaSave } from 'react-icons/fa'
import { postData, postDataFile } from '../../../../../infraestructure/call_api/crud';
import { urlMain } from '../../../../../infraestructure/data/const';
import { allOperationsProduct } from '../../../../../infraestructure/states/operation_states';
import { useRecoilState } from 'recoil';
import toast from 'react-hot-toast';
import { Spinner } from '@nextui-org/react';

const VideoRecSave = ({videoBlob, operation}) => {
  const [operationsProduct, setOperationsProduct] = useRecoilState(allOperationsProduct)

  const [isLoading, setIsLoading] = useState(false)

  const handleClick = () => {
    async function uploadVideo(blob) {
      setIsLoading(true)
      const formData = new FormData();
  
      // Convertir el Blob a un File para que Rails lo reciba correctamente
      const file = new File([blob], "video.mp4", { type: "video/mp4" });
      
      formData.append("videos[]", file); // Enviar como File en lugar de solo Blob
      formData.append("operation_balancing_id", operation.operation_balancing_id); // ID necesario
  
      const postDataVideo = async (formData) => {
        try {
          const result = await postDataFile(urlMain + "videos", formData);
    
          const updateMap = operationsProduct.map((operation) =>
            operation.operation_balancing_id === result.operation_balancing.id 
              ? { ...operation, video_count: result.operation_balancing.video_count } 
              : operation
          );
          setOperationsProduct(updateMap)
          toast.success("El vídeo ha sido guardado con éxito")
        } catch (error) {
          console.error("Error setting data", error);
        } finally {
          setIsLoading(false)
        }
      };
  
      postDataVideo(formData);
    }
  
    uploadVideo(videoBlob);
  };
  

  return (
    <>
    {
      isLoading ? 
        <Spinner color="success" size='lg'/> : 
        <button
            onClick={handleClick}
            className="py-2 px-4 rounded"
          >
            <FaSave size={44} className="text-secondary_two"/>
            
        </button>
    }
      
    </>
   
  )
}

export default VideoRecSave