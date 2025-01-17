import FormDynamicField from "./FormDynamicField.jsx";
import {FaPlusCircle, FaUserAlt, FaUserCheck} from "react-icons/fa";
import React, {useEffect, useState} from "react";
import {postData} from "../../infraestructure/call_api/crud.js";
import {urlMain} from "../../infraestructure/data/const.js";
import toast from "react-hot-toast";
import {toastMessageCustom} from "../../infraestructure/data/toastMessage.js";
import {Spinner} from "@nextui-org/react";

const TheadOperatorsCustom = ({moduleId, opers, setOpers, setIsNewOperator}) => {
  const [nameData,setNameData] = useState('')
  const [idOper,setIdOper] = useState('')
  const [idOperError,setIdOperError] = useState(false)

  const [isRight,setIsRight] = useState(false)
  const [isLoading,setIsLoading] = useState(false)

  useEffect(() => {
    setIsRight(nameData.length >= 2 && idOper.length >= 2)
  }, [nameData, idOper]);

  const handleSubmit = () => {
    const data = {
      oper: {
        name: nameData,
        id_oper: idOper,
        production_module_id: moduleId
      }
    }
    setIsLoading(true)
    fetchApi(data)
  }


  const fetchApi = (data) => {
    const createOper = async (data) => {

      try {
        const result = await postData(urlMain + "/opers", data);
        if(result){
          setOpers([...opers, result])
          toast.success("El operario ha sido creado con éxito")
          setNameData("")
          setIdOper("")
         // setIsNewOperator()
        }else{
          toast.error("La cédula ya está en uso. Por favor elige otro.")
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
            <span className="flex justify-between items-center">
              Ingresa operario <FaUserAlt/>
            </span>

          </th>
          <th className="p-4 font-medium border border-gray-300text-zinc-800 flex justify-between items-center">

            <FormDynamicField
              placeholder={"Nombre completo"}
              value={nameData}
              setState={setNameData}
              valueDefault={""}
              onKeyDown={() => console.log("onkeydown")}
            />
            <span className="flex justify-between items-center">
             <span className="ml-2">
                <FormDynamicField
                  error={idOperError}
                  placeholder={"Cédula"}
                  value={idOper}
                  setState={setIdOper}
                  valueDefault={""}
                  onKeyDown={() => console.log("onkeydown")}
                />
             </span>
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

          </th>
        </tr>
      </thead>
    </>
  )
}

export default TheadOperatorsCustom;