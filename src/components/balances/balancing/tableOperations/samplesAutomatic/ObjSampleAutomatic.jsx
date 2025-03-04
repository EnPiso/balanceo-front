import React, { useState, useEffect, useRef } from 'react';
import { FaClock } from 'react-icons/fa';
import WatchChronoAutoPlay from './WatchChronoAutoPlay';

const ObjSampleAutomatic = ({
  sampleOperation,
  setIsSample,
  isSample,
  handleSaveTime,
  isAutoplay,
  currentIndex,
  index,
  savedTimes,
  setSavedTimes
}) => {
  const { operation } = sampleOperation;
  const [isSampleClock, setIsSampleClock] = useState(false);
  const sampleRef = useRef(null);

  useEffect(() => {
    setIsSampleClock(isAutoplay && currentIndex === index);
    if (isAutoplay && currentIndex === index) {
      sampleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isAutoplay, currentIndex, index]);

  const handleSample = (sampleOperation) => {
    setIsSample(sampleOperation);
    setIsSampleClock(true);
  };

  const handleSaveTimeWrapper = (displayTime, setIsLoading) => {
    const operationId = sampleOperation.operation.id;
  
    setSavedTimes((prev) => ({
      ...prev,
      [operationId]: [...(prev[operationId] || []), displayTime] // Agrega sin eliminar duplicados
    }));
  
    handleSaveTime(displayTime, setIsLoading);
  };
  
  return (
    <div  className="border rounded-lg p-4 bg-white dark:bg-zinc-800 mt-1 mb-1">
      <div className="flex justify-start">
        <span
          className="flex justify-between items-center"
          disabled={isAutoplay} // Deshabilitar el botón cuando autoplay está activado
        >
          <h3 className={`
           text-xs sm:text-sm md:text-md
            capitalize  ${isSample && operation.id === isSample.operation.id ? 'font-bold text-green-700' : ''}`}>
            {operation.operation}
          </h3>
          <FaClock className="ml-3" />
        </span>
      </div>

      {isSampleClock && (
        <>
          <div className="mt-16 sm:mt-3" ref={sampleRef}>
            <WatchChronoAutoPlay 
              onSaveTime={handleSaveTimeWrapper}/>
          </div>
        </>
      )}

      {savedTimes.length > 0 && (
        <div className="mt-2">
          <h4 className="text-sm font-bold">Tiempos:</h4>
          <ul>
            {savedTimes.map((time, i) => (
              <li key={i} className="text-sm">
                {time}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ObjSampleAutomatic;
