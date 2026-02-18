import {FaBackward, FaPlus, FaPlusCircle, FaUserAlt, FaUserCheck, FaWindowClose} from "react-icons/fa";
import React, {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {Avatar, Input, Spinner, Tooltip} from "@nextui-org/react";
import { urlMain } from "../../../infraestructure/data/const.js";
import { postDataFile } from "../../../infraestructure/call_api/crud.js";
import FormDynamicField from "../../opers/FormDynamicField.jsx";
import { OpersPolyvalences } from "../../../infraestructure/states/states_polyvalence.js";
import { useRecoilState } from "recoil";
import SelectModuleCustom from "./SelectModuleCustom.jsx";

const FormOperNewCustom = ({setNewObjOper, setIsOpen}) => {
  const [nameData,setNameData] = useState('')
  const [idOper,setIdOper] = useState('')
  const [idOperError,setIdOperError] = useState(false)
  const [idModule,setIdModule] = useState('')

  const [isRight,setIsRight] = useState(false)
  const [errorMessage, setErrorMessage] = useState("");

  const [isLoading,setIsLoading] = useState(false)

  const [fileImage,setFileImage] = useState(null)
  const [opersList, setOpersList] = useRecoilState(OpersPolyvalences)


  useEffect(() => {
    const isFormatValid = nameData.length >= 2 && idOper.length >= 2 && idModule !== "";
    setIsRight(isFormatValid)
    
  }, [nameData, idOper, idModule]);

  const handleSubmit = () => {
    const data = new FormData();
    data.append("oper[name]", nameData);
    data.append("oper[id_oper]", idOper);
    data.append("oper[production_module_id]", idModule);

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
          
          setOpersList([...opersList, result])
          // setOpers([...opers, result])
          setNewObjOper(result);
          
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
        setIsOpen(false) 
      }


    };

    createOper(data);
  }



  return(
    <>
      <div>
        <div className="dark:bg-gray-100 bg-zinc-200 text-zinc-100 dark:text-zinc-800 sticky top-0 ">
          <div className="p-4 font-medium border border-gray-300 text-zinc-900">
            <span >
              {
                fileImage ? (
                  <>
                    <div className={"flex justify-center"}>
                      <span>
                        <Avatar
                          className="w-48 h-48"
                          src={URL.createObjectURL(fileImage)}
                        />
                      
                      </span>
                    </div>
                    <div className="mt-2 flex justify-end">
                      <button 
                          onClick={()=> {
                          setFileImage(null)
                        }} 
                        className="flex justify-between items-center text-red-500 font-bold">
                        <FaWindowClose size={20} className="mr-2"/>  
                      </button>
                      
                    </div>
                    
                  </>
                  
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

          </div>
          <div className="p-4 font-medium border border-gray-300text-zinc-800 ">

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

            <span>
              <br />
              <SelectModuleCustom
                setIdModule={setIdModule}
              />
            </span>

            <span className="mt-3 mb-3">
              
              {
                isRight &&
                <>

                {
                    isLoading ? (
                      <div className="flex justify-end items-center mt-4">
                        <Spinner color={"default"} size={"lg"}/>
                      </div>
                    ) : (
                      <span className="flex justify-end items-center mt-4">
                        <span onClick={handleSubmit} className={"ml-2"}>
                          <FaPlus size={28} className="text-secondary_two"/>
                        </span>
                      </span>
                    )
                  }


                </>
              }

              
            </span>
            {
                  errorMessage && (
                    <span className={"text-red-500 text-center"}>
                      <br />
                      <small className=" font-bold">
                        {errorMessage}
                      </small>
                    </span>
                  )
               } 
          </div>
        </div>
      </div>
    </>
  )
}

export default FormOperNewCustom;