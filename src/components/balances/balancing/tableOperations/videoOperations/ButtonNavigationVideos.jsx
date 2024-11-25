import React, {useEffect} from 'react'
import {FaPlay, FaVideo} from "react-icons/fa6";
import {useRecoilState} from "recoil";
import {
  listVideosOperations,
  listVideosOpers,
  videoOperation
} from "../../../../../infraestructure/states/states_videos.js";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";

const ButtonNavigationVideos = () => {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));
  const [videosOperations, setVideosOperations] = useRecoilState(listVideosOperations)
  const [videoObjOperation, setVideoObjOperation] = useRecoilState(videoOperation)


  const handleVideo = (video) => {
    setVideoObjOperation(video)
  }


  return (
    <div className="fixed bottom-4 left-4 bg-zinc-800 text-white  dark:bg-zinc-100 dark:text-zinc-700 rounded-full shadow-md z-50">


      <Dropdown>
        <DropdownTrigger>
          <button
            className="w-12 h-12 flex justify-center items-center focus:outline-none  transition-colors"
            //onClick="console.log('Button clicked!')"
          >
            <FaPlay
              className="h-4 w-4"
            />

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
            videosOperations.map((videos, i)=> {
              return(
                <DropdownItem onClick={()=> handleVideo(videos)} key={i}>
                  <div className="w-full px-2 py-2 my-2 mx-2 cursor-pointer">
                    <video
                      className="w-40 h-40" controls={false}>
                      <source src={videos.url} type="video/mp4" />
                      Tu navegador no soporta el elemento de video.
                    </video>
                    <span className="truncate text-center">
                      video {i + 1}
                    </span>
                  </div>

                </DropdownItem>
              )
            })
          }

        </DropdownMenu>
      </Dropdown>

    </div>


  )
}
export default ButtonNavigationVideos
