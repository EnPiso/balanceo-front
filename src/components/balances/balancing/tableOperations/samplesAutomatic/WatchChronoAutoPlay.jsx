import React, { useState, useRef } from 'react';
import './style.css';
import { FaRecordVinyl } from 'react-icons/fa6';
import { CircularProgress, Tooltip } from '@nextui-org/react';

const WatchChronoAutoPlay = ({ onSaveTime }) => {
  const [runningTime, setRunningTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [displayTime, setDisplayTime] = useState('00:00');
  const [savedTimes, setSavedTimes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    sphereRef.current.style.animation = 'rotacion 60s linear infinite';
    sphereRef.current.style.animationPlayState = 'running';
    stopwatchInterval.current = setInterval(() => {
      const newRunningTime = Date.now() - startTime;
      setRunningTime(newRunningTime);
      setDisplayTime(calculateTime(newRunningTime));
    }, 1000);
  };

  const pause = () => {
    sphereRef.current.style.animationPlayState = 'paused';
    clearInterval(stopwatchInterval.current);
  };

  const stop = () => {
    sphereRef.current.style.transform = 'rotate(-90deg) translateX(60px)';
    sphereRef.current.style.animation = 'none';
    setRunningTime(0);
    setDisplayTime('00:00');
    setIsRunning(false);
    clearInterval(stopwatchInterval.current);
  };

  const saveTime = () => {
    setIsLoading(true);
    setSavedTimes([...savedTimes, displayTime]);
    if (onSaveTime) {
      onSaveTime(displayTime, setIsLoading);
    }
    stop();
  };

  const calculateTime = (time) => {
    const totalSeconds = Math.floor(time / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const displaySeconds = String(totalSeconds % 60).padStart(2, '0');
    const displayMinutes = String(totalMinutes).padStart(2, '0');
    return `${displayMinutes}:${displaySeconds}`;
  };

  return (
    <>
      <main>
        <div className="circle ">
          <div id="stopwatch" className="stopwatch">
            {displayTime}
          </div>
          <div className="buttons">
            <div className="stop mr-2" onClick={stop}></div>
            <div
              id="play-pause"
              className={isRunning ? 'ml-2 running ' : 'ml-2 paused'}
              onClick={playPause}
            ></div>
          </div>
        </div>
        <div id="seconds-sphere" className="seconds-sphere" ref={sphereRef}></div>
      </main>

      {isLoading ? (
        <div className="">
          <CircularProgress aria-label="Loading..." color="success" size="lg" />
        </div>
      ) : (
        displayTime !== '00:00' && (
          <div className="flex justify-center py-4 mt-8 sm:mt-3">
            <Tooltip content={'Agregar tiempo'} placement={'right'}>
              <button className="save-time pulse-effect" onClick={saveTime}>
                <FaRecordVinyl size={24} color="red" />
              </button>
            </Tooltip>
          </div>
        )
      )}
    </>
  );
};

export default WatchChronoAutoPlay;