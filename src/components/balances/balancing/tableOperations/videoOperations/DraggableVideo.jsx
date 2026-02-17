import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaBackward, FaClosedCaptioning, FaDeleteLeft } from "react-icons/fa6";
import { FaWindowClose } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { videoOperation } from "../../../../../infraestructure/states/states_videos";
import { ConfirmOpen } from "../../sidebarForm/ConfirmOpers";

const DraggableVideo = ({ videoObjOperation, videoRef, setVideoObjOperation }) => {

  // const [videoObjOperation, setVideoObjOperation] = useRecoilState(videoOperation)
  

  const [size, setSize] = useState({ width: 300, height: 300 });

  const handleResize = (event, { size }) => {
    setSize(size);
  };

  return (
    <>
      <motion.div
        drag
        className="absolute top-1/2 right-0 transform -translate-y-1/2 cursor-grab">

        {videoObjOperation && (
          <div className="w-[300px] h-[300px] flex justify-center items-center bg-black/5 relative">
          {/* Botón en la esquina superior derecha */}
          <button onClick={()=> setVideoObjOperation(null)} className="absolute top-2 right-2 z-10"> 
            <FaWindowClose color="red" size={24} />
          </button>
        
          {/* Video */}
          <video
            ref={videoRef}
            className="w-full h-full"
            controls
          >
            <source src={videoObjOperation.url} type="video/mp4" />
            Tu navegador no soporta el elemento de video.
          </video>
        </div>
        )}

      </motion.div>
  
    </>
    
  );
};

export default DraggableVideo;
