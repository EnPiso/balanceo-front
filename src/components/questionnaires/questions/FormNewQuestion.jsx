import React, { useState } from 'react'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { objQuestionnaireShow } from '../../../infraestructure/states/states_questionnaires'
import { postData } from '../../../infraestructure/call_api/crud'
import { urlMain } from '../../../infraestructure/data/const'
import toast from 'react-hot-toast'
import { CircularProgress } from '@nextui-org/react'

const FormNewQuestion = ({ setIsNew, questions, setQuestions }) => {
  const [content, setContent] = useState("")
  const [questionType, setQuestionType] = useState("boolean")
  const [isRight, setIsRight] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const [ questionnaireObj, setQuestionnaireObj ] = useRecoilState(objQuestionnaireShow)
  

  useEffect(() => {
    setIsRight(content.trim().length > 0)
  }, [content])

  const handleSubmit = (e) => {
    e.preventDefault()
    const questionnaire_id = questionnaireObj.id

    const typeQuestion = questionType === "boolean" ? 0 : 1
    const data = {
      question : { 
        content, 
        question_type: typeQuestion,
        questionnaire_id: questionnaire_id
      }
    }

    const postDataQuestion = async () => {
      setIsLoading(true)
      try {
        const result = await postData(urlMain + "questions", data)

        setQuestions([...questions, result])
        toast.success("La pregunta ha sido creada con éxito")
        setContent("")
        setQuestionType("boolean")
        setIsNew(false)
      } catch (error) {
        console.error('Error setting data', error);
      } finally {
        setIsLoading(false)

      }
    };

    postDataQuestion();

    
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4 mb-4 flex flex-col gap-4">
      <div>
        <label className="block text-sm font-semibold mb-1 text-secondary_two">Nueva pregunta</label>
        <input
          type="text"
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-secondary_two"
          placeholder="Escribe la pregunta"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium">Tipo de pregunta:</label>
        <label className="flex items-center gap-1 cursor-pointer">
          <input
            type="checkbox"
            checked={questionType === "integer"}
            onChange={e => setQuestionType(e.target.checked ? "integer" : "boolean")}
            className="accent-secondary_two"
          />
          <span className="text-xs">{questionType === "integer" ? "Números" : "Checkeo"}</span>
        </label>
      </div>
      <div className="flex justify-end">
        <button
          onClick={()=> setIsNew(false)}
          className=" px-4 py-2 rounded font-semibold"
        >
          Cancelar
        </button>

        {
          isLoading ?
            <CircularProgress 
              color='default' 
              size='lg'/> : 
            <>
              {
                isRight && 
                  <button
                    type="submit"
                    className="text-secondary_two  px-4 py-2 rounded font-semibold"
                  >
                    Guardar
                  </button>
              }
            </>
        }

        
        
      </div>
      
    </form>
  )
}

export default FormNewQuestion