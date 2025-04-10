import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil';
import { orderObjBalancing } from '../../../../../infraestructure/states/order_states';
import { samplingsCircleList } from '../../../../../infraestructure/states/states_mobile';
import { selectOpers } from '../../../../../infraestructure/states/opers_states';
import { samSumOperation } from '../../../../../infraestructure/states/operation_states';
import SamplesGlobalCard from '../samplesByOper/SamplesGlobalCard';
import { zonesSamplesList } from '../../../../../infraestructure/states/states_samples_zones';

const SamplesZonesFooter = () => {
  
  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);

  const [zonesSamples, setZonesSamples] = useRecoilState(zonesSamplesList)
  
  // Función para convertir "mm:ss" a segundos
  const convertToSeconds = (time) => {
    const [minutes, seconds] = time.split(":").map(Number);
    return minutes * 60 + seconds;
  };

  // Sumar todos los valores de "sample" en segundos
  let totalSeconds = zonesSamples.reduce((total, item) => {
    return total + convertToSeconds(item.sample);
  }, 0);

  totalSeconds = totalSeconds / 60 // Convertir a minutos

  totalSeconds = totalSeconds / zonesSamples.length
  

  const processTimeFormat = (timeFormat) => {
    const [time, divisor] = timeFormat.split("/").map(Number); // Separar el tiempo y el divisor
    // Dividir por el divisor y redondear a 2 decimales
    return `${((time / divisor) * 100).toFixed(0)} %`;
  };

  const golDay = () => {
    const minutesHour = 60
    const golHour = parseInt(minutesHour / totalSeconds)
    const golDayNumber = parseInt((minutesHour / totalSeconds) * 8)
    
    return golDayNumber
    
  }

  return (
    <div>
      <SamplesGlobalCard
        cycles={zonesSamples.length}
        totalSeconds={totalSeconds.toFixed(2)}
        total_sam={objBalancing.total_sam.toFixed(2)}
        potential={processTimeFormat(`${objBalancing.total_sam}/${totalSeconds}`)}
        potentialUds={golDay()}
        handleFunction={false}
      />
  
    </div>
  )
}

export default SamplesZonesFooter