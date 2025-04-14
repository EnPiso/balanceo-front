import React from 'react'
import { useRecoilState } from 'recoil';
import { orderObjBalancing } from '../../../../../infraestructure/states/order_states';
import { checkOpersPosition } from '../../../../../infraestructure/states/opers_states';
import PercentageBox from '../../../../../ui/PercentageBox ';

const PercentSamplesZones = ({sample}) => {
  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);

  const [selectedOperDetails, setSelectedOperDetails] = useRecoilState(checkOpersPosition); // Array con los detalles de cada selección

  const totalTiming = (objBalancing.total_sam / selectedOperDetails.length).toFixed(2)
  
  return (
    <div>
      <PercentageBox
        value={sample / totalTiming}
      />
      
    </div>
  )
}

export default PercentSamplesZones