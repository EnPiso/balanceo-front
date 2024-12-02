import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const WebcamRecorder = ({ setVideoBlob,videoDuration, setVideoDuration }) => {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "environment",
  };

  const startRecording = () => {
    setRecording(true);
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
  };

  const stopRecording = () => {
    setRecording(false);
    mediaRecorderRef.current.stop();
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
    <div className="flex flex-col items-center">
      <Webcam
        audio={true}
        ref={webcamRef}
        videoConstraints={videoConstraints}
        className="w-full max-w-md"
      />
      <div className="mt-4 flex gap-2">
        {!recording ? (
          <button
            onClick={startRecording}
            className="bg-green-500 text-white py-2 px-4 rounded"
          >
            Iniciar Grabación
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="bg-red-500 text-white py-2 px-4 rounded"
          >
            Detener Grabación
          </button>
        )}
      </div>
      {videoDuration !== null && (
        <p className="mt-4 text-gray-700">
          Duración del video: {videoDuration.toFixed(2)} segundos
        </p>
      )}
    </div>
  );
};

export default WebcamRecorder;
