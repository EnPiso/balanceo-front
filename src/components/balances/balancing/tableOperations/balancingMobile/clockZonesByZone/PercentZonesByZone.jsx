import React from 'react';
import { useRecoilState } from 'recoil';
import PercentSamplesZones from '../../../../../../ui/PercentageBox';
import { orderObjBalancing } from '../../../../../../infraestructure/states/order_states';
import { checkOpersPosition } from '../../../../../../infraestructure/states/opers_states';

const PercentZonesByZone = ({ sample }) => {
  const [objBalancing] = useRecoilState(orderObjBalancing);
  const [selectedOperDetails] = useRecoilState(checkOpersPosition); // Detalles de operadores seleccionados

  const formatClockToFloat = (timeString) => {
    if (!timeString || !timeString.includes(":")) return 0; // Validar formato
    const [minutes, seconds] = timeString.split(":").map(Number);
    return (minutes + seconds / 60).toFixed(2); // Retorna el tiempo en formato decimal
  };

  // Total SAM promedio por operador (en segundos)
  const totalTiming =
    objBalancing?.total_sam && selectedOperDetails?.length > 0
      ? parseFloat((objBalancing.total_sam / selectedOperDetails.length).toFixed(2))
      : 0;

  // Convertir sample recibido a segundos
  const realTiming = parseFloat(formatClockToFloat(sample)); // sample viene como string tipo "2:56"

  // Calcular el porcentaje de eficiencia
  const percentage = realTiming > 0 ? (totalTiming / realTiming) * 100 : 0;

  // Redondear el porcentaje
  const roundedPercentage = Math.round(percentage);

  return (
    <div>
      <PercentSamplesZones 
        value={parseInt(roundedPercentage)} />
    </div>
  );
};

export default PercentZonesByZone;