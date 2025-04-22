import React, { useState } from 'react'
import { FaDeleteLeft } from 'react-icons/fa6'
import { updateData } from '../../../../../../infraestructure/call_api/crud';
import { urlMain } from '../../../../../../infraestructure/data/const';
import { useRecoilState } from 'recoil';
import { zoneCyclesList } from '../../../../../../infraestructure/states/states_samples';
import toast from 'react-hot-toast';
import { ConfirmOpen } from '../../../sidebarForm/ConfirmOpers';
import { ZonesCyclesModalConfirm } from './ZonesCyclesModalConfirm';
import PercentZonesByZone from './PercentZonesByZone';


const ZoneCyclesObj = ({cycleIndex, cycle}) => {

  const [zonesCycles, setZonesCycles] = useRecoilState(zoneCyclesList);

  const [isOpenConfirm, setIsOpenConfirm] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  

  const handleDelete = (cycle) => {
    const deleteData = async () => {
      const time_cycle_oper_id = cycle.time_cycle_oper.id;
      setIsLoading(true)
      try {
        // Llamada a la API para eliminar el ciclo
        const result = await updateData(urlMain + `zones_cycles/${time_cycle_oper_id}/destroy_time_cycle`);
  
        if (result.destroy) {
          // Actualizar el estado eliminando el ciclo correspondiente
          setZonesCycles((prevZonesCycles) =>
            prevZonesCycles.map((group) => ({
              ...group,
              grouped_cycles: group.grouped_cycles.filter(
                (groupedCycle) => groupedCycle.time_cycle_oper.id !== time_cycle_oper_id
              ),
            })).filter((group) => group.grouped_cycles.length > 0) // Eliminar grupos vacíos
          );
          toast("El ciclo de tiempos ha sido eliminado correctamente")
        } else {
          console.error('Error: No se pudo eliminar el ciclo.');
        }
      } catch (error) {
        console.error('Error eliminando el ciclo:', error);
      } finally {
        setIsOpenConfirm(false)
        setIsLoading(false)
      }
    };
  
    deleteData();
  };

  return (
    <tr key={cycleIndex}  className="hover:bg-gray-100">
      {/* Ciclo */}
      <td className="border border-gray-300 px-4 py-2">
        Ciclo {cycleIndex + 1}
      </td>
      {/* Zonas */}
      <td className="border border-gray-300 px-4 py-2">
        <ul className="list-disc pl-4 font-bold capitalize">
          {cycle.zones_cycles.map((zone, zoneIndex) => (
            <li key={zoneIndex}>
              {zone.name}  <span className="text-secondary_two">{zone.sample}</span>
              <PercentZonesByZone
                sample={zone.sample}
              />
            </li>
          ))}
        </ul>
      </td>
      <td className="border border-gray-300 px-4 py-2">
        <span  className='flex justify-center'>
          <button
            onClick={() => setIsOpenConfirm(true)}
          > 
            <FaDeleteLeft
              size={30}
              className='text-red-500'/>
          </button>    
        </span>
        
      </td>

      <ZonesCyclesModalConfirm
        isOpen={isOpenConfirm}
        setIsOpen={setIsOpenConfirm}
        handleSave={() =>  handleDelete(cycle)}
        title="¿Quieres eliminar el ciclo"
        description={"# " + cycle.time_cycle_oper.cycle + "?"} 
        isLoading={isLoading}
      />
    </tr>
  )
}

export default ZoneCyclesObj