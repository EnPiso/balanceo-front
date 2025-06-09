import { Autocomplete, AutocompleteItem, CircularProgress, Tooltip } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';

import { FaPlusCircle, FaQuestionCircle, FaSave } from 'react-icons/fa';


import toast from 'react-hot-toast'
import { fetchGetData } from '../../../infraestructure/call_api/crud';
import { urlMain } from '../../../infraestructure/data/const';
import ListQuestionsResponses from '../../questionnaireResponses/ListQuestionsResponses';
import CustomButton from '../../../ui/CustomButton';
import { formatDateRails, formatDateRailsShort } from '../../../ui/utils';
import { AnswersListResult } from './AnswersListResult';

const SearchQuestion = ({setIsOpenQues,setIsOpenNew}) => {
  const [opers, setOpers] = useState([]);
  const [questionnaires, setQuestionnaires] = useState([]);
  const [selectedOper, setSelectedOper] = useState(null);
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState(null);
  const [questionsList, setQuestionsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [isLoadingSelects, setIsLoadingSelects] = useState(true);
  const [questionnairesDates, setQuestionnairesDates] = useState([]);
  const [selectedQuestionsDates, setSelectedQuestionsDates] = useState(null);

  const [answers, setAnswers] = useState([]);
  //questionnaire_response_id

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchGetData(`${urlMain}questionnaire_responses`);
        setOpers(result.opers || []);
        setQuestionnaires(result.questionnaires || []);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setIsLoadingSelects(false)
      }
    };
    getData();
  }, []);

  useEffect(()=> {
    if(selectedOper && selectedQuestionnaire){
      
      const queryParamsObject = {
        oper_id: selectedOper,
        questionnaire_id: selectedQuestionnaire
      };

      const queryParams = new URLSearchParams(queryParamsObject).toString();


      const getData = async () => {
        try {
          const result = await fetchGetData(`${urlMain}answers?${queryParams}`);
          console.log(result)
          setQuestionnairesDates(result)
          
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        } finally {

        }
      }; // formatDateRails
      
      getData();
    }
  },[ selectedOper, selectedQuestionnaire ])

  useEffect(()=> {
    if(selectedQuestionsDates){
      const questionnaire_response_id = selectedQuestionsDates
      setIsLoading(true)
      const getData = async () => {
        try {
          const result = await fetchGetData(`${urlMain}answers/show_answers?questionnaire_response_id=${questionnaire_response_id}`);
          console.log(result)
          setAnswers(result)
          
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        } finally {
          setIsLoading(false)
        }
      }; // formatDateRails
      
      getData();

    }
  },[selectedQuestionsDates])

  return (
    <div className="w-full">
      <div className='max-w-2xl'> 
       <div className="flex flex-col md:flex-row md:items-end md:justify-start gap-2">
        <div className="flex flex-col md:flex-row gap-2">
          <Autocomplete
            isDisabled={isDisabled}
            className="w-full md:max-w-xs"
            label="Operario"
            selectedKey={selectedOper}
            onSelectionChange={(key) => {
              setSelectedOper(key);
              setAnswers([]);
            }}
          >
            {opers.map((oper) => (
              <AutocompleteItem key={oper.id}>
                {oper.name}
              </AutocompleteItem>
            ))}
          </Autocomplete>

          <Autocomplete
            isDisabled={isDisabled}
            className="w-full md:max-w-xs"
            label="Cuestionario"
            selectedKey={selectedQuestionnaire}
            onSelectionChange={(key) => {
              setSelectedQuestionnaire(key);
              setAnswers([]);
            }}
          >
            {questionnaires.map((q) => (
              <AutocompleteItem key={q.id}>
                {q.title}
              </AutocompleteItem>
            ))}
          </Autocomplete>

          {questionnairesDates.length >= 1 && (
            <Autocomplete
              isDisabled={isDisabled}
              className="w-full md:max-w-xs"
              label="Fecha"
              selectedKey={selectedQuestionsDates}
              onSelectionChange={setSelectedQuestionsDates}
            >
              {questionnairesDates.map((q) => (
                <AutocompleteItem key={q.id}>
                  {formatDateRailsShort(q.created_at)}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          )}
        </div>

        <div className="flex gap-3 mt-2 md:mt-0 ml-0 md:ml-4">
          <Tooltip content="Administrar cuestionarios" placement="bottom">
            <button onClick={() => setIsOpenQues(true)}>
              <FaQuestionCircle size={30} className="text-secondary_two" />
            </button>
          </Tooltip>
          <Tooltip content="Agregar cuestionario de operario" placement="bottom">
            <button onClick={() => setIsOpenNew(true)}>
              <FaPlusCircle size={30} className="text-secondary_two" />
            </button>
          </Tooltip>
        </div>
      </div>

        
      </div>
      

      {
        answers.length >= 1 && (
          <>
            {isLoading ? (
              <div className="flex justify-center">
                <CircularProgress size="lg" color="default" />
              </div>
            ) : (
              <>
                <AnswersListResult
                  answers={answers}
                />
              </>
            )}
          </>
        )
      }

      
      
    </div>
  );
};

export default SearchQuestion;
