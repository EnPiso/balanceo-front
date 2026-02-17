import React from 'react'
import { FaWindowClose } from 'react-icons/fa'

const ZoneVideo = ({videoObjOperation, setVideoObjOperation, videoRef}) => {
  return (
    <div className='py-2'>
        {videoObjOperation && (
          <div className="w-full h-[300px] flex justify-center items-center bg-black/5 relative">
            {/* Botón en la esquina superior derecha */}
            <button onClick={()=> setVideoObjOperation(null)} className="absolute top-2 right-2 z-10"> 
              <FaWindowClose className='text-secondary_two bg-zinc-100 p-1 rounded-lg' size={35} />
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
    </div>
  )
}

export default ZoneVideo