import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { zoneCyclesList } from '../../../../../../infraestructure/states/states_samples';
import ZoneCyclesObj from './ZoneCyclesObj';
import { FaDeleteLeft } from 'react-icons/fa6';
import { Badge } from '@nextui-org/react';
import { FaPlus, FaPlusCircle } from 'react-icons/fa';
import ZonesByZoneAddModal from './ZonesByZoneAddModal';

const ListZonesCycles = () => {
  const [zonesCycles] = useRecoilState(zoneCyclesList);

  const [isOpen,setIsOpen] = useState(false)

  const [cycleObjAdd,setCycleObjAdd] = useState(false)

  return (
    <div className="p-4">
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