import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const WebcamComponent = () => {
  const webcamRef = useRef(null); // Referencia a la webcam
  const [image, setImage] = useState(null); // Estado para almacenar una captura

  // Opciones para la webcam
  const videoConstraints = {
    facingMode: "user", // Cambia a "environment" para usar la cámara trasera en móviles
  };

  const capturePhoto = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot(); // Captura la imagen como una base64
      setImage(imageSrc);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {image ? (
        <div className="flex flex-col items-center">
          <img
            src={image}
            alt="Captura"
            className="mb-4 border border-gray-300 rounded"
          />
          <button
            onClick={() => setImage(null)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Volver a la cámara
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <Webcam
            audio={false} // Desactiva el audio
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="mb-4 rounded"
          />
          <button
            onClick={capturePhoto}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Capturar Foto
          </button>
        </div>
      )}
    </div>
  );
};

export default WebcamComponent;
