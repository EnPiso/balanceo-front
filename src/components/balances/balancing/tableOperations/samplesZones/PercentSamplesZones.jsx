import React from 'react'
import { useRecoilState } from 'recoil';
import { orderObjBalancing } from '../../../../../infraestructure/states/order_states';
import { checkOpersPosition } from '../../../../../infraestructure/states/opers_states';
import PercentageBox from '../../../../../ui/PercentageBox';
import { formatClockToFloat, secondsToTimeFormat } from '../../../../../ui/utils';

const PercentSamplesZones = ({sample}) => {
  const [objBalancing] = useRecoilState(orderObjBalancing);
  const [selectedOperDetails] = useRecoilState(checkOpersPosition); // Detalles de operadores seleccionados

  // Total SAM promedio por operador (en segundos)
  const totalTiming = parseFloat((objBalancing.total_sam / selectedOperDetails.length).toFixed(2));

  // Convertir sample recibido a segundos
  const realTiming = parseFloat(formatClockToFloat(sample)); // sample viene como string tipo "2:56"

  // Calcular el porcentaje de eficiencia
  const percentage = (totalTiming / realTiming) * 100;

  return (
    <div>
       <PercentageBox value={percentage} />
    </div>
  )
}

export default PercentSamplesZones