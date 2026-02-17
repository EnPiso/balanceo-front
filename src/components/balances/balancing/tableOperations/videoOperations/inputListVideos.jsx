import React, { useEffect, useState } from 'react';
import VideoInputObj from "./VideoInputObj.jsx";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import toast from 'react-hot-toast';
import { FaVideo } from 'react-icons/fa6';
import { FaPlayCircle } from 'react-icons/fa';


const InputListVideos = ({videos,setVideos}) => {

  const [isErrorFormat, setIsErrorFormat] = useState(false)

  // Maneja la selección de archivos
  const handleFileUpload = (files) => {

    const fileArray = Array.from(files); // Convierte FileList a Array
  
    // Filtra solo los videos que sean de tipo .mp4
    const videoFiles = fileArray.filter((file) => {
      const isValid = file.type === 'video/mp4' && file.name.toLowerCase().endsWith('.mp4');
      if (!isValid) {
        toast.error(`El archivo ${file.name} no es un video válido en formato .mp4.`);
        setIsErrorFormat(true)

      }
      return isValid;
    });
  
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

  useEffect(()=> {
    isErrorFormat && setTimeout(()=>{
      setIsErrorFormat(false)
    }, 3000)  
  }, [isErrorFormat])

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
          <label htmlFor="videos" className={`button font-bold flex justify-center items-center uppercase ${isErrorFormat ? 'text-red-500' : 'text-secondary_two'}`}>
            Selecciona archivo(s) de vídeo solo en formato de MP4 <span className="ml-3"> <FaPlayCircle size={35}/> </span>
          </label>
        </div>
      )

      }
    </>
  );
};

export default InputListVideos;
