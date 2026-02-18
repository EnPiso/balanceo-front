import React, { useEffect, useState } from 'react'
import { fetchGetData } from '../../infraestructure/call_api/crud';
import { urlMain } from '../../infraestructure/data/const';
import { useRecoilState } from 'recoil';
import { arrayQuestionnaires, objQuestionnaireShow } from '../../infraestructure/states/states_questionnaires';
import { CircularProgress } from '@nextui-org/react';
import ObjQuestionnaire from './ObjQuestionnaire';
import ShowObjQuestionnaire from './ShowObjQuestionnaire';

const ListQuestionnaires = () => {

  const [ questionnairesList, setQuestionnairesList ] = useRecoilState(arrayQuestionnaires)
  const [ questionnaireObj, setQuestionnaireObj ] = useRecoilState(objQuestionnaireShow)

  
  const [ isLoading, setIsLoading ] = useState(false)

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)
      try {
        const result = await fetchGetData(`${urlMain}questionnaires`);
    
        setQuestionnairesList(result)
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setIsLoading(false)
      }
    };

    getData();
  }, []);

  return (
     <div className="overflow-x-auto">
        
        {
          questionnaireObj ? 
          <ShowObjQuestionnaire/> : 
          <table className=" w-full bg-zinc-100 dark:bg-zinc-800 rounded-lg shadow-md border border-gray-300">
            <thead>
              <tr className="dark:bg-gray-100 bg-zinc-800 text-zinc-100 dark:text-zinc-800">
                  <th className="hidden md:table-cell p-1 text-left font-medium border border-gray-300">
                    Categoría
                  </th>
                
              </tr>
            </thead>
            <tbody className='hidden md:table-row-group'>
              {
                isLoading ? (
                  <tr>
                    <td colSpan="4" className="h-40 text-center">
                      <div className="flex justify-center items-center h-full">
                        <CircularProgress size="lg" color="default" />
                      </div>
                    </td>
                  </tr>
                ) : ( 
                  <>
                    {
                      questionnairesList.map((questionnaire, i)=> {
                        return(
                          <ObjQuestionnaire
                            questionnaire={questionnaire}
                            key={i}
                          />
                        )
                      })
                    }
                  </>
                )
              }
            </tbody>
          </table> 
        }
      </div>
  )
}

export default ListQuestionnaires