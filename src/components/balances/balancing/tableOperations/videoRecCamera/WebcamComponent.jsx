import React, { useRef, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { FaVideo, FaRecordVinyl, FaX } from "react-icons/fa6";
import Webcam from "react-webcam";

const WebcamRecorder = ({ setVideoBlob, videoDuration, setVideoDuration, setIsOpen }) => {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0); // Estado para el contador
  const timerRef = useRef(null); // Referencia para el temporizador

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "environment",
  };

  const startRecording = () => {
    setRecording(true);
    setRecordingTime(0); // Reinicia el contador
    const stream = webcamRef.current.video.srcObject;
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current = mediaRecorder;

    let chunks = [];
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      setVideoBlob(blob); // Pasa el video grabado al componente padre
      getVideoDuration(blob); // Calcula la duración del video
      chunks = [];
    };

    mediaRecorder.start();

    // Inicia el temporizador
    timerRef.current = setInterval(() => {
      setRecordingTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const stopRecording = () => {
    setRecording(false);
    mediaRecorderRef.current.stop();

    // Detiene el temporizador
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  // Función para calcular la duración del video
  const getVideoDuration = (blob) => {
    const video = document.createElement("video");
    const url = URL.createObjectURL(blob);

    video.preload = "metadata"; // Precarga solo los metadatos

    video.onloadedmetadata = () => {
      if (video.duration === Infinity) {
        video.currentTime = Number.MAX_SAFE_INTEGER;
        video.ontimeupdate = () => {
          video.ontimeupdate = null; // Elimina el listener para evitar duplicados
          setVideoDuration(video.duration); // Actualiza la duración
          URL.revokeObjectURL(url); // Libera memoria
        };
      } else {
        setVideoDuration(video.duration); // Actualiza la duración
        URL.revokeObjectURL(url); // Libera memoria
      }
    };

    video.src = url; // Asigna la URL del blob
  };

  return (
    <div className="bg-gray-100">
      
      {/* Webcam ocupa toda la pantalla */}
      <Webcam
        audio={true}
        ref={webcamRef}
        videoConstraints={videoConstraints}
        className="absolute top-0 left-0 w-full h-full object-cover z-40"
      />

      {/* Botones posicionados en la parte inferior */}
      <div className="absolute bottom-4 left-0 w-full flex justify-center space-x-4 z-50">
        {!recording ? (
          <button onClick={startRecording} className="py-2 px-4 rounded">
            <FaVideo size={44} className="text-red-500" />
          </button>
        ) : (
          <button onClick={stopRecording} className="py-2 px-4 rounded">
            <FaRecordVinyl size={44} className="text-red-500 animate-pulse" />
          </button>
        )}
      </div>

      {/* Contador de grabación */}
      {recording && (
        <p className="absolute top-4 left-4 text-secondary_two font-bold bg-opacity-50 px-4 py-2 rounded z-50 flex justify-between items-center">
          <FaCircle size={9} className="text-red-500 mr-1 animate-pulse"/> {recordingTime}s
        </p>
      )}

      {/* Duración del video */}
      {videoDuration !== null && (
        <p className="absolute bottom-16 left-0 w-full text-center text-gray-700 z-10">
          Duración del video: {videoDuration.toFixed(2)} segundos
        </p>
      )}
    </div>
  );
};

export default WebcamRecorder;