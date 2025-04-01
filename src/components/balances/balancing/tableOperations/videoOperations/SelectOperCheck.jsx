import { Spinner } from '@nextui-org/react'
import React, { useState } from 'react'
import { firstWordInString } from '../../../../../ui/utils'

const SelectOperCheck = ({selected, oper, handleOperVideo}) => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <>
     {
        isLoading ? 
          <Spinner size='lg' color='default'/> :
          <label
            className={`cursor-pointer px-4 py-2 font-bold uppercase tex-xs
            ${selected && selected.id === oper.id ? 'text-secondary_two bg-zinc-800' : 'bg-white text-zinc-800'} 
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
            <span className="flex justify-between items-center">
              {firstWordInString(oper.name)}
              <img src={oper.avatar} className="h-6 ml-1" />
            </span>
            
          </label>
      }
   
    
    </>
    
  )
}

export default SelectOperCheck