import React, { useState, useRef, useEffect } from "react";
import { Slider } from "@nextui-org/react";
import { FaClock, FaCut, FaHandScissors, FaRecordVinyl, FaRegClock, FaSave } from "react-icons/fa";
import MyCustomButton from "../../../../../ui/MyCustomButton";
import { ConfirmOpen } from "../../sidebarForm/ConfirmOpers";
import VideoRecSave from "./VideoRecSave";
import { ModalVideoRecConfirm } from "./ModalVideoRecConfirm";

const VideoEditor = ({ 
  videoBlob, 
  videoDuration,
  startTime,
  setStartTime,
  endTime, 
  setEndTime, 
  handleSliderChange, 
  setVideoBlob, 
  setVideoDuration, 
  setIsOpen,
  operation
 }) => {
  const [trimmedVideoBlob, setTrimmedVideoBlob] = useState(null);

  const videoRef = useRef(null);

  const maxDuration = videoDuration && !isNaN(videoDuration) ? parseFloat(videoDuration) : 0;

  const [isOpenConfirm,setIsOpenConfirm] = useState(false)

  const trimVideo = () => {
    if (!videoBlob) return;
  
    const videoElement = document.createElement("video");
    videoElement.src = URL.createObjectURL(videoBlob);
  
    videoElement.onloadedmetadata = () => {
      const duration = videoElement.duration;
  
      // Validar los tiempos antes de recortar
      if (startTime >= endTime || startTime < 0 || endTime > duration) {
        alert("Tiempos inválidos para recortar el video");
        return;
      }
  
      const chunks = [];
      const recorder = new MediaRecorder(videoElement.captureStream(), {
        mimeType: "video/webm",
      });
  
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };
  
      recorder.onstop = () => {
        const trimmedBlob = new Blob(chunks, { type: "video/webm" });
        setTrimmedVideoBlob(trimmedBlob);
      };
  
      // Ajustar el tiempo de reproducción
      videoElement.currentTime = startTime;
      videoElement.play();
  
      // Ajustar el tiempo de grabación para compensar el desfase
      const adjustedEndTime = (endTime - startTime) * 1000 - 50; // Ajuste de 50ms
  
      setTimeout(() => {
        recorder.stop();
        videoElement.pause();
      }, adjustedEndTime);
  
      recorder.start();
    };
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = startTime;
    }
  }, [startTime]);


  return (
    <div>
    {/* Video Original */}

   



    {/* Video Cortado */}
    {trimmedVideoBlob ? (
      <div>
        <div className="flex-1 flex items-center justify-center w-full">
          <video
            src={URL.createObjectURL(trimmedVideoBlob)}
            controls
            className="w-full h-full max-h-[70%] object-contain"
          />
        </div>
      </div>
    ): (
      <>
        {videoBlob && (
          <div className="flex-1 flex items-center justify-center w-full">
            <video
              loop
              autoPlay={true}
              ref={videoRef}
              src={URL.createObjectURL(videoBlob)}
              controls
              className="w-full h-full max-h-[70%] object-contain"
            />

          </div>
        )}

    </>
    
        

    )}

    {/* Controles de Recorte */}
 

     
    {
          videoDuration && (
            <>
        
              <div className="w-full mt-4 flex flex-col items-center bg-zinc-100 py-6">
          
              <Slider
              
                fillOffset={0}
                radius="full"
                label={"Duración del Video"}
                color="foreground"
                step={0.1}
                minValue={0}
                maxValue={maxDuration}
                defaultValue={[0, maxDuration]}
                onChange={(e) => handleSliderChange(e)}
                onChangeEnd={() => trimVideo()} // Detecta cuando el usuario suelta el slider
                className="max-w-md text-secondary_two font-black  uppercase"
                formatOptions={{
                  style: "unit",
                  unit: "second",
                  unitDisplay: "narrow", // Opcional: muestra "s" en lugar de "seconds"
                }}
                
              />
              </div>
            </>
          )
        }

    <div className="flex justify-center items-center py-4 z-50">
      <button
      onClick={()=> {
        setIsOpenConfirm(true)
      }}
        className="py-2 px-4 rounded"
      >
        <FaRecordVinyl size={44} className="text-red-500"/>
        
      </button>
      <VideoRecSave 
        operation={operation}
        videoBlob={videoBlob}
      />
      
    </div>

    <ModalVideoRecConfirm
      isOpen={isOpenConfirm}
      setIsOpen={setIsOpenConfirm}
      handleSave={() => {
        setVideoBlob(null)
        setVideoDuration(null)
      }}
      title="¿Quieres eliminar Vídeo,"
      description={"para grabar y reemplazar?"}
    />
        

  </div>
  );
};

export default VideoEditor;
