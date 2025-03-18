import { Badge, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Radio, RadioGroup, Tooltip } from '@nextui-org/react'
import React from 'react'
import { FaRegPlayCircle, FaRegWindowClose } from 'react-icons/fa'
import { useRecoilState } from 'recoil';
import { checkOpersPosition } from '../../../../../infraestructure/states/opers_states';
import SelectionOperVideo from './SelectionOperVideo';
import { FaDeleteLeft } from 'react-icons/fa6';
import MyCustomButton from '../../../../../ui/MyCustomButton';

const DropDownItemVideo = ({videosOperations, isOpen, setIsOpen, handleVideo, handleDelete, setVideosOperations}) => {
  
  

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
                  <div className="w-full px-2 py-2 my-2 mx-2 cursor-pointer bg-zinc-200">
                    <span className="truncate text-center uppercase text-zinc-600 font-bold bg-zinc-300">
                      video # <span className="text-secondary_two">{i + 1}</span>
                    </span>


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
                    <div className="flex justify-end">
                      <Tooltip content="Eliminar vídeo" placement='bottom'>
                        <button onClick={()=> handleDelete(video, i + 1)} className='py-4 px-4'>
                          <FaDeleteLeft color="red" size={24} />
                        </button>
                      </Tooltip>
                     
                    </div>
                     
                  </div>

                </DropdownItem>
              )
            })
          }

        </DropdownMenu>
      </Dropdown>

    </>
  )
}

export default DropDownItemVideo
