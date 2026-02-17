import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { checkOpersPosition } from '../../../../../../infraestructure/states/opers_states';
import { samplesZoneByZones } from '../../../../../../infraestructure/states/states_samples';
import WatchChrono from '../../../../../samples/WatchChrono';
import { FaCalendarPlus, FaClock, FaClockRotateLeft, FaDeleteLeft, FaPlay, FaRecordVinyl, FaRegClock } from 'react-icons/fa6';
import { Avatar, Badge, Progress } from '@nextui-org/react';
import MyCustomButton from '../../../../../../ui/MyCustomButton';
import { FaPlayCircle, FaSave } from 'react-icons/fa';
import SaveZonesByZone from './SaveZonesByZone';
import toast from 'react-hot-toast';
import { formatDateRails } from '../../../../../../ui/utils';
import UpdateZonesByZone from './UpdateZonesByZone';

const ListZonesByZone = ({cycleObjAdd,setCycleObjAdd,setIsOpen}) => {
  const [selectedOperDetails] = useRecoilState(checkOpersPosition);
  const [listZoneByZones, setListZoneByZones] = useRecoilState(samplesZoneByZones);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [ciclos, setCiclos] = useState([]);
  const [currentCycle, setCurrentCycle] = useState([]);
  const [order, setOrder] = useState(selectedOperDetails.map((_, i) => i));

  const startFrom = (index) => {
    const before = selectedOperDetails.map((_, i) => i).slice(index);
    const after = selectedOperDetails.map((_, i) => i).slice(0, index);
    const newOrder = [...before, ...after];
    setOrder(newOrder);
    setCurrentIndex(0);
    setCurrentCycle([]);
  };

  const handleSaveTime = (time, setIsLoading) => {
    const operIndex = order[currentIndex];
    const currentOper = selectedOperDetails[operIndex];
  
    // guardamos todo el objeto del operador + el tiempo + timestamp
    const newTime = {
      ...currentOper,
      sample: time,
      created_at: new Date().toISOString(),
    };
  
    const updatedCycle = [...currentCycle, newTime];
  
    if (updatedCycle.length === selectedOperDetails.length) {
      setCiclos((prev) => [...prev, updatedCycle]);
      setCurrentCycle([]);
      setCurrentIndex(0);
    } else {
      setCurrentCycle(updatedCycle);
      setCurrentIndex((prev) => prev + 1);
    }
  
    setIsLoading(false);
  };

  const handleDeleteCycle = (cycle, i) => {
    const updatedCiclos = ciclos.filter((_, index) => index !== i); // Excluye el ciclo con el índice `i`
    setCiclos(updatedCiclos); // Actualiza el estado con el nuevo array
    toast("Se ha eliminado el ciclo correctamente")
  }
  

  const currentOperName = selectedOperDetails[order[currentIndex]]?.name;
  const oper_id = selectedOperDetails[order[currentIndex]]?.id;

  return (
    <div className="py-2 mb-2">
      <div className="mb-4 text-sm text-zinc-800">
      <div className="mb-2">
        <span className="rounded-full text-lg font-semibold flex justify-between items-center">
          <span className='flex justify-end'>
            <FaPlayCircle 
              className='text-secondary_two mt-1 mr-1 animate-pulse'/>
            <span 
              className='uppercase text-secondary_two'>
                <span className="capitalize text-zinc-800"></span>  {currentOperName}
            </span>
            
          </span>
        
        </span>
      </div>
        <div>
          {selectedOperDetails.map((oper, idx) => (
            <div
              key={oper.id || idx}
              onClick={() => startFrom(idx)}
              className={`border rounded-lg p-4 cursor-pointer ${
                oper_id === oper.id ? 'bg-zinc-100 shadow-md' : 'bg-zinc-50'
              } dark:bg-zinc-800 mt-1 mb-1`}
            >
              <div className="flex justify-start">
                <span className="flex justify-between items-center">
                  <h3
                    className={`text-lg font-bold text-zinc-800 text-md capitalize `}
                  >
                    <span className="text-secondary_two">
                      {`zona ${ idx + 1 }`}
                    </span>  {oper.name}
                  </h3>
                 
                      <div className='relative'>

                        <button className='ml-2'>
                          <img
                            src={oper.avatar ? oper.avatar :
                              oper_id === oper.id ?
                                'https://balance-assets.sfo3.digitaloceanspaces.com/assets/user_green.png' :
                                'https://balance-assets.sfo3.digitaloceanspaces.com/assets/user.webp'
                            }
                            alt={oper.avatar ? oper.avatar : 'https://balance-assets.sfo3.digitaloceanspaces.com/assets/user.webp'}
                            className={`${
                              oper_id === oper.id ? '' : 'imageGrayScale'
                            }
                            ${
                              (oper_id === oper.id) && oper.avatar && 'w-20 h-20'
                            }
                            w-12 h-12 rounded-full object-cover `} 
                            style={{
                              border: `3px solid #80B7AE`, // Azul personalizado con 6px de grosor
                            }}
                          />
                          <span className="absolute bottom-0 left-7  px-2 py-1 rounded-full">
                            {
                              !(oper_id === oper.id) &&
                                <FaClock size={20} className='text-secondary_two bg-white rounded-full shadow-lg'/>
                            }
                            
                          </span>
                        </button>   
                      </div>
                    
                  
                  
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mostrar ciclo actual (en progreso) */}
      {
        currentCycle.length > 0 && (
          <div className="mb-4 border border-secondary_two rounded bg-zinc-50 shadow-md p-3">
            <div className="text-secondary_two font-semibold mb-2 uppercase flex justify-between items-center">
              Ciclo en progreso
             
              
            </div>
            {currentCycle.length === 0 && <div className="text-sm text-zinc-500">Aún no se ha registrado ningún tiempo.</div>}
            {currentCycle.map((toma, j) => (
              <div key={j} className="text-md text-zinc-800 capitalize">
                {toma.name}: <span className="text-secondary_two font-bold ml-1">{toma.sample}</span>
              </div>
            ))}
            <div className="flex justify-start pt-3">
              <Progress 
                isIndeterminate 
                aria-label="Loading..." 
                classNames={{
                  base: "w-full opacity-50",
                  track: "drop-shadow-md border border-default",
                  indicator: "bg-secondary_two",
                  label: "tracking-wider font-medium text-default-600",
                  value: "text-foreground/60",
                }}
                size="sm" />
            </div>
            
          </div>
        )
      }
      
      <div className="mb-2">
        <span className="rounded-full text-lg font-semibold flex justify-start">
         
          <span>
            <span className="rounded-full uppercase text-secondary_two px-2 py-1 bg-zinc-200 shadow-md">
              Ciclo <span>  # {ciclos.length + 1}</span> 
            </span>
          </span>
        </span>
      </div>

      {/* Cronómetro */}
      <WatchChrono onSaveTime={handleSaveTime} />

      {/* Ciclos completados */}
      <div className="mt-6">
        {ciclos.map((ciclo, i) => (
          <div key={i} className="mb-2 border p-2 rounded bg-gray-50">
            <div className="flex justify-between items-center">
              <div className="font-bold text-md text-secondary_two">Ciclo #{i + 1}</div>
             
            </div>
            {ciclo.map((toma, j) => (
              <div key={j} className="text-md text-zinc-800 capitalize ">
                <span>
                  {toma.name}:
                </span>
                <span className="text-secondary_two font-bold ml-2">
                  {toma.sample}
                </span>
              </div>
            ))}
            <div className="flex justify-end">
              <button
                onClick={() => handleDeleteCycle(ciclo, i)}
              > 
                <FaDeleteLeft 
                  size={30}
                  className='text-red-500'/>
              </button>
            </div>
            
          </div>
        ))}
      </div>
    

      {
        cycleObjAdd ? 
            ciclos.length > 0 && 
              <UpdateZonesByZone 
                ciclos={ciclos}
                cycleObjAdd={cycleObjAdd}
                setCycleObjAdd={setCycleObjAdd}
                setIsOpen={setIsOpen}
              /> :
            <>
              {
                ciclos.length > 0 && (
                  <SaveZonesByZone 
                    ciclos={ciclos} />
                )
              }
            </>
        // setCycleObjAdd
      }
      
    </div>
  );
};

export default ListZonesByZone;
