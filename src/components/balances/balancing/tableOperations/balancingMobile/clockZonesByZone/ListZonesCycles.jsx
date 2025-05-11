import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { zoneCyclesList } from '../../../../../../infraestructure/states/states_samples';
import ZoneCyclesObj from './ZoneCyclesObj';
import { FaDeleteLeft } from 'react-icons/fa6';
import { Badge, CircularProgress } from '@nextui-org/react';
import { FaPlus, FaPlusCircle } from 'react-icons/fa';
import ZonesByZoneAddModal from './ZonesByZoneAddModal';
import { useEffect } from 'react';
import { orderObjBalancing } from '../../../../../../infraestructure/states/order_states';
import { fetchGetData } from '../../../../../../infraestructure/call_api/crud';
import { urlMain } from '../../../../../../infraestructure/data/const';
import { isLoadingTime } from '../../../../../../infraestructure/states/operation_master_state';

const ListZonesCycles = () => {
  const [zonesCycles, setZonesCycles] = useRecoilState(zoneCyclesList);
  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);
  const [isLoadingTimeModal, setIsLoadingTimeModal] = useRecoilState(isLoadingTime)
  

  const [isOpen,setIsOpen] = useState(false)

  const [cycleObjAdd,setCycleObjAdd] = useState(false)

  const [ isLoading, setIsLoading ] = useState(false)

  useEffect(()=> {
    
    if(isLoadingTimeModal){
      setIsLoading(true)
    } else if(zonesCycles.length >=  1){
      setIsLoading(false)
    } else {
      setIsLoading(true)
    }
  }, [])

  useEffect(()=> {
    const getApiZonesCycles = () => {
        const balancing_id = objBalancing.balancing_id
      
        const getData = async () => {
          try {
            const result = await fetchGetData(`${urlMain}zones_cycles?balancing_id=${balancing_id}`);
            setZonesCycles(result.cycles)
            
          } catch (error) {
            console.error("Error al obtener los datos:", error);
          } finally {
            setIsLoading(false)
            setIsLoadingTimeModal(false)
          }
        };
        getData();
    }

    isLoadingTimeModal && getApiZonesCycles()
  }, [isLoadingTimeModal])

  return (
    <div className="p-4">
      
      {
        isLoading ? 
          <div className="flex justify-center">
            <CircularProgress size='lg' color='default'/>
          </div> : 
          <>
            {zonesCycles.map((group, groupIndex) => (
              <div key={groupIndex} className="mb-6">
                {/* Fecha del grupo */}
                <div className="overflow-x-auto">
                  <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Ciclo 
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Operarios
                        </th>
                        <th className="border text-secondary_two border-gray-300 px-4 py-2 flex justify-center">
                              {/* groupIndex + 1 */} 
                            {/* new Date(group.created_at).toLocaleString() */}
                      
                          <button 
                            onClick={()=> {
                              setIsOpen(true)
                              setCycleObjAdd(group)
                            }}>
                            <FaPlus size={24} className=''/>
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.grouped_cycles.map((cycle, cycleIndex) => (
                        
                          <ZoneCyclesObj
                            key={cycleIndex}
                            cycleIndex={cycleIndex}
                            cycle={cycle}
                          />
                      ))}
             
                      
                    </tbody>
                  </table>
                </div>
              </div>
            ))}  
          </>
      }
      

      <ZonesByZoneAddModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        cycleObjAdd={cycleObjAdd}
        setCycleObjAdd={setCycleObjAdd}
      />
    </div>
  );
};

export default ListZonesCycles;