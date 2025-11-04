import React, { useState } from 'react'
import SecuentialZone from './SecuentialZone'
import { CircularProgress } from '@nextui-org/react'
import { useRecoilState } from 'recoil'
import { isPDFGenerate } from '../../../../../infraestructure/states/order_states'

const SecuentialZoneDash = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isPDFMode, setIsPDFMode] = useRecoilState(isPDFGenerate);
  
  
  return (
    <div>
      {
        !isPDFMode && <>
          {
            isLoading ?
            <CircularProgress
              size='lg' 
              color='default' 
              className=''/> : 
            <SecuentialZone
              setIsLoading={setIsLoading}
            />
          }
        </>
          
      }
    </div>
  )
}

export default SecuentialZoneDash