import { Spinner } from '@nextui-org/react'
import React, { useState } from 'react'

const SelectOperCheck = ({selected, oper, handleOperVideo}) => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <>
     {
        isLoading ? 
          <Spinner size='lg' color='default'/> :
          <label
            className={`cursor-pointer px-4 py-2  
            ${selected && selected.id === oper.id ? 'bg-green-700 text-white' : 'bg-white text-gray-700'} 
            transition-all duration-300`}
          >
          
            <input
       
              type="radio"
              name="tag-radio"
              value={oper.name}
              checked={selected && selected.id === oper.id}
              onChange={() => handleOperVideo(oper, setIsLoading)}
              className="hidden"
            />
            {oper.name}
          </label>
      }
   
    
    </>
    
  )
}

export default SelectOperCheck