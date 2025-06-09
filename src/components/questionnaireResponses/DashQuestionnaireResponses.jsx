import React, { useState } from 'react'
import TabsQuesRespon from './TabsQuesRespon'
import FormSelectQuesRes from './FormSelectQuesRes'
import ModalQuestionnaireResponses from './ModalQuestionnaireResponses'
import ListQuestionsResponses from './ListQuestionsResponses'

const DashQuestionnaireResponses = ({isOpen, setIsOpen}) => {


  return (
    <div>
    
      {
        isOpen && 
          <ModalQuestionnaireResponses
              isOpen={isOpen}
              setIsOpen={setIsOpen}
          />
      }
      
    </div>
  )
}

export default DashQuestionnaireResponses