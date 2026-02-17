import { CircularProgress } from '@nextui-org/react'
import React from 'react'
import { FaClock } from 'react-icons/fa6'
import { useRecoilState } from 'recoil'
import { opersZonesPoly, percentZonesOpers } from '../../infraestructure/states/states_polyvalence'
import TextColorPercent from './TextColorPercent'

const ButtonZonePoly = ( {handleZone, oper, isLoading} ) => {
  
  const [ opersZonesPolyvalence ] = useRecoilState(opersZonesPoly)
  const [ percentZones, setPercentZones ] = useRecoilState(percentZonesOpers)
  
  
  return (
    <div className='py-2'>
    {
      isLoading ? 
        <CircularProgress size='sm' color='default'/> :
        <button 
          onClick={()=> handleZone(oper)}>
          <span className="mt-3 rounded-full flex justify-between items-center">
            <h1 
              className='text-secondary_two bg-white rounded-full flex justify-between items-center'>
              <FaClock/>
              <span className="text-start ml-1 px-1 rounded-md bg-zinc-100 cursor-pointer text-secondary_two font-bold flex justify-between items-center">
                Tiempo de la zona 
              </span>
            </h1>
           {
            percentZones >= 1 &&
              <TextColorPercent 
                value={Math.round(percentZones)}/>
           } 
          </span>
        </button>
    }
      
    
    </div>
    
  )
}

export default ButtonZonePoly