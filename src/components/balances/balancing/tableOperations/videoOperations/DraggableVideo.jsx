import React from 'react';
import { motion } from 'framer-motion';

const DraggableVideo = ({videoObjOperation, videoRef}) => {
  return (
    <motion.div
      drag
      style={{
        width: "300px",
        height: "300px",
        cursor: "grab",
        position: "absolute", // Importante para moverse libremente
      }}
    >
      {
        videoObjOperation && <video
          ref={videoRef} // Asigna la referencia al <video>
          className="w-40 h-40"
          controls={true} // Agrega controles si es necesario
        >
          <source src={videoObjOperation.url} type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
      }

    </motion.div>
  );
};

export default DraggableVideo;
