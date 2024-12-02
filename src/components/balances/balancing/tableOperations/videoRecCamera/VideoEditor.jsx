import React, { useState, useRef, useEffect } from "react";
import { Slider } from "@nextui-org/react";
import { FaClock, FaRegClock } from "react-icons/fa";

const VideoEditor = ({ videoBlob, videoDuration,startTime,setStartTime,endTime, setEndTime, handleSliderChange }) => {
  const [trimmedVideoBlob, setTrimmedVideoBlob] = useState(null);

  const videoRef = useRef(null);

  const maxDuration = videoDuration && !isNaN(videoDuration) ? parseFloat(videoDuration) : 0;

  const trimVideo = () => {
    if (!videoBlob) return;

    const videoElement = document.createElement("video");
    videoElement.src = URL.createObjectURL(videoBlob);

    videoElement.onloadedmetadata = () => {
      const duration = videoElement.duration;
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

      videoElement.currentTime = startTime;
      videoElement.play();

      setTimeout(() => {
        recorder.stop();
        videoElement.pause();
      }, (endTime - startTime) * 1000);

      recorder.start();
    };
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = startTime;
    }
  }, [startTime]);

  return (
    <div className="flex flex-col items-center">
      {/* Video Original */}
      {videoBlob && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Video Grabado:</h2>
          <video
            ref={videoRef}
            src={URL.createObjectURL(videoBlob)}
            controls
            className="w-full max-w-md"
          />
        </div>
      )}

      {/* Video Cortado */}
      {trimmedVideoBlob && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Video Cortado:</h2>
          <video
            src={URL.createObjectURL(trimmedVideoBlob)}
            controls
            className="w-full max-w-md"
          />
        </div>
      )}

      {/* Slider */}


      {/* Controles de Recorte */}
      <div className="mt-4 flex flex-col gap-2">
        <div className="flex justify-between">
          <p>Inicio: {startTime.toFixed(2)} segundos</p>
          <p>Fin: {endTime.toFixed(2)} segundos</p>
        </div>
        <button
          onClick={trimVideo}
          className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
        >
          Cortar Video
        </button>
      </div>
    </div>
  );
};

export default VideoEditor;
