import React, { useState } from "react";
import { motion } from "framer-motion";

const DraggableVideo = ({ videoObjOperation, videoRef }) => {
  const [size, setSize] = useState({ width: 300, height: 300 });

  const handleResize = (event, { size }) => {
    setSize(size);
  };

  return (
    <motion.div
      drag
      className="absolute top-1/2 right-0 transform -translate-y-1/2 cursor-grab">

      {videoObjOperation && (
        <div className="w-[300px] h-[300px] flex justify-center items-center bg-black/5">
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
  );
};

export default DraggableVideo;
