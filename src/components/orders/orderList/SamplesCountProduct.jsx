import { Tooltip } from '@nextui-org/react'
import React from 'react'
import { FaClockRotateLeft } from 'react-icons/fa6'

const SamplesCountProduct = ({value, style, tooltip}) => {
  return (
    <>
      {
        value > 0 && <>
          {
            tooltip ? (
              <Tooltip placement="top" content={tooltip}>
                  <span className="ml-2 mr-2 relative">
                    <FaClockRotateLeft 
                        className={`w-5 h-5 rounded-full object-cover text-${style}-500`}/>
                    <small className={`absolute bottom-2 left-5  rounded-ful font-bold  text-${style}-500`}>
                      {value}
                    </small>
                  </span> 
              </Tooltip>
            ) : (
              <span className="ml-2 mr-2 relative">
                <FaClockRotateLeft 
                    className={`w-5 h-5 rounded-full object-cover text-${style}-500`}/>
                <small className={`absolute bottom-2 left-5  rounded-ful font-bold  text-${style}-500`}>
                  {value}
                </small>
              </span>
            )
          }
        
            
        </>
          
      }
    </>
  )
}

export default SamplesCountProduct