import FormDynamicField from "./FormDynamicField.jsx";
import {FaBackward, FaPlusCircle, FaUserAlt, FaUserCheck} from "react-icons/fa";
import React, {useEffect, useState} from "react";
import {postData, postDataFile} from "../../infraestructure/call_api/crud.js";
import {urlMain} from "../../infraestructure/data/const.js";
import toast from "react-hot-toast";
import {toastMessageCustom} from "../../infraestructure/data/toastMessage.js";
import {Avatar, Input, Spinner, Tooltip} from "@nextui-org/react";

const TheadOperatorsCustom = ({moduleId, opers, setOpers, setIsNewOperator}) => {
  const [nameData,setNameData] = useState('')
  const [idOper,setIdOper] = useState('')
  const [idOperError,setIdOperError] = useState(false)

  const [isRight,setIsRight] = useState(false)
  const [errorMessage, setErrorMessage] = useState("");

  const [isLoading,setIsLoading] = useState(false)

  const [fileImage,setFileImage] = useState(null)

  useEffect(() => {
    const isFormatValid = nameData.length >= 2 && idOper.length >= 2;
    const existingOper = opers.some((oper) => oper.id_oper === idOper);
  
    if (existingOper) {
      setIsRight(false);
      setErrorMessage("La cédula ya está en uso en este módulo. Por favor elige otro.");
    } else {
      setIsRight(isFormatValid);
      setErrorMessage("");
    }
  }, [nameData, idOper, opers]);

  const handleSubmit = () => {
    const data = new FormData();
    data.append("oper[name]", nameData);
    data.append("oper[id_oper]", idOper);
    data.append("oper[production_module_id]", moduleId);

    if (fileImage) {
      data.append("oper[avatar]", fileImage); // Agrega el archivo
    }

    setIsLoading(true);
    fetchApi(data);
  }


  const fetchApi = (data) => {
    const createOper = async (data) => {

      try {
        const result = await postDataFile(urlMain + "/opers", data);
        if(result){
          setOpers([...opers, result])
          toast.success("El operario ha sido creado con éxito")
          setNameData("")
          setIdOper("")
          setFileImage(null)
         // setIsNewOperator()
        }else{
          toast.error("La cédula ya está en uso en este módulo. Por favor elige otro.")
          setIdOperError(true)

          setTimeout(()=> {
            setIdOperError(false)
          }, 1500)
        }
      } catch (error) {
        if (error.response && error.response.data.errors) {
          console.error("Validation errors:", error.response.data.errors);
          alert(error.response.data.errors.join("\n")); // Mostrar los mensajes de error al usuario
        } else {
          console.error("Error setting data", error);
        }
      } finally {
        setIsLoading(false)
      }


    };

    createOper(data);
  }



  return(
    <>
      <thead>
        <tr className="dark:bg-gray-100 bg-zinc-200 text-zinc-100 dark:text-zinc-800 sticky top-0 ">
          <th className="p-4 font-medium border border-gray-300 text-zinc-900">
            <span >
              {
                fileImage ? (
                  <div className={"flex justify-center"}>
                    <span>
                      <Avatar
                        className="w-48 h-48"
                        src={URL.createObjectURL(fileImage)}
                      />
                      <Tooltip content={"Cancelar"} placement={"left"}>
                        <button onClick={() => setFileImage(null)} className={"mt-1"}> <FaBackward size={23} color={"red"}/></button>
                      </Tooltip>
                    </span>
                  </div>
                ) : (
                  <div
                    className="drop-container-small"
                    // onDrop={handleDrop}
                    // onDragOver={handleDragOver}
                    style={{
                      border: '2px dashed #ccc',
                      padding: '20px',
                      borderRadius: '10px',
                      textAlign: 'center',
                      marginBottom: '20px',
                    }}
                  >
                    <input
                      id="images"
                      type="file"
                      // accept=".xlsx"
                      onChange={(e) => setFileImage(e.target.files[0])}
                      style={{display: 'none'}}
                    />
                    <label htmlFor="images"
                           className="button w-full font-black text-zinc-700 underline hover:text-zinc-500 cursor-pointer">
                      Seleccionar archivo
                    </label>
                  </div>
                )
              }


            </span>

          </th>
          <th className="p-4 font-medium border border-gray-300text-zinc-800 ">

           <span className="p-4">
              <FormDynamicField
                placeholder={"Nombre completo"}
                value={nameData}
                setState={setNameData}
                valueDefault={""}
              />
           </span>
            <span className="mt-3">
                <FormDynamicField
                  error={idOperError}
                  placeholder={"Cédula"}
                  value={idOper}
                  setState={setIdOper}
                  valueDefault={""}
                />
            </span>

            <span className="mt-3 mb-3">
               {
                 isRight &&
                 <>

                 {
                     isLoading ? (
                       <Spinner color={"default"} size={"lg"}/>
                     ) : (
                       <span onClick={handleSubmit} className={"ml-2"}>
                       <FaPlusCircle size={23} color={"green"}/>
                      </span>
                     )
                   }


                 </>
               }

              
            </span>
            {
                  errorMessage && (
                    <span className={"text-red-500  "}>
                      <small className="mt-5 font-bold">
                        {errorMessage}
                      </small>
                    </span>
                  )
               } 
          </th>
        </tr>
      </thead>
    </>
  )
}

export default TheadOperatorsCustom;