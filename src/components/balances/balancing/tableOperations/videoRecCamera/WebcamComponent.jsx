import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const WebcamComponent = () => {
  const webcamRef = useRef(null); // Referencia para la webcam
  const mediaRecorderRef = useRef(null); // Referencia para MediaRecorder
  const [recording, setRecording] = useState(false); // Estado para saber si está grabando
  const [videoBlob, setVideoBlob] = useState(null); // Estado para almacenar el video grabado

  // Opciones para la webcam
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "environment", // Usa "environment" para la cámara trasera
  };

  // Inicia la grabación
  const startRecording = () => {
    setRecording(true);
    const stream = webcamRef.current.video.srcObject; // Obtén el stream de la webcam
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: "video/webm", // Formato del video
    });
    mediaRecorderRef.current = mediaRecorder;

    let chunks = [];
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data); // Guarda las partes del video
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" }); // Crea el video completo
      setVideoBlob(blob);
      chunks = []; // Resetea los chunks
    };

    mediaRecorder.start(); // Inicia la grabación
  };

  // Detiene la grabación
  const stopRecording = () => {
    setRecording(false);
    mediaRecorderRef.current.stop(); // Detiene el MediaRecorder
  };

  // Descarga el video grabado
  const downloadVideo = () => {
    if (videoBlob) {
      const url = URL.createObjectURL(videoBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "recorded-video.webm";
      a.click();
      URL.revokeObjectURL(url); // Limpia la memoria
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Webcam
        audio={true} // Incluye audio
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
        {videoBlob && (
          <button
            onClick={downloadVideo}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Descargar Video
          </button>
        )}
      </div>
      {videoBlob && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Video Grabado:</h2>
          <video
            src={URL.createObjectURL(videoBlob)}
            controls
            className="w-full max-w-md"
          />
        </div>
      )}
    </div>
  );
};

export default WebcamComponent;
