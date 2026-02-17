import { Textarea } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'

const AddCommentAnswer = ({question, setQuestionsList, questionsList, setIsComment, handleChange}) => {
  const [ comment, setComment] = useState("")

  useEffect(()=> {
    setComment("")
  }, [])

  useEffect(()=> {
    if(question && question.comment) {
      setComment(question.comment)
    }
  }, [questionsList])

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      closeInput();
    }
  };

  const closeInput = () => {
    setIsComment(false);
    setComment(""); // Limpia el local
    // Limpia el comentario en la lista global
    const question_id = question.id;
    const updatedQuestionsList = questionsList.map(q => 
      q.id === question_id ? { ...q, comment: "" } : q
    );
    handleChange(question_id, null, ""); // Limpia en respuestas
    setQuestionsList(updatedQuestionsList);
  };

  // Renombrada para evitar conflicto
  const handleInputChange = (event) => {
    const valueComment = event.target.value;
    setComment(valueComment);

    const question_id = question.id;
    const updatedQuestionsList = questionsList.map(q =>
      q.id === question_id ? { ...q, comment: valueComment } : q
    );
    handleChange(question_id, null, valueComment); // Actualiza el estado de las respuestas
    setQuestionsList(updatedQuestionsList);

    // Si el comentario queda vacío, cerrar input
    if (valueComment.trim() === "") {
      closeInput();
    }
  };

  return (
    <div className="py-3">
      <Textarea 
        value={comment}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="w-full" 
        label="Comentario" />
    </div>
  )
}

export default AddCommentAnswer