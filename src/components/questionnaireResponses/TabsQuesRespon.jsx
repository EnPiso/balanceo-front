import React, { useState } from 'react'
import { Tabs, Tab } from "@nextui-org/react"
import { useEffect } from 'react'
import { fetchGetData } from '../../infraestructure/call_api/crud';
import { urlMain } from '../../infraestructure/data/const';
import { useRecoilState } from 'recoil';
import { tabsQuestionnaires } from '../../infraestructure/states/states_questionnaires';


const TabsQuesRespon = () => {
  const [activeTab, setActiveTab] = useState("preguntas")

  const [ questionnairesTabs, setQuestionnairesTabs ] = useRecoilState(tabsQuestionnaires)

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchGetData(`${urlMain}questionnaire_responses`);
        
        setQuestionnairesTabs(result);
        
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    getData();
  }, []);

  return (
    <div>
      <div className="flex border-b border-gray-200 mb-4">
        {questionnairesTabs.map((questionnaire) => (
          <button
            key={questionnaire.id}
            className={`cursor-pointer px-4 py-2 font-semibold focus:outline-none ${
              activeTab === questionnaire.category
                ? "border-b-2 border-secondary_two text-secondary_two"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(questionnaire.category)}
          >
            {questionnaire.title}
          </button>
        ))}
      </div>
      <div className="p-4 bg-white rounded shadow">
        {questionnairesTabs.map((questionnaire) =>
          activeTab === questionnaire.category ? (
            <div key={questionnaire.id}>
              {/* Aquí puedes renderizar el contenido específico de cada tab */}
              Contenido de {questionnaire.title}
            </div>
          ) : null
        )}
      </div>
    </div>
  )
}

export default TabsQuesRespon