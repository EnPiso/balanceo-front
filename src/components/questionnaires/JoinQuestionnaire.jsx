import { CircularProgress, Tooltip } from '@nextui-org/react'
import React, { useState } from 'react'
import { FaExchangeAlt, FaQuestionCircle } from 'react-icons/fa'

const JoinQuestionnaire = ({oper,isOpen,setIsOpen, setOperQuestion}) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleQuestionnaire = (oper) => { 
    setOperQuestion(oper)
    setIsOpen(true)
  }
  
  return (
    
    
      <span>
        {
          isLoading ? (
            <>
              <div className="flex justify-start mr-3">
                <CircularProgress size="sm" color="default" />
              </div>
            </>
          ) :
          <> 
            <Tooltip content={"Cuestionarios de " + oper.name} placement="bottom" className="z-50">
              <button 
                onClick={() => handleQuestionnaire(oper)}>
                  <FaQuestionCircle size={30} className="text-secondary_two lg:mr-3"/>
              </button>
            </Tooltip>
          </> 
        
        }
      </span>
  )
}

export default JoinQuestionnaire