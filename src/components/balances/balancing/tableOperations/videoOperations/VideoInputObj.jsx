import React from 'react'

const VideoInputObj = ({index, video}) => {
  return (
    <div key={index} style={{ padding: '10px', borderRadius: '10px' }}>
      <video
        controls
        style={{ width: '100%', borderRadius: '10px' }}
        src={video.url}
      />
      {
        video && video.file && <p style={{ marginTop: '10px', textAlign: 'center' }}>{video.file.name}</p>
      }
    </div>
  )
}
export default VideoInputObj
