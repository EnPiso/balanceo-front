import React, { useState, useEffect } from 'react';
import { FaPlayCircle, FaStop, FaSave } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import { operationsSamples } from '../../../../../infraestructure/states/states_samples';
import ObjSampleAutomatic from './ObjSampleAutomatic';
import { Spinner, Tooltip } from '@nextui-org/react';
import { postData, postDataToken } from '../../../../../infraestructure/call_api/crud';
import { urlMain } from '../../../../../infraestructure/data/const';
import toast from 'react-hot-toast';
import CustomButton from '../../../../../ui/CustomButton';
import { detailOperOperations } from '../../../../../infraestructure/states/states_balancing';
import { tokenMemory } from '../../../../../infraestructure/states/states_views';

const ListSamplesAutomatic = ({setIsAutomatic}) => {
  const [isSample, setIsSample] = useState(false);
  const [samplesClock, setSamplesClock] = useState([]);
  const [samplesOperations, setSamplesOperations] = useRecoilState(operationsSamples);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [savedSamples, setSavedSamples] = useState([]);
  const [savedTimes, setSavedTimes] = useState({}); 
  const [isLoading, setIsLoading] = useState(false);

  const [detailOperOpera, setDetailOperOpera] = useRecoilState(detailOperOperations);

  const [token, setToken] = useRecoilState(tokenMemory);


  useEffect(() => {
    if (isAutoplay && currentIndex < samplesOperations.length) {
      // Asignar la operación actual a isSample cuando cambia el índice
      setIsSample(samplesOperations[currentIndex]);
    }
  }, [isAutoplay, currentIndex, samplesOperations]);

  const handleSaveTime = (displayTime, setIsLoading) => {
    const operation = samplesOperations[currentIndex];
  
    setSamplesClock((prev) => {
      const updatedSamples = { ...prev };
  
      if (!updatedSamples[operation.operation.id]) {
        updatedSamples[operation.operation.id] = { ...operation, times: [] };
      }
  
      updatedSamples[operation.operation.id].times.push(displayTime);
  
      return updatedSamples;
    });
  
    setSavedSamples((prev) => {
      const updatedSavedSamples = { ...prev };
  
      if (!updatedSavedSamples[operation.operation.id]) {
        updatedSavedSamples[operation.operation.id] = { ...operation, times: [] };
      }
  
      updatedSavedSamples[operation.operation.id].times.push(displayTime);
  
      return updatedSavedSamples;
    });
  
    setIsLoading(false);
  
    // Avanzar a la siguiente operación o volver al principio si es la última
    if (currentIndex < samplesOperations.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Si ha completado todos, podría mostrar un mensaje o tomar alguna acción
      setCurrentIndex(0);
      // Opcionalmente podrías detener el autoplay aquí si quieres que pare al completar todas las operaciones
      // setIsAutoplay(false);
    }
  };

  const startAutoplay = () => {
    setIsAutoplay(true);
    setCurrentIndex(0);
  };

  const stopAutoplay = () => {
    setIsAutoplay(false);
    setSamplesClock([]);
    setSavedSamples([]);
    setSavedTimes({});
    setIsSample(false);
  };

  const saveSamples = () => {
    const samplesUpdate = Object.values(savedSamples).map((sample) => {
      return {
        detail_oper_operation_id: sample.detail_oper_operation_id,
        times: sample.times,
        operations_balancing_id: sample.operations_balancing_id
      }
    });
    
    const data = {
      samplings: {
        samplings: JSON.stringify(samplesUpdate)
      }
    }

    const createAutoplay = async () => {
      setIsLoading(true)
      try {
        const result = await postDataToken(urlMain + "samplings/create_autoplay", data, token);
     
         // Actualizar samplesOperations con los datos recibidos
         setSamplesOperations((prevSamplesOperations) =>
          prevSamplesOperations.map((operation) => {
            const updatedSamplings = result.samplings.filter(
              (sampling) => sampling.detail_oper_operation_id === operation.detail_oper_operation_id
            );
            return {
              ...operation,
              samplings: [...operation.samplings, ...updatedSamplings]
            };
          })
        );
        //console.log(detailOperOpera)

        // Actualizar detailOperOpera con los datos recibidos
        const updatedDetailOperOpera = detailOperOpera.map((targetItem) => {
          const matchingSamplings = result.samplings.filter(
            (sourceItem) => targetItem.detail.id === sourceItem.detail_oper_operation_id
          );
          if (matchingSamplings.length > 0) {
            return {
              ...targetItem,
              detail: {
                ...targetItem.detail,
                samplings_count: targetItem.detail.samplings_count + matchingSamplings.length,
              },
            };
          }
          return targetItem;
        });
        
        setDetailOperOpera(updatedDetailOperOpera);
        setIsAutomatic(false);
        toast.success("Se han guardado los tiempos correctamente");
      } catch (error) {
        console.error('Error setting data', error);
      } finally {
        stopAutoplay();
        setIsLoading(false);
      }
    };

    createAutoplay();
  };

  const countSaves = Object.values(savedSamples).reduce((acc, op) => acc + (op.times.length || 0), 0);

  return (
    <>
      <div className={` flex mb-4  px-2  font-bold mt-2  ${isAutoplay ? 'justify-between py-4' : 'justify-center py-7'}`}>
        {!isAutoplay ? (
          <>
            <Tooltip content="Iniciar tomas de tiempos">
              <button onClick={startAutoplay} className="btn btn-primary flex justify-center hover:text-green-700 hover:underline underline-offset-2">
                <FaPlayCircle className="ml-2 animate-pulse text-secondary_two" size={60} />
              </button>
            </Tooltip>
          </>
        ) : (
          <>
            {Object.values(savedSamples).length >= 1 && 
              <Tooltip 
                content={`Borrar ${countSaves < 2 ? "una toma de tiempo" : countSaves + " tomas de tiempo"}`}  
                placement="right">
                <div>
                  <CustomButton
                    color="default"
                    variant="bordered"
                    startContent={<FaStop color="red" />}
                    onClick={stopAutoplay}
                    title={`Eliminar`} 
                  />
                </div>
              </Tooltip>
            }
          </>
        )}

        {Object.values(savedSamples).length > 0 && (
          <>
            {isLoading ? (
              <>
                <Spinner size='lg' color='default'/>
              </> 
            ) : (
              <>
                <Tooltip 
                  content={`Guardar ${countSaves < 2 ? "una toma de tiempo" : countSaves + " tomas de tiempo"}`}   
                  placement="right">
                  <div>
                    <CustomButton
                      color="default"
                      variant="bordered"
                      startContent={<FaSave className="text-secondary_two" />}
                      onClick={saveSamples}
                      title={`GUARDAR  ${countSaves}`} 
                    />
                  </div>
                </Tooltip>
              </>
            )}
          </>
        )}
      </div>
     

      {samplesOperations.map((sampleOperation, i) => (
        <ObjSampleAutomatic
          key={sampleOperation.operation.id}
          sampleOperation={sampleOperation}
          samplesClock={samplesClock}
          setSamplesClock={setSamplesClock}
          isSample={isSample}
          setIsSample={setIsSample}
          handleSaveTime={handleSaveTime}
          isAutoplay={isAutoplay}
          currentIndex={currentIndex}
          index={i}
          savedTimes={savedTimes[sampleOperation.operation.id] || []}
          setSavedTimes={setSavedTimes}
        />
      ))}
    </>
  );
};

export default ListSamplesAutomatic;