import { Badge, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Radio, RadioGroup, Tooltip } from '@nextui-org/react'
import React, { useState } from 'react'
import { FaRegPlayCircle, FaRegWindowClose, FaStar } from 'react-icons/fa'
import { useRecoilState } from 'recoil';
import { checkOpersPosition } from '../../../../../infraestructure/states/opers_states';
import SelectionOperVideo from './SelectionOperVideo';
import { FaDeleteLeft } from 'react-icons/fa6';
import MyCustomButton from '../../../../../ui/MyCustomButton';
import { updateData } from '../../../../../infraestructure/call_api/crud';
import { urlMain } from '../../../../../infraestructure/data/const';
import { listVideosOperations, videoShow } from '../../../../../infraestructure/states/states_videos';
import toast from 'react-hot-toast';
import { ConfirmOpen } from '../../sidebarForm/ConfirmOpers';
import { currentUser } from '../../../../../infraestructure/states/states_views';

const DropDownItemVideo = ({isOpen, setIsOpen, handleVideo, handleDelete}) => {
  
  const [videosOperations, setVideosOperations] = useRecoilState(listVideosOperations)
  const [showVideos, setShowVideos]  = useRecoilState(videoShow)

  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [objVideo, setObjVideo] = useState(null);

  const [user, setUser] = useRecoilState(currentUser);
  
  
  const handleFavorite = (video) => {
    const video_id = video.id
    const uploadFavorite = async () => {
      
      try {
        const result = await updateData(urlMain + `videos/${video_id}/favorite_video`, {})

        const videoUpdate = result.video
    
        const update_array = videosOperations.map((video) =>
          video.id === videoUpdate.id
            ? { ...video, favorite: videoUpdate.favorite } // Actualiza solo el parámetro "favorite"
            : video
        );

        setVideosOperations(update_array)
        
        videoUpdate.favorite ? 
          toast.success("El vídeo ha sido agregado a la lista de favoritos") :
          toast("El vídeo ha sido eliminado de la lista de favorito")
        
      } catch (error) {
        console.error('Error setting data', error);
      } 
    };

    uploadFavorite()
  }

  const handleConfirmFavorite = (video) => {
    setObjVideo(video)
    setIsOpenConfirm(true)
  }

  return (
    <>
   
      <Dropdown isOpen={isOpen} onOpenChange={setIsOpen} closeOnSelect={false}>
        <DropdownTrigger>
         
          <button
            className="w-12 h-12 flex justify-center items-center focus:outline-none  transition-colors"
            //onClick="console.log('Button clicked!')"
          >
            <Badge content={videosOperations.length} shape="rectangle" showOutline={false} className='bg-secondary_two'>
              <FaRegPlayCircle
                className='text-secondary_two'
                size={30}
              />
            </Badge>
          </button>
        </DropdownTrigger>
        <DropdownMenu
          className="overflow-y-auto max-h-96 mx-w-10"
          aria-label="Single selection example"
          variant="flat"
          disallowEmptySelection
          selectionMode="single"
          // selectedKeys={selectedKeys}
          // onSelectionChange={setSelectedKeys}
        >
          
          {
            videosOperations.map((video, i)=> {
              return(
                <DropdownItem key={i}>
                  <div className="w-full px-2 py-2 my-2 mx-2 cursor-pointer ">
                  {
                    (i === 0 || i === videosOperations.length - 1) && (
                      <h1 className="font-bold text-secondary_two text-xl uppercase">
                        <span className="bg-zinc-100">
                          {showVideos.operation}
                        </span>
                      </h1>
                    )
                  }
                  
                    <div className="flex justify-between items-center">
                      <span className="truncate text-center uppercase text-zinc-600 font-bold bg-zinc-300">
                        video # <span className="text-secondary_two">{i + 1}</span>
                      </span>
                      {
                        user && (user.role === 'admin' || user.role === 'supervisor') &&
                          <button onClick={()=> {
                              handleConfirmFavorite(video)
                            }}>
                            {
                              video.favorite ? 
                                <FaStar size={30} className='text-yellow-400'/> : 
                                <FaStar size={30} className='text-secondary_two animate-pulse'/>
                            }
                            
                          </button>
                      }
                      
                    </div>
                    


                    <span onClick={()=> handleVideo(video)}>
                      <video
                        className="w-full h-40 mb-2 mt-2" controls={false}>
                        <source src={video.url} type="video/mp4" />
                        Tu navegador no soporta el elemento de video.
                      </video>
                    </span>

                    <SelectionOperVideo
                      setVideosOperations={setVideosOperations}
                      videosOperations={videosOperations}
                      video={video}
                    />
                    {
                      user && (user.role === 'admin' || user.role === 'supervisor') &&
                        <div className="flex justify-end">
                          <Tooltip content="Eliminar vídeo" placement='bottom'>
                            <button onClick={()=> handleDelete(video, i + 1)} className='py-4'>
                              <FaDeleteLeft color="red" size={30} />
                            </button>
                          </Tooltip>
                        </div>
                    }
                    
                  </div>

                </DropdownItem>
              )
            })
          }

        </DropdownMenu>
      </Dropdown>
      
      {
        isOpenConfirm && 
          <ConfirmOpen
            isOpen={isOpenConfirm}
            setIsOpen={setIsOpenConfirm}
            handleSave={() => handleFavorite(objVideo)}
            title={
              objVideo.favorite ? 
                "¿Quieres quitar este vídeo" : 
                "¿Quieres agregar este vídeo"
            }
            description={`como un referente de la operación ${showVideos.operation}?`}
          />
      }
      
    </>
  )
}

export default DropDownItemVideo
