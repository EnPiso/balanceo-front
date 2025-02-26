import React, { useState, useRef, useEffect } from "react";
import "./style.css";
import { CircularProgress, Tooltip } from "@nextui-org/react";
import { FaSave } from "react-icons/fa";

const EditWatchChrono = ({ timeData, onUpdateTime, setIsEdit }) => {
  const [runningTime, setRunningTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [displayTime, setDisplayTime] = useState("00:00");
  const [isLoading, setIsLoading] = useState(false);
  const [originalTime, setOriginalTime] = useState(null);
  
  const sphereRef = useRef(null);
  let stopwatchInterval = useRef(null);
  
  // Inicializar con el valor existente
  useEffect(() => {
    if (timeData && timeData.sample) {
      setOriginalTime(timeData.sample);
      setDisplayTime(timeData.sample);
      // Convertir el tiempo de "MM:SS" a milisegundos
      const [minutes, seconds] = timeData.sample.split(":");
      const totalMilliseconds = (parseInt(minutes) * 60 + parseInt(seconds)) * 1000;
      setRunningTime(totalMilliseconds);
    }
  }, [timeData]);

  const playPause = () => {
    if (isRunning) {
      pause();
    } else {
      start();
    }
    setIsRunning(!isRunning);
  };

  const start = () => {
    const startTime = Date.now() - runningTime;
    sphereRef.current.style.animation = "rotacion 60s linear infinite";
    sphereRef.current.style.animationPlayState = "running";
    stopwatchInterval.current = setInterval(() => {
      const newRunningTime = Date.now() - startTime;
      setRunningTime(newRunningTime);
      setDisplayTime(calculateTime(newRunningTime));
    }, 1000);
  };

  const pause = () => {
    sphereRef.current.style.animationPlayState = "paused";
    clearInterval(stopwatchInterval.current);
  };

  const reset = () => {

    // Resetear al valor original
    sphereRef.current.style.transform = "rotate(-90deg) translateX(60px)";
    sphereRef.current.style.animation = "none";
    
    setRunningTime(0);
    setDisplayTime("00:00");

    setIsRunning(false);
    clearInterval(stopwatchInterval.current);
    
  };

  const saveUpdatedTime = () => {
    setIsLoading(true);
    
    // Crear una copia actualizada del objeto original con el nuevo tiempo
    const updatedData = {
      ...timeData,
      sample: displayTime
    };
    
    if (onUpdateTime) {
      onUpdateTime(updatedData, setIsLoading);
    }
  };

  const calculateTime = (time) => {
    const totalSeconds = Math.floor(time / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const displaySeconds = String(totalSeconds % 60).padStart(2, "0");
    const displayMinutes = String(totalMinutes).padStart(2, "0");
    return `${displayMinutes}:${displaySeconds}`;
  };

  // Ajuste manual del tiempo (opcional)
  const addOneSecond = () => {
    const newRunningTime = runningTime + 1000;
    setRunningTime(newRunningTime);
    setDisplayTime(calculateTime(newRunningTime));
  };

  const subtractOneSecond = () => {
    if (runningTime >= 1000) {
      const newRunningTime = runningTime - 1000;
      setRunningTime(newRunningTime);
      setDisplayTime(calculateTime(newRunningTime));
    }
  };

  return (
    <>
      <main>
        <div className="circle">
          <div id="stopwatch" className="stopwatch">{displayTime}</div>
          <div className="buttons">
            <div className="stop_edit mr-2" onClick={()=> setIsEdit(null)}></div>
            <div
              id="play-pause"
              className={isRunning ? "ml-2 running " : "ml-2 paused"}
              onClick={playPause}
            ></div>
          </div>
        </div>
        <div id="seconds-sphere" className="seconds-sphere" ref={sphereRef}></div>
      </main>
      
      {/* Control manual opcional */}
      <div className="flex justify-center gap-4 py-2">
        <button className="time-adjust" onClick={subtractOneSecond}>-1s</button>
        <button className="time-adjust" onClick={reset}>0</button>
        <button className="time-adjust" onClick={addOneSecond}>+1s</button>
      </div>
      
      {isLoading ? (
        <>
          <div className="">
            <CircularProgress aria-label="Loading..." color="success" size="lg"/>
          </div>
        </>
      ) : (
        <>
          {
            displayTime !== "00:00" && (
              <div className="flex justify-center py-4">
                <Tooltip content={"Guardar cambios"} placement={"right"}>
                  <button className="save-time pulse-effect" onClick={saveUpdatedTime}>
                    <FaSave size={24} color="green" />
                  </button>
                </Tooltip>
              </div>
            )
          }  
        </>
      )}
    </>
  );
};

export default EditWatchChrono;