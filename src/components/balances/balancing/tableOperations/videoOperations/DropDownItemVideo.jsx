import { Badge, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import React from 'react'
import { FaRegPlayCircle, FaRegWindowClose } from 'react-icons/fa'

const DropDownItemVideo = ({videosOperations, isOpen, setIsOpen, handleVideo, handleDelete}) => {

  return (
    <>
      <Dropdown isOpen={isOpen} onOpenChange={setIsOpen} closeOnSelect={false}>
        <DropdownTrigger>
          <button
            className="w-12 h-12 flex justify-center items-center focus:outline-none  transition-colors"
            //onClick="console.log('Button clicked!')"
          >
            <Badge color="success" content={videosOperations.length} shape="rectangle" showOutline={false} className=''>
              <FaRegPlayCircle
                size={30}
              />
            </Badge>
          </button>
        </DropdownTrigger>
        <DropdownMenu
          className="overflow-y-auto max-h-56 mx-w-10"
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
                  <div className="w-full px-2 py-2 my-2 mx-2 cursor-pointer">
                    <span onClick={()=> handleVideo(video)}>
                      <video
                        className="w-40 h-40" controls={false}>
                        <source src={video.url} type="video/mp4" />
                        Tu navegador no soporta el elemento de video.
                      </video>
                    </span>
                   
                    <span className="flex justify-between items-center">
                      <span className="truncate text-center uppercase text-zinc-600 font-bold">
                        video # <span className="text-green-600">{i + 1}</span>
                      </span>

                      <button onClick={()=> handleDelete(video, i + 1)}>
                        <FaRegWindowClose color="red" size={24} />
                      </button>
                    </span>
                    
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
