import React from 'react'
import { FaSave } from 'react-icons/fa'

const VideoRecSave = ({videoBlob, operation}) => {

  const handleClick = () => {
    console.log(videoBlob, operation)
  }

  return (
     <button
        onClick={handleClick}
        className="py-2 px-4 rounded"
      >
        <FaSave size={44} className="text-secondary_two"/>
        
      </button>
  )
}

export default VideoRecSave