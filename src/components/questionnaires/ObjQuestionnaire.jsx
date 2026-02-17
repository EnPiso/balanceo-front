import React from 'react'
import { useRecoilState } from 'recoil'
import { objQuestionnaireShow } from '../../infraestructure/states/states_questionnaires'

const ObjQuestionnaire = ({questionnaire}) => {

  const [ questionnaireObj, setQuestionnaireObj ] = useRecoilState(objQuestionnaireShow)
  

  const handleQuestionnaire = (questionnaire) => {
    setQuestionnaireObj(questionnaire)
  }

  return (
    <tr 
      onClick={()=> handleQuestionnaire(questionnaire)}
      key={questionnaire.id} 
      className="hover:text-secondary_two group capitalize">
      <td className="p-1 border border-gray-300 cursor-pointer">
        {questionnaire.title}  
      </td>
    </tr>
  )
}

export default ObjQuestionnaire