import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import React, {useEffect, useState} from "react";
import CustomButton from "../../../ui/CustomButton.jsx";
import {FaBackward, FaEye, FaEyeDropper, FaEyeSlash, FaPlusCircle, FaSave, FaWindowClose} from "react-icons/fa";
import {FaPencil} from "react-icons/fa6";
import {useRecoilState} from "recoil";
import {isPDFGenerate, orderObjBalancing} from "../../../infraestructure/states/order_states.js";
import {updateData} from "../../../infraestructure/call_api/crud.js";
import {urlMain} from "../../../infraestructure/data/const.js";
import toast from "react-hot-toast";
import {Spinner} from "@nextui-org/react";
import { currentUser } from "../../../infraestructure/states/states_views.js";


const CommentBalancing = ({isShow}) => {
  const [comment, setComment] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const [seeComment, setSeeComment] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);

  const [isPDFMode, setIsPDFMode] = useRecoilState(isPDFGenerate);
  
  const [user, setUser] = useRecoilState(currentUser);

  useEffect(() => {
    if(objBalancing && objBalancing.balancing && objBalancing.balancing.comment){
      setComment(objBalancing.balancing.comment)
    }
  }, [objBalancing]);


  const handleCommentApi = () => {

    const balancing_id = objBalancing.balancing_id

    const data = {
      balancing: {
        comment: comment
      }
    }

    const updateComment = async () => {
      setIsLoading(true)
      try {
        const result = await updateData(urlMain + `balancings/${balancing_id}`, data)

        setObjBalancing((prevState) => ({
          ...prevState, // Copia el objeto actual
          balancing: result, // Copia el array actual y agrega el nuevo elemento
        }));
        // setSeeComment(true)
        // setIsEdit(false)
        // guardar imagen de la tabla del balanceo en product
        toast.success("El comentario ha sido actualizado con éxito")
      } catch (error) {
        console.error('Error setting data', error);
      } finally {
        setIsLoading(false)
      }
    };

    updateComment()
  }


  return(
    <>
      <div style={{marginTop: "20px"}}>
        {
          !isShow && 
            <CustomButton
              color="default"
              variant=""
              startContent={seeComment ? <FaEyeSlash  size={23}/> : <FaEye className="text-secondary_two" size={23}/>}
              onClick={()=> setSeeComment(!seeComment)}
              title={seeComment ? "Minimizar comentario" : "Ver comentario"}
            />
        }
        
        {
          seeComment && (
            <>


              {
                isEdit ? (
                  <>
                    <ReactQuill theme="snow" value={comment} onChange={setComment}/>

                    <div className="flex justify-end items-center">
                      {
                        comment && <div className={"flex justify-between items-center mt-3"}>
                          {
                            isLoading ? <>
                              <div className="mt-3">
                                <Spinner size={"lg"} color={"default"}/>
                              </div>
                            </> : <CustomButton
                              color="default"
                              variant="bordered"
                              startContent={<FaSave color="green"/>}
                              onClick={handleCommentApi}
                              title="Guardar comentario"
                            />
                          }


                          <CustomButton
                            color="default"
                            variant="bordered"
                            startContent={<FaBackward/>}
                            onClick={() => setIsEdit(false)}
                            title=""
                          />
                        </div>
                      }
                    </div>

                  </>
                ) : (
                  <>
                    {comment && (
                      <div
                        onClick={() => {
                          user && (user.role === 'admin' || user.role === 'supervisor') &&
                            !isEdit && setIsEdit(true)
                        }}
                        className="ql-editor cursor-pointer"
                        style={{
                          padding: "10px",
                          border: "1px solid #ddd",
                          backgroundColor: "#f9f9f9",
                        }}
                        dangerouslySetInnerHTML={{__html: comment}}
                      />
                    )}
                  </>
                )
              }
            
                {
                  user && (user.role === 'admin' || user.role === 'supervisor') && (
                    <>
                      {
                        !isShow && !isEdit && (
                          <>
                            <div className={"flex justify-end items-center font-bold uppercase mb-2 mt-2"}>
                              <CustomButton
                                color="default"
                                variant="bordered"
                                startContent={<FaPencil color={"green"}/>}
                                onClick={() => setIsEdit(true)}
                                title="Editar"
                              />

                            </div>
                          </>
                        )
                      }
                    </>
                  )
                }
                



                  </>
                  )
                }


            </div>


          </>
          )
        }

        export default CommentBalancing;