import { Tooltip } from '@nextui-org/react'
import React, { useState } from 'react'
import { FaPlus, FaPlusCircle, FaQuestionCircle } from 'react-icons/fa'
import ModalQuestionnaires from './ModalQuestionnaires'
import DashQuestionnaireResponses from '../questionnaireResponses/DashQuestionnaireResponses'
import FormSelectQuesRes from '../questionnaireResponses/FormSelectQuesRes'
import ListQuestionsResponses from '../questionnaireResponses/ListQuestionsResponses'
import ModalQuestionnaireResponses from '../questionnaireResponses/ModalQuestionnaireResponses'
import DashboardAnswers from './questions/DashboardAnswers'
import SearchQuestion from './questions/SearchQuestion'

const QuestionnairesDashboard = () => {

  const [isOpen, setIsOpen] = useState(false)
  const [isOpenNew, setIsOpenNew] = useState(false)

  return (
    <div>
  
        <SearchQuestion
          setIsOpenQues={setIsOpen}
          setIsOpenNew={setIsOpenNew}
        />

      
      
      {
        isOpen && 
          <ModalQuestionnaires
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
      }
      {
        isOpenNew && 
          <ModalQuestionnaireResponses
            isOpen={isOpenNew}
            setIsOpen={setIsOpenNew}
          />
      }
      
    </div>
  )
}

export default QuestionnairesDashboard