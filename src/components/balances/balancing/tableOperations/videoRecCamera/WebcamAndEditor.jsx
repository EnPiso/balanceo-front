import React, {useEffect, useState} from "react";

import VideoEditor from "./VideoEditor";
import WebcamRecorder from "./WebcamComponent.jsx";
import {FaClock} from "react-icons/fa";
import {Slider} from "@nextui-org/react";

const WebcamAndEditor = () => {
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
    <div className="flex flex-col items-center">
      <WebcamRecorder
        videoDuration={videoDuration}
        setVideoDuration={setVideoDuration}
        setVideoBlob={setVideoBlob} />

      {videoBlob && <VideoEditor
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
        videoBlob={videoBlob}
        videoDuration={videoDuration}
        handleSliderChange={handleSliderChange}
      />}


      {
        videoDuration && (
          <>
            <div className="flex justify-between py-2">
<div className="w-full">

  <p className="text-left">Inicio: {startTime.toFixed(2)} </p>
  <p className="text-right">Fin: {endTime.toFixed(2)} </p>

  <FaClock />
</div>
            </div>
            <div className="w-full mt-4 flex flex-col items-center">


              <Slider
                color="foreground"
                step={0.1}
                minValue={0}
                maxValue={maxDuration}
                defaultValue={[0, maxDuration]}
                onChange={handleSliderChange}
                className="max-w-md"
              />
            </div>
          </>
        )
      }



    </div>
  );
};

export default WebcamAndEditor;
