import { Checkbox, Input, Slider, Textarea } from '@nextui-org/react';
import React, { useState } from 'react';
import { FaArrowAltCircleLeft, FaArrowCircleLeft, FaBackspace, FaCommentAlt } from 'react-icons/fa';
import { FaBackward, FaComment } from 'react-icons/fa6';
import AddCommentAnswer from './AddCommentAnswer';

const LiQuesResponse = ({ idx, q, value, onChange, setQuestionsList, questionsList, setResponses }) => {

  const [isComment, setIsComment] = useState(false)

  const handleChange = (questionId, value, comment) => {
    setResponses(prev =>
      prev.some(r => r.question_id === questionId)
        ? prev.map(r =>
            r.question_id === questionId
              ? {
                  ...r,
                  ...(value !== null ? { value } : {}),
                  ...(comment !== undefined ? { comment } : {})
                }
              : r
          )
        : [
            ...prev,
            {
              question_id: questionId,
              ...(value !== null ? { value } : {}),
              ...(comment !== undefined ? { comment } : {})
            }
          ]
    );
  };

  const closeInput = (question) => {
    if(!isComment){
      setIsComment(true);
      return;
    } else{
      setIsComment(false);
      // Limpia el comentario en la lista global
      const question_id = question.id;
      const updatedQuestionsList = questionsList.map(q => 
        q.id === question_id ? { ...q, comment: "" } : q
      );
      handleChange(question_id, null, ""); // Limpia en respuestas
      setQuestionsList(updatedQuestionsList);
    }

  };
    
  return (
    <li className="bg-zinc-50 rounded px-3 py-2 border-l-4 border-secondary_two">
      <div className="flex items-center justify-between gap-2">
        <div className="flex-1 min-w-0">
          <span className="font-bold text-secondary_two mr-2">{idx + 1}.</span>
          <span className="text-gray-700 cursor-pointer w-full">
            ¿{q.content}?
          </span>
        {
          isComment && 
            <AddCommentAnswer
              setIsComment={setIsComment}
              question={q}
              setQuestionsList={setQuestionsList}
              questionsList={questionsList}
              handleChange={handleChange}
            />
        }
        </div>
          
         
          

        <div className="flex-shrink-0 ml-2 flex items-center">
          {q.question_type === "boolean" ? (
            <Checkbox
              color="default"
              isSelected={!!value}
              onValueChange={val => handleChange(q.id, val)}
              className="ml-2"
            />
          ) : (
            <div className="flex items-center gap-2 min-w-[120px]">
              <Slider
                color="foreground"
                size="sm"
                step={1}
                minValue={0}
                maxValue={100}
                value={value || 0}
                onChange={val => handleChange(q.id, val)}
                className="w-24"
                aria-label="Valor numérico"
              />
              <span className="text-xs text-primary_one font-bold">{value || 0}</span>
            </div>
          )}  
          <button className='py-2 ml-2' onClick={()=> closeInput(q)}>
            {
              isComment ? 
                <FaArrowAltCircleLeft className='text-zinc-800'/> : 
                <FaComment className='text-secondary_two'/>
            }
            
          </button>
        </div>
      </div>
    </li>
  );
};

export default LiQuesResponse;
