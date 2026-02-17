import React, { useState, useRef, useEffect } from "react";
import { Slider } from "@nextui-org/react";
import { FaRecordVinyl, FaStop } from "react-icons/fa";
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
  const [isTrimming, setIsTrimming] = useState(false); // Estado para el cargador

  const videoRef = useRef(null);

  const maxDuration = videoDuration && !isNaN(videoDuration) ? parseFloat(videoDuration) : 0;

  const [isOpenConfirm, setIsOpenConfirm] = useState(false);

  const trimVideo = () => {
    if (!videoBlob) return;
  
    setIsTrimming(true); // Mostrar el cargador
  
    const videoElement = document.createElement("video");
    videoElement.src = URL.createObjectURL(videoBlob);
  
    videoElement.onloadedmetadata = () => {
      const duration = videoElement.duration;
  
      // Validar los tiempos antes de recortar
      if (startTime >= endTime || startTime < 0 || endTime > duration) {
        alert("Tiempos inválidos para recortar el video");
        setIsTrimming(false); // Ocultar el cargador
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
        setIsTrimming(false); // Ocultar el cargador
      };
  
      // Ajustar el tiempo de reproducción
      videoElement.currentTime = startTime;
      videoElement.play();
  
      // Ajustar el tiempo de grabación para compensar el desfase
      const adjustedEndTime = (endTime - startTime) * 1000;
  
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
      {/* Mostrar el cargador mientras se recorta el video */}
      {isTrimming && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="text-white text-lg font-bold">Recortando video, por favor espera...</div>
        </div>
      )}

      {/* Video Original */}
      {trimmedVideoBlob ? (
        <div>
          <div className="flex-1 flex items-center justify-center w-full">
            <video
              loop
              autoPlay={true}
              src={URL.createObjectURL(trimmedVideoBlob)}
              controls
              className="w-full h-full max-h-[70%] object-contain"
            />
          </div>
        </div>
      ) : (
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
      {videoDuration && (
        <>
          <div className="w-full mt-4 flex flex-col items-center bg-zinc-100 py-6 px-1">
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
              className="max-w-md text-secondary_two font-black uppercase"
              formatOptions={{
                style: "unit",
                unit: "second",
                unitDisplay: "narrow", // Opcional: muestra "s" en lugar de "seconds"
              }}
            />
          </div>
        </>
      )}

      <div className="flex justify-center items-center py-4 z-50">
        <button
          onClick={() => {
            setIsOpenConfirm(true);
          }}
          className="py-2 px-4 rounded"
        >
          <FaStop size={44} className="text-red-500" />
        </button>
        <VideoRecSave operation={operation} videoBlob={videoBlob} />
      </div>

      <ModalVideoRecConfirm
        isOpen={isOpenConfirm}
        setIsOpen={setIsOpenConfirm}
        handleSave={() => {
          setVideoBlob(null);
          setVideoDuration(null);
        }}
        title="¿Quieres eliminar este vídeo"
        description={"para grabar otro?"}
      />
      <div className="h-10 w-full py-6 mt-6">

      </div>
    </div>
  );
};

export default VideoEditor;