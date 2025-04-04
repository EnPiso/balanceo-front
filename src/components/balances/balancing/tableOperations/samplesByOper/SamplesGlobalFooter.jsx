import React, { useEffect } from 'react'
import { orderObjBalancing } from '../../../../../infraestructure/states/order_states';
import { useRecoilState } from 'recoil';
import { samplingsCircleList, samplingsCircleObj } from '../../../../../infraestructure/states/states_mobile';
import { selectOpers } from '../../../../../infraestructure/states/opers_states';
import { samSumOperation } from '../../../../../infraestructure/states/operation_states';
import SamplesGlobalCard from './SamplesGlobalCard';

const SamplesGlobalFooter = () => {
  
  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);
  const [samplingsCircle, setSamplingsCircle] = useRecoilState(samplingsCircleList);
  const [opersSelect, setOpersSelect] = useRecoilState(selectOpers)
  const [samSum, setSamSum] = useRecoilState(samSumOperation);
  const [samplingsGlobal, setSamplingsGlobal] = useRecoilState(samplingsCircleObj)

  useEffect(() => {
    console.log("samplingsCircle cambió:", samplingsCircle);
    if (samplingsCircle.length < 1) {
      setSamplingsGlobal(null);
    } else {
      const dataUpdate = {
        cycles: samplingsCircle.length,
        total_time: totalSeconds.toFixed(2),
        potencial_percent: processTimeFormat(`${objBalancing.total_sam}/${totalSeconds}`),
        potential_uds: golDay(),
      };
      setSamplingsGlobal(dataUpdate);
    }
  }, [samplingsCircle]);
  
  // Función para convertir "mm:ss" a segundos
  const convertToSeconds = (time) => {
    const [minutes, seconds] = time.split(":").map(Number);
    return minutes * 60 + seconds;
  };

  // Sumar todos los valores de "sample" en segundos
  let totalSeconds = samplingsCircle.reduce((total, item) => {
    return total + convertToSeconds(item.sample);
  }, 0);

  totalSeconds = totalSeconds / 60 // Convertir a minutos

  totalSeconds = totalSeconds / samplingsCircle.length
  

  const processTimeFormat = (timeFormat) => {
    const [time, divisor] = timeFormat.split("/").map(Number); // Separar el tiempo y el divisor
    // Dividir por el divisor y redondear a 2 decimales
    return `${((time / divisor) * 100).toFixed(0)} %`;
  };

  const golDay = () => {
    const minutesHour = opersSelect.size * 60
    const golHour = parseInt(minutesHour / totalSeconds)
    const golDayNumber = parseInt((minutesHour / totalSeconds) * 8)
    
    return golDayNumber
    
  }

  return (
    <div>
      <SamplesGlobalCard
        cycles={samplingsCircle.length}
        totalSeconds={totalSeconds.toFixed(2)}
        total_sam={objBalancing.total_sam.toFixed(2)}
        potential={processTimeFormat(`${objBalancing.total_sam}/${totalSeconds}`)}
        potentialUds={golDay()}
        handleFunction={false}
      />
  
    </div>
  )
}

export default SamplesGlobalFooter