import React, { useState, useEffect } from 'react';
import { FaPlayCircle, FaStop, FaSave, FaRecordVinyl } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import { operationsSamples } from '../../../../../infraestructure/states/states_samples';
import ObjSampleAutomatic from './ObjSampleAutomatic';
import { Spinner, Tooltip } from '@nextui-org/react';
import { postData } from '../../../../../infraestructure/call_api/crud';
import { urlMain } from '../../../../../infraestructure/data/const';
import toast from 'react-hot-toast';
import CustomButton from '../../../../../ui/CustomButton';

const ListSamplesAutomatic = ({setIsAutomatic}) => {
  const [isSample, setIsSample] = useState(false);
  const [samplesClock, setSamplesClock] = useState([]);
  const [samplesOperations, setSamplesOperations] = useRecoilState(operationsSamples);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [savedSamples, setSavedSamples] = useState([]);
  const [savedTimes, setSavedTimes] = useState({}); // Guardar tiempos por operación

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAutoplay && currentIndex < samplesOperations.length) {
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
  
    if (currentIndex < samplesOperations.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
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
    setIsSample(false)
    

  };

  const saveSamples = () => {
    // console.log('Saved Samples:', Object.values(savedSamples));

    const samplesUpdate = Object.values(savedSamples).map((sample)=> {
      return {
        detail_oper_operation_id: sample.detail_oper_operation_id,
        times: sample.times
      }
    })

    const data = {
      samplings: {
        samplings: JSON.stringify(samplesUpdate)
      }
    }

    const createAutoplay = async () => {
      setIsLoading(true)
      try {
        const result = await postData(urlMain + "samplings/create_autoplay", data)
        console.log(result)
        setIsAutomatic(false)
        toast.success("Se han guardado los tiempos correctamente")
      } catch (error) {
        console.error('Error setting data', error);
      } finally {
        stopAutoplay()
        setIsLoading(false)
      }
    };

    createAutoplay();
    
  };

  const countSaves = Object.values(savedSamples).reduce((acc, op) => acc + (op.times.length || 0), 0)

  return (
    <>
      <div className={` flex mb-4  px-2  font-bold mt-2  ${isAutoplay ? 'justify-between py-4' : 'justify-center py-7'}`}>
        {!isAutoplay ? (
          <>
            <Tooltip content="Iniciar tomas de tiempos">
              <button onClick={startAutoplay} className="btn btn-primary flex justify-center hover:text-green-700 hover:underline underline-offset-2">
               
                <FaPlayCircle className="ml-2 animate-pulse" size={45} color="green" />
              </button>
            </Tooltip>
          </>
        ) : (
          <>

                   


          {
            Object.values(savedSamples).length >= 1 && 
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

        {
          Object.values(savedSamples).length > 0 && (
            <>
            
              {
                isLoading ? (
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
                            startContent={<FaSave color="green" />}
                            onClick={saveSamples}
                            title={`GUARDAR  ${countSaves}`} 
                          />
                        </div>
                        
                    </Tooltip>
                  </>
                  
                )
              }
            </>
          )
        }


      </div>
        
        {
          isAutoplay && Object.values(savedSamples).length < 1 && (
            <>
              <div className="flex items-center justify-center w-full">
                <div className="flex flex-col w-full">
                 
                    <div className="w-full flex items-center my-3 bg-zinc-200 py-4 px-4">
                        <h2 className='text-lg text-center uppercase font-light container-fluid '>
                         Haz clic en el botón de reproducción <span className="text-green-600 animate-pulse text-lg">▶</span>  para iniciar la toma de tiempos.
                         Luego, presiona el botón rojo de grabar <span className="animate-pulse text-lg"> 🔴 </span> para detener la grabación.
                         Una vez guardado el tiempo, la aplicación avanzará automáticamente a la 
                         siguiente operación, repitiendo el proceso hasta que completes y guardes todas las mediciones.
                        </h2>
                    </div>
          
                </div>
              </div>
            </>
          )
        }
    

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
          savedTimes={savedTimes[sampleOperation.operation.id] || []} // Solo muestra los tiempos de esta operación
          setSavedTimes={setSavedTimes}
        />
      ))}
    </>
  );
};

export default ListSamplesAutomatic;
