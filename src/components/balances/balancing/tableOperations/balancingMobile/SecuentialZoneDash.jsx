import React, { useState } from 'react'
import SecuentialZone from './SecuentialZone'
import { CircularProgress } from '@nextui-org/react'

const SecuentialZoneDash = () => {
  const [isLoading, setIsLoading] = useState(false)
  
  return (
    <div>
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
    </div>
  )
}

export default SecuentialZoneDash