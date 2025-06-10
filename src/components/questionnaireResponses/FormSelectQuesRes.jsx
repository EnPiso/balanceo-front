import { Autocomplete, AutocompleteItem, CircularProgress } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import { fetchGetData, postData } from '../../infraestructure/call_api/crud';
import { urlMain } from '../../infraestructure/data/const';
import ListQuestionsResponses from './ListQuestionsResponses';
import CustomButton from '../../ui/CustomButton';
import { FaSave } from 'react-icons/fa';
import { ConfirmOpen } from '../balances/balancing/sidebarForm/ConfirmOpers';
import { ConfirmAnswers } from './ConfirmAnswers';
import toast from 'react-hot-toast'

const FormSelectQuesRes = ({setIsOpenResponses}) => {
  const [opers, setOpers] = useState([]);
  const [questionnaires, setQuestionnaires] = useState([]);
  const [selectedOper, setSelectedOper] = useState(null);
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState(null);
  const [questionsList, setQuestionsList] = useState([]);
  const [operQuestion, setOperQuestion] = useState(null);
  const [operQuestionnaire, setOperQuestionnaire] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [responses, setResponses] = useState([]); // NUEVO
  const [quesResId, setQuesResId] = useState(0)
  const [isOpen, setIsOpen] = useState(false);
  

  //questionnaire_response_id

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchGetData(`${urlMain}questionnaire_responses`);
        setOpers(result.opers || []);
        setQuestionnaires(result.questionnaires || []);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    getData();
  }, []);

  const handleSave = () => {
    const data = {
      oper_id: selectedOper,
      questionnaire_id: selectedQuestionnaire,
    };

    const createQuestionnaireRes = async (data) => {
      setIsLoading(true);
      try {
        const result = await postData(urlMain + "questionnaire_responses", data);
        const questionnaire_response_id = result.questionnaire_response_id
        setQuesResId(questionnaire_response_id)
        
        const initializedResponses = result.questions.map(q => ({
          question_id: q.id,
          value: q.question_type === "boolean" ? false : 0,
        }));
        
        setQuestionsList(result.questions);
        setResponses(initializedResponses);
        setIsDisabled(true);
        const oper_id = parseInt(selectedOper);
        const questionnaire_id = parseInt(selectedQuestionnaire);

        const questionnaireObj = questionnaires.find(q => q.id === questionnaire_id);
        setOperQuestionnaire(questionnaireObj);
        setOperQuestion(result.oper);
      } catch (error) {
        console.error('Error setting data', error);
      } finally {
        setIsLoading(false);
      }
    };

    createQuestionnaireRes(data);
  };

  const handleSubmitResponses = () => {
    
    const transformed = responses.map(r => ({
      question_id: r.question_id,
      questionnaire_response_id: quesResId,
      boolean_value: typeof r.value === "boolean" ? r.value : null,
      integer_value: typeof r.value === "number" ? r.value : null,
      comment: r.comment || null, // Asegúrate de que 'comment' esté en el objeto de respuesta
    }));
    
    const data = {
      answers: JSON.stringify(transformed)
    }
    
    const createAnswers = async () => {
      try {
        const result = await postData(urlMain + "answers", data);
        console.log(result)
        setIsOpenResponses(false)
        toast.success("El cuestionario ha sido creado correctamente")
      } catch (error) {
        console.error('Error setting data', error);
      }
    };
    createAnswers()
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {questionsList.length < 1 && (
        <>
          <div className="mb-6">
            <p className="text-gray-600">
              Selecciona un operario y un cuestionario para continuar.
            </p>
          </div>
          <div className="flex justify-start">
            <Autocomplete
              isDisabled={isDisabled}
              className="max-w-xs mr-1"
              label="Selecciona un operario"
              selectedKey={selectedOper}
              onSelectionChange={setSelectedOper}
            >
              {opers.map((oper) => (
                <AutocompleteItem key={oper.id}>
                  {oper.name}
                </AutocompleteItem>
              ))}
            </Autocomplete>
            <Autocomplete
              isDisabled={isDisabled}
              className="max-w-xs ml-1"
              label="Selecciona un cuestionario"
              selectedKey={selectedQuestionnaire}
              onSelectionChange={setSelectedQuestionnaire}
            >
              {questionnaires.map((q) => (
                <AutocompleteItem key={q.id}>
                  {q.title}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          </div>
        </>
      )}

      {!questionsList.length && selectedOper && selectedQuestionnaire && (
        <div className="flex justify-end mt-6">
          <button
            className="bg-secondary_two text-white px-6 py-2 rounded font-semibold hover:bg-secondary_two/90"
            onClick={handleSave}
          >
            Guardar
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center">
          <CircularProgress size="lg" color="default" />
        </div>
      ) : (
        <>
          {questionsList.length >= 1 && (
            <>
              <ListQuestionsResponses
                setQuestionsList={setQuestionsList}
                operQuestionnaire={operQuestionnaire}
                operQuestion={operQuestion}
                questionsList={questionsList}
                responses={responses}
                setResponses={setResponses}
              />
              <div className="flex justify-end mt-6">
                  <CustomButton
                    color="default"
                    variant="bordered"
                    startContent={<FaSave className="text-secondary_two"/>}
                    onClick={()=> setIsOpen(true)}
                    title="Guardar cuestionario"
                  />
                
              </div>
              
            </>
          )}
        </>
      )}
      <ConfirmAnswers
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleSave={handleSubmitResponses}
        title="Confirmar para guardar el cuestionario"
        
      />
    </div>
  );
};

export default FormSelectQuesRes;
