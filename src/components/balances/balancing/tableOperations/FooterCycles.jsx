import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { samplingsCircleObj } from '../../../../infraestructure/states/states_mobile'
import { orderObjBalancing } from '../../../../infraestructure/states/order_states'
import SamplesGlobalCard from './samplesByOper/SamplesGlobalCard'
import { FaClock } from 'react-icons/fa6'

const FooterCycles = ({handleFunction}) => {

  const [samplingsGlobal, setSamplingsGlobal] = useRecoilState(samplingsCircleObj)
  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);

  return (
    <>
      <div>
      
            <div className="py-4">
              <SamplesGlobalCard
                cycles={samplingsGlobal.cycles}
                totalSeconds={samplingsGlobal.total_time}
                total_sam={objBalancing.total_sam.toFixed(2)}
                potential={`${samplingsGlobal.potencial_percent}`}
                potentialUds={samplingsGlobal.potential_uds}
                handleFunction={handleFunction}
              />

            </div>
        
      </div>
    </>
    
  )
}

export default FooterCycles