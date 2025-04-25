import React from 'react'
import { FaClock } from 'react-icons/fa'
import { zoneCyclesList } from '../../../../../infraestructure/states/states_samples';
import { clockZoneByZoneModal } from '../../../../../infraestructure/states/states_mobile';
import { useRecoilState } from 'recoil';
import { orderObjBalancing } from '../../../../../infraestructure/states/order_states';
import { fetchGetData } from '../../../../../infraestructure/call_api/crud';
import { urlMain } from '../../../../../infraestructure/data/const';

const SecuentialZone = ({setIsLoading}) => {

  const [zoneByZoneModal, setZoneByZoneModal]  = useRecoilState(clockZoneByZoneModal)

  const [zonesCycles, setZonesCycles] = useRecoilState(zoneCyclesList);

  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);
  

  const clockZoneByZone = () => {
    //console.log(!zoneByZoneModal)
    getApiZonesCycles()
  }

  const getApiZonesCycles = () => {
      const balancing_id = objBalancing.balancing_id
      setIsLoading(true)
      const getData = async () => {
        try {
          const result = await fetchGetData(`${urlMain}zones_cycles?balancing_id=${balancing_id}`);
          setZonesCycles(result.cycles)
          setZoneByZoneModal(!zoneByZoneModal)
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        } finally {
          setIsLoading(false)
        }
      };
      getData();
    }


  return (
    <div className="relative mt-1 ">
      <button onClick={clockZoneByZone} className="flex items-center">
        <FaClock
          style={{
            border: `3px solid #3B82F6`, // Azul personalizado con 6px de grosor
          }}
          className="w-10 h-10 rounded-full object-cover text-primary_one" />
        <span className="text-primary_one font-bold ml-1">
          Zona secuencial
        </span>
      </button>
    </div>
  )
}

export default SecuentialZone