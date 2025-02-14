import React, { useState, useRef, useEffect } from "react";
import "./style.css"; // Asegúrate de migrar también el CSS

const WatchChrono = () => {
  const [runningTime, setRunningTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [displayTime, setDisplayTime] = useState("00:00");
  const stopwatchRef = useRef(null);
  const sphereRef = useRef(null);
  let stopwatchInterval = useRef(null);

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

  const stop = () => {
    sphereRef.current.style.transform = "rotate(-90deg) translateX(60px)";
    sphereRef.current.style.animation = "none";
    setRunningTime(0);
    setDisplayTime("00:00");
    setIsRunning(false);
    clearInterval(stopwatchInterval.current);
  };

  const calculateTime = (time) => {
    const totalSeconds = Math.floor(time / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const displaySeconds = String(totalSeconds % 60).padStart(2, "0");
    const displayMinutes = String(totalMinutes).padStart(2, "0");
    return `${displayMinutes}:${displaySeconds}`;
  };

  return (
    <main>
      <div className="circle">
        <div id="stopwatch" className="stopwatch">
          {displayTime}
        </div>
        <div className="buttons">
          <div className="stop mr-2" onClick={stop}></div>
          <div
            id="play-pause"
            className={isRunning ? "ml-2 running" : "ml-2 paused"}
            onClick={playPause}
          ></div>

        </div>
      </div>
      <div id="seconds-sphere" className="seconds-sphere" ref={sphereRef}></div>
    
    </main>
  );
};

export default WatchChrono;