import React, { useState } from 'react'
import { FaDeleteLeft } from 'react-icons/fa6'
import { ConfirmDeleteQuestion } from './ConfirmDeleteQuestion'
import { postData, updateData } from '../../../infraestructure/call_api/crud'
import { urlMain } from '../../../infraestructure/data/const'

const DeleteQuestion = ({idx, q, questions, setQuestions}) => {

  const [isOpen, setIsOpen] = useState(false)
  const [ isLoading, setIsLoading ] = useState(false)

  const handleDelete = (q) => {
    const question_id = q.id

    const data = {
      question: {
        active: !q.active
      }
    }

    const updateQuestion = async (data) => {
      setIsLoading(true)
      try {
        const result = await updateData(urlMain + `questions/${question_id}/update_active`, data);
        const updatedQuestions = questions.filter(item => item.id !== result.id);
        setQuestions(updatedQuestions);
        
      } catch (error) {
        console.error("Error setting data", error);
      } finally {
        setIsLoading(false)
      }
    };

    updateQuestion(data);


  }

  return (
    <>
      <button onClick={()=> setIsOpen(true)}>
        <FaDeleteLeft
          className='text-red-500'
        />
      </button>
      {
        isOpen &&
          <ConfirmDeleteQuestion
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            handleSave={() => handleDelete(q)}
            title={`¿Quieres Eliminar?`}
            description={`la pregunta # ${ idx + 1 }`}
            isLoading={isLoading}
          />
      }
     

    </>
  ) // = ({isOpen, setIsOpen, handleSave, title, description, isLoading}) => {
  
}

export default DeleteQuestion