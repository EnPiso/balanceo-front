import { Checkbox, CircularProgress, Input, Tooltip } from '@nextui-org/react'
import React, { useState } from 'react'
import { BsArrowDownRight, BsChatRight, BsCheck, BsCheckSquare, BsChevronBarUp, BsFastForward, BsFileEarmarkArrowDown, BsFileEarmarkArrowDownFill, BsFileExcel, BsFillArrowUpRightCircleFill, BsFillBagCheckFill, BsFillBagXFill, BsFillBarChartFill, BsFillCartCheckFill, BsFillChatRightFill, BsFillFileEarmarkArrowDownFill, BsFillPatchCheckFill, BsPieChart } from 'react-icons/bs'
import { updateData } from '../../../infraestructure/call_api/crud'
import { urlMain } from '../../../infraestructure/data/const'
import toast from 'react-hot-toast'
import { FaArrowRightArrowLeft, FaDeleteLeft } from 'react-icons/fa6'
import DeleteQuestion from './DeleteQuestion'

const LiQuestion = ({ q, idx, questions, setQuestions }) => {
  const [isEdit, setIsEdit] = useState(false)
  const [content, setContent] = useState(q.content)

  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingContent, setIsLoadingContent] = useState(false)
  const handleEdit = () => setIsEdit(true)
  
  const handleCancel = () => {
    setIsEdit(false)
    setContent(q.content)
  }

  const handleSave = () => {
    const updateContent = async () => {
      const id = q.id;
      
      const data = {
        question: {
          content: content
        }
      };
      setIsLoadingContent(true)
      try {
        const result = await updateData(urlMain + `questions/${id}`, data);
        const updateArray = questions.map(item =>
          item.id === result.id ? { ...item, content: result.content } : item
        );
        setQuestions(updateArray);
        toast.success("La pregunta ha sido actualizada con éxito")
      } catch (error) {
        console.error('Error setting data', error);
      } finally {
        setIsEdit(false);
        setIsLoadingContent(false)
      }
    };
    updateContent();
  };

  const handleChangePol = (e) => {
    e.preventDefault();

    const value = e.target.value;
    setContent(value);

  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if(content === ""){
        toast.error("Debes escribir una pregunta")
      }else{
        handleSave()
      }
    } else if (event.key === "Escape") {
      handleCancel() // Cierra el modo de edición si se presiona Escape
    }
  };

  const closeInput = () => {
    setIsEdit(false)
  }

  const handleUpdateType = (q) => {
    let newType= ""
    if(q.question_type === "integer"){
      newType = 0
    }else {
      newType = 1
    }
    setIsLoading(true)
    const updateContent = async () => {
      const id = q.id;
      
      const data = {
        question: {
          question_type: newType
        }
      };
      try {
        const result = await updateData(urlMain + `questions/${id}`, data);
        const updateArray = questions.map(item =>
          item.id === result.id ? { ...item, question_type: result.question_type } : item
        );
        setQuestions(updateArray);
        toast.success("La pregunta ha sido actualizada con éxito")
      } catch (error) {
        console.error('Error setting data', error);
      } finally {
        setIsEdit(false);
        setIsLoading(false)
      }
    };
    updateContent();
  }

  return (
    <li className="bg-zinc-50 rounded px-3 py-2 border-l-4 border-secondary_two">
      <div className="flex items-center justify-between gap-2">
        <div className="flex-1 min-w-0">
          <span className="font-bold text-secondary_two mr-2">{idx + 1}.</span>
          {isEdit ? (
            <div className="flex flex-col w-full gap-2">
              <Tooltip placement={"right-end"} content={"ENTER/ESC"}>
                <Input
                  endContent={
                    isLoadingContent ? (
                      <CircularProgress size="sm" color="default" />
                    ) : (
                      <span onClick={closeInput}>
                        <BsFileExcel />
                      </span>
                    )
                  }
                  autoFocus
                  isClearable
                  type="text"
                  variant="bordered"
                  onChange={handleChangePol}
                  onKeyDown={handleKeyDown}
                  placeholder="actualiza la pregunta"
                  value={content}
                  onClear={closeInput}
                  className="w-full"
                />
              </Tooltip>
            </div>
          ) : (
            <span
              className="text-gray-700 cursor-pointer w-full"
              onClick={handleEdit}
            >
              ¿{q.content}?
            </span>
          )}
        </div>
        
        <div className="flex-shrink-0 ml-2 flex justify-between items-center">
          {isLoading ? (
            <div className="pr-8">
              <CircularProgress
                size="sm"
                color="default" />
            </div>
          ) : (
            <button
              className={`text-xs px-2 py-1 rounded font-bold flex justify-between items-center
                ${q.question_type === "integer"
                  ? " text-primary_one "
                  : " text-secondary_two"}
              `}
              onClick={() => handleUpdateType(q)}
              style={{ minWidth: "80px" }}
            >
              {q.question_type === "integer" ? "Números" : "Checkeo"} <FaArrowRightArrowLeft/>
            </button>
          )}
          <DeleteQuestion
            idx={idx}
            q={q}
            questions={questions}
            setQuestions={setQuestions}
          />
        </div>
      </div>

      
    </li>
  )
}
// export const  ConfirmDeleteQuestion = ({isOpen, setIsOpen, handleSave, title, description, isLoading}) => {

export default LiQuestion