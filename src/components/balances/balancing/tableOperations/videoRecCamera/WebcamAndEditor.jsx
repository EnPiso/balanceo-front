import React, {useEffect, useState} from "react";

import VideoEditor from "./VideoEditor";
import WebcamRecorder from "./WebcamComponent.jsx";
import {FaClock} from "react-icons/fa";
import {Slider} from "@nextui-org/react";
import VideoEditorUpdate from "./VideoEditorUpdate.jsx";

const WebcamAndEditor = ({setIsOpen, operation}) => {
  const [videoBlob, setVideoBlob] = useState(null); // Estado compartido para el video grabado
  const [videoDuration, setVideoDuration] = useState(null); // Nueva variable de estado para la duración
  const maxDuration = videoDuration && !isNaN(videoDuration) ? parseFloat(videoDuration) : 0;

  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(videoDuration || 0);

  const handleSliderChange = (value) => {
    setStartTime(value[0]);
    setEndTime(value[1]);
    
  };


  return (
    <div className="w-full h-full">
     

      {
        videoBlob ? (
          <>
          
            <VideoEditor
              operation={operation}
              setIsOpen={setIsOpen}
              startTime={startTime}
              setStartTime={setStartTime}
              endTime={endTime}
              setEndTime={setEndTime}
              videoBlob={videoBlob}
              videoDuration={videoDuration}
              handleSliderChange={handleSliderChange}
              maxDuration={maxDuration}
              setVideoBlob={setVideoBlob}
              setVideoDuration={setVideoDuration}
            />

          </>
        ) : 
          <WebcamRecorder
            operation={operation}
            setIsOpen={setIsOpen}
            videoDuration={videoDuration}
            setVideoDuration={setVideoDuration}
            setVideoBlob={setVideoBlob} />
      }


      
    </div>
  );
};

export default WebcamAndEditor;
