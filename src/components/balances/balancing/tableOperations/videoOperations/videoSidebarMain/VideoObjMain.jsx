import React, { useState } from 'react'
import { FaPlay } from 'react-icons/fa'
import { fetchGetData } from '../../../../../../infraestructure/call_api/crud'
import { urlMain } from '../../../../../../infraestructure/data/const'
import ModalShowVideos from './ModalShowVideos'
import { CircularProgress } from '@nextui-org/react'

const VideoObjMain = ({operation,key,operationTemp, setOperationTemp, isFavorite}) => {

  const [isOpen, setIsOpen] = useState(false);
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  const handleGetVideo = (operation) => {

    const operation_id = operation.id

    const getData = async () => {
      setIsLoading(true);
      try {
        const result = await fetchGetData(`${urlMain}videos/get_videos_operations?operation_id=${operation_id}&favorite=${isFavorite}`);
        setVideos(result.videos)
        setIsOpen(true)
        setOperationTemp(operation)
        setIsLoading(false)
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    getData();

  }

  return (
    <tr key={key} className="hover:bg-zinc-50 dark:hover:bg-zinc-700">
      <td className="px-4 py-2 border border-gray-300 flex justify-between items-center">
        <span className={`${ 
          operationTemp && operation.id === 
            operationTemp.id ? 
              'text-secondary_two' : 
              'text-zinc-800'}
          `}>
          {operation.operation} 
        </span>
        {
          isLoading ? 
            <button>
              <CircularProgress 
                size='sm'
                color="success" />
            </button> : 
            <button>
              <FaPlay 
                onClick={() => handleGetVideo(operation)}
                className="text-secondary_two"/>
            </button> 
        }
         
      </td>
      <ModalShowVideos
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleClose={handleClose}
        videos={videos}
        operation={operation}
        setOperationTemp={setOperationTemp}
      />
    </tr>
  )
}

export default VideoObjMain