import React, { useEffect } from 'react'
import { orderObjBalancing } from '../../../../../infraestructure/states/order_states';
import { useRecoilState } from 'recoil';
import { clockGlobalModal, samplingsCircleList, samplingsCircleObj } from '../../../../../infraestructure/states/states_mobile';
import { selectOpers } from '../../../../../infraestructure/states/opers_states';
import { samSumOperation } from '../../../../../infraestructure/states/operation_states';
import SamplesGlobalCard from './SamplesGlobalCard';

const SamplesGlobalFooter = () => {
  
  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);
  const [samplingsCircle, setSamplingsCircle] = useRecoilState(samplingsCircleList);
  const [opersSelect, setOpersSelect] = useRecoilState(selectOpers)
  const [samSum, setSamSum] = useRecoilState(samSumOperation);

  
  
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
    return `${((time / divisor) * 100).toFixed(0)}`;
  };

  const golDay = () => {
    const minutesHour = opersSelect.size * 60
    const golHour = parseInt(minutesHour / totalSeconds)
    const golDayNumber = parseInt((minutesHour / totalSeconds) * 8)

    return golDayNumber

  }

  const cycleValuesMin = samplingsCircle.map(s => convertToSeconds(s.sample) / 60);
  const n = cycleValuesMin.length;
  const mean = totalSeconds; // already computed above
  const variance = cycleValuesMin.reduce((acc, v) => acc + (v - mean) ** 2, 0) / n;
  const stdDev = Math.sqrt(variance);
  const target = parseFloat(objBalancing.total_sam);
  const diff = mean - target;

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

      {n >= 2 && (
        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded px-3 py-2 mx-2">
          <span className="flex items-center gap-1">
            <span className="text-zinc-400">Media ciclo</span>
            <span className="font-bold text-zinc-800 dark:text-zinc-100">{mean.toFixed(2)} min</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="text-zinc-400">Desv.</span>
            <span className="font-semibold text-zinc-500 dark:text-zinc-300">± {stdDev.toFixed(2)} min</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="text-zinc-400">SAM</span>
            <span className="font-bold text-secondary_one dark:text-secondary_two">{target.toFixed(2)} min</span>
          </span>
          <span className={`font-bold ${diff > 0 ? 'text-red-500' : 'text-green-600'}`}>
            Δ {diff > 0 ? '+' : ''}{diff.toFixed(2)} min
          </span>
        </div>
      )}

    </div>
  )
}

export default SamplesGlobalFooter