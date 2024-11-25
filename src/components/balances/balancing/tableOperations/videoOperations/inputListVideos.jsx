import React, { useState } from 'react';
import VideoInputObj from "./VideoInputObj.jsx";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"


const InputListVideos = ({videos,setVideos}) => {

  // Maneja la selección de archivos
  const handleFileUpload = (files) => {
    const fileArray = Array.from(files); // Convierte FileList a Array
    const videoFiles = fileArray.filter((file) => file.type.startsWith('video/')); // Filtra solo los videos
    const videoObjects = videoFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file), // Crea un URL para reproducir el video
    }));
    setVideos((prevVideos) => [...prevVideos, ...videoObjects]); // Agrega los nuevos videos
  };

  // Maneja el evento de soltar archivos
  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files; // Archivos soltados
    handleFileUpload(files);
  };

  // Previene el comportamiento por defecto al arrastrar
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <>


      {videos.length > 0 ? (
        <div>

          <ResponsiveMasonry
            columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
          >
            <Masonry>
              {videos.map((video, index) => (
                <VideoInputObj
                  video={video}
                  index={index}
                />
              ))}
            </Masonry>
          </ResponsiveMasonry>


        </div>
      ) : (
        <div
          className="drop-container"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          style={{
            border: '2px dashed #ccc',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center',
            marginBottom: '20px',
          }}
        >
          <span className="drop-title">Arrastra vídeos aquí</span>
          <p>o</p>
          <input
            id="videos"
            type="file"
            accept="video/*"
            multiple
            onChange={(e) => handleFileUpload(e.target.files)}
            style={{ display: 'none' }}
          />
          <label htmlFor="videos" className="button">
            Seleccionar archivo
          </label>
        </div>
      )

      }
    </>
  );
};

export default InputListVideos;
