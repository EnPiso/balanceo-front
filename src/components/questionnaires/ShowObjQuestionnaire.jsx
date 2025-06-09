import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { objQuestionnaireShow } from '../../infraestructure/states/states_questionnaires'
import { fetchGetData } from '../../infraestructure/call_api/crud'
import { urlMain } from '../../infraestructure/data/const'
import { CircularProgress } from '@nextui-org/react'
import LiQuestion from './questions/LiQuestion'
import FormNewQuestion from './questions/FormNewQuestion'

const ShowObjQuestionnaire = () => {

  const [ questionnaireObj, setQuestionnaireObj ] = useRecoilState(objQuestionnaireShow)

  const [ questions, setQuestions ] = useState([])
  const [ isLoading, setIsLoading ] = useState(false)

  const [ isNew, setIsNew ] = useState(false)

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)
      const questionnaire_id = questionnaireObj.id
      try {
        const result = await fetchGetData(`${urlMain}questions?questionnaire_id=${questionnaire_id}`);
        setQuestions(result);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setIsLoading(false)
      }
    };

    getData();
  }, []);
  

  return (
    <div>
      <h1 className="text-secondary_two font-bold text-2xl mb-4">
        {questionnaireObj.title}
      </h1>

     

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">
            Preguntas
          </h2>
          <h2 className="text-lg font-semibold mb-2 text-gray-700">
            Tipos 
          </h2>
        </div>
        
        {
          isLoading ? 
            <div 
              className='flex justify-center'>
              <CircularProgress 
                size='lg' 
                color='default'/>
            </div> : 
            <ul className="space-y-3">
              {questions.length === 0 ? (
                <li className="text-gray-400 italic">No hay preguntas registradas.</li>
              ) : (
                questions.map((q, idx) => (
                  <LiQuestion
                    questions={questions}
                    setQuestions={setQuestions}
                    q={q}
                    idx={idx}
                  />
                ))
              )}
            </ul>
        }
        
      </div>
      
      {
        isNew ? 
          <FormNewQuestion
            setIsNew={setIsNew}
            questions={questions}
            setQuestions={setQuestions}
          /> :
          <div className="py-3">
            <button 
              onClick={()=> setIsNew(true)}
              className='text-secondary_two font-bold'>
              Agregar pregunta
            </button>
          </div>
      }
      
      
        <div className="flex justify-end font-bold py-4">
          <button
            onClick={() => setQuestionnaireObj(null)}
            className="px-4 py-1 rounded transition"
          >
            Regresar a categorías
          </button>
        </div>
    </div>
  )
}

export default ShowObjQuestionnaire