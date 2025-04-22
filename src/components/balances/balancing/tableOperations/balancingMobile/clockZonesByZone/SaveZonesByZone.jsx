import React, { useState } from 'react'
import MyCustomButton from '../../../../../../ui/MyCustomButton'
import { FaSave } from 'react-icons/fa'
import { useRecoilState } from 'recoil';
import { orderObjBalancing } from '../../../../../../infraestructure/states/order_states';
import { detailOperOperations } from '../../../../../../infraestructure/states/states_balancing';
import { postData, updateData } from '../../../../../../infraestructure/call_api/crud';
import { urlMain } from '../../../../../../infraestructure/data/const';
import { isCycleList, zoneCyclesList } from '../../../../../../infraestructure/states/states_samples';
import toast from 'react-hot-toast';
import { CircularProgress } from '@nextui-org/react';

const SaveZonesByZone = ({ciclos}) => {
  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);
  const [detailOperOpera, setDetailOperOpera] = useRecoilState(detailOperOperations);
  const [zonesCycles, setZonesCycles] = useRecoilState(zoneCyclesList);

  const [isCycleCreate, setIsCycleCreate] = useRecoilState(isCycleList)
  const [isLoading, setIsLoading] = useState(false)
  

  const handleSave = () => { 
    const dateUpdate = new Date().toISOString();
    
    // Crea un nuevo array de objetos donde cada subarray tiene un campo `created_at`
    const ciclosUpdate = ciclos.map((subArray, i) => ({
      cycle: i + 1,
      created_at: dateUpdate, // Fecha asociada al subarray
      data: subArray.map((sample, index) => {
        // Busca el operario correspondiente y actualiza `opers_balancing_id`
        const matchingOper = detailOperOpera.find((oper) => oper.oper_id === sample.id);
        
        return {
          ...sample,
          opers_balancing_id: matchingOper ? matchingOper.detail.opers_balancing_id : null,
          index: index + 1 // Agrega o actualiza el campo
        };
      }),
    }));
  
    const data = {
      zones_cycles: JSON.stringify(ciclosUpdate),
      balancing_id: objBalancing.balancing_id,
    };
  
    handleApi(data);
    
  };

  const handleApi = (data) => {
    setIsLoading(true)
    const postZonesCycles = async () => {
      try {
        const result = await postData(urlMain + "zones_cycles", data)
        
        setZonesCycles((prevZonesCycles) => [
          ...prevZonesCycles,
          ...result,
        ])
        toast.success("Se ha guardado correctamente las tomas de tiempos")
        setIsCycleCreate(false)
      } catch (error) {
        console.error('Error setting data', error);
      } finally { 
        setIsLoading(false)
      }
    };
    postZonesCycles();
  }

  return (
    <div>
      {
        isLoading ?
          <CircularProgress 
            size='lg' 
            color='default' 
            className=" mt-1 mr-3 "/> : 
          <MyCustomButton
            icon={<FaSave className=" mt-1 mr-3 "/>}
            title={ciclos.length > 1 ? "Guardar Ciclos" : "Guardar Ciclo"} 
            handleClick={handleSave}
            value={"Guardar Ciclo"} 
            bgButton={"bg-zinc-800"}
            textButton={"text-secondary_two"}
          />
      }
      
    </div>
  )
}

export default SaveZonesByZone