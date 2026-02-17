import { Spinner } from '@nextui-org/react'
import React, { useState } from 'react'
import { firstWordInString } from '../../../../../ui/utils'
import { currentUser } from '../../../../../infraestructure/states/states_views'
import { useRecoilState } from 'recoil'

const SelectOperCheck = ({selected, oper, handleOperVideo}) => {
  const [isLoading, setIsLoading] = useState(false)
  
  const [user, setUser] = useRecoilState(currentUser);
  
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
              onChange={() => {
                  if(user && (user.role === 'admin' || user.role === 'supervisor')){
                    handleOperVideo(oper, setIsLoading)
                  }
                  
              }}
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