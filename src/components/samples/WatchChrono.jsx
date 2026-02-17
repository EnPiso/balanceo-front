import React, { useState, useRef } from "react";
import "./style.css";
import { FaRecordVinyl } from "react-icons/fa6";
import { CircularProgress, Tooltip } from "@nextui-org/react";

const WatchChrono = ({ onSaveTime }) => {
  const [runningTime, setRunningTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [displayTime, setDisplayTime] = useState("00:00");
  const [isLoading, setIsLoading] = useState(false);
  
  const sphereRef = useRef(null);
  let stopwatchInterval = useRef(null);
  const startTimeRef = useRef(0);
  const pausedTimeRef = useRef(0);
  
  const start = (fromPause = false) => {
    // Si viene de una pausa, usamos el tiempo acumulado
    // Si no, comenzamos desde cero
    if (fromPause) {
      startTimeRef.current = Date.now() - pausedTimeRef.current;
    } else {
      startTimeRef.current = Date.now();
      pausedTimeRef.current = 0;
      setRunningTime(0);
      setDisplayTime("00:00");
      
      // Reiniciar la animación solo cuando es un nuevo inicio (no desde pausa)
      sphereRef.current.style.animation = "none";
      void sphereRef.current.offsetWidth; // Triggers reflow para reiniciar animación
    }
    
    sphereRef.current.style.animation = "rotacion 60s linear infinite";
    sphereRef.current.style.animationPlayState = "running";
    
    stopwatchInterval.current = setInterval(() => {
      const newRunningTime = Date.now() - startTimeRef.current;
      setRunningTime(newRunningTime);
      setDisplayTime(calculateTime(newRunningTime));
    }, 1000);
  };
  
  const playPause = () => {
    if (!isRunning) {
      // Si no está corriendo, empezamos o reanudamos
      start(pausedTimeRef.current > 0);
    } else {
      // Si está corriendo, pausamos
      pause();
    }
    setIsRunning(!isRunning);
  };
  
  const pause = () => {
    // Guardamos el tiempo acumulado hasta ahora
    pausedTimeRef.current = runningTime;
    
    sphereRef.current.style.animationPlayState = "paused";
    clearInterval(stopwatchInterval.current);
  };
  
  const stop = () => {
    // Detener el intervalo primero
    clearInterval(stopwatchInterval.current);
    
    // Reiniciar la animación y posición del esfera
    sphereRef.current.style.animation = "none";
    // Asegurar que vuelva a la posición inicial (rotación -90 grados y desplazamiento)
    sphereRef.current.style.transform = "rotate(-90deg) translateX(60px)";
    
    // Reiniciar todos los valores
    setRunningTime(0);
    setDisplayTime("00:00");
    setIsRunning(false);
    pausedTimeRef.current = 0;
  };
  
  const saveTime = () => {
    // Permitir guardar el tiempo incluso si está pausado
    // (siempre que haya tiempo registrado)
    if (displayTime === "00:00") return; 
    
    setIsLoading(true);
    if (onSaveTime) {
      onSaveTime(displayTime, setIsLoading);
    }
    
    // Reiniciar cronómetro y animación
    clearInterval(stopwatchInterval.current);
    pausedTimeRef.current = 0;
    setRunningTime(0);
    setDisplayTime("00:00");
    
    // Reiniciar la animación a posición inicial
    sphereRef.current.style.animation = "none";
    sphereRef.current.style.transform = "rotate(-90deg) translateX(60px)";
    
    
    // Si estaba corriendo, iniciamos nuevamente
    if (isRunning) {
      start(false);
    } else {
      setIsRunning(false); // Asegurar que esté en estado detenido
    }
    
    setIsLoading(false);
  };
  
  const calculateTime = (time) => {
    const totalSeconds = Math.floor(time / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const displaySeconds = String(totalSeconds % 60).padStart(2, "0");
    const displayMinutes = String(totalMinutes).padStart(2, "0");
    return `${displayMinutes}:${displaySeconds}`;
  };
  
  return (
    <div className="py-6">
      <main>
        <div className="circle">
          <div id="stopwatch" className="stopwatch">{displayTime}</div>
          <div className="buttons">
            <div className="stop mr-2" onClick={stop}></div>
            <div
              id="play-pause"
              className={isRunning ? "ml-2 running " : "ml-2 paused"}
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
        displayTime !== "00:00" && (
          <div className="flex justify-center py-4">
            <Tooltip content={"Agregar tiempo"} placement={"right"}>
              <button className="save-time pulse-effect" onClick={saveTime}>
                <FaRecordVinyl size={35} color="red" />
              </button>
            </Tooltip>
           </div>
        ) 
      )}
      
      

    </div>
  );
};

export default WatchChrono;