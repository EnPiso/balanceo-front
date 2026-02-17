import {FaBackward, FaPlus, FaPlusCircle, FaSave, FaUserAlt, FaUserCheck, FaWindowClose} from "react-icons/fa";
import React, {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {Avatar, Input, Spinner, Tooltip} from "@nextui-org/react";
import { useRecoilState } from "recoil";
import { postData } from "../../infraestructure/call_api/crud.js";
import { OpersPolyvalences } from "../../infraestructure/states/states_polyvalence.js";
import { machinesList } from "../../infraestructure/states/states_machine.js";
import FormDynamicField from "../opers/FormDynamicField.jsx";
import CustomButton from "../../ui/CustomButton.jsx";
import { urlMain } from "../../infraestructure/data/const.js";

const FormNewMachine = ({setIsOpen}) => {
  const [machine,setMachine] = useState('')

  const [isRight,setIsRight] = useState(false)
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading,setIsLoading] = useState(false)
  const [machines,setMachines] = useRecoilState(machinesList)
  

  useEffect(() => {
    const isFormatValid = machine.length >= 2
    setIsRight(isFormatValid)
    
  }, [machine]);

  const handleSubmit = () => {
    const data = {
      machine: {
        machine: machine
      }
    }
    
    setIsLoading(true);
    fetchApi(data);
  }


  const fetchApi = (data) => {
    const createMachine = async (data) => {

      try {
        const result = await postData(urlMain + "/machines", data);
        if(result){
          setMachines([...machines, result])
          toast.success("La máquina ha sido creada con éxito")
          setIsOpen(false) 
         // setIsNewOperator()
        }else{
          toast.error("La máquina ya está en uso. Por favor elige otro nombre.")
          setIsRight(false)
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

    createMachine(data);
  }



  return(
    <>
      <div>
        <div className="dark:bg-gray-100 bg-zinc-200 text-zinc-100 dark:text-zinc-800 sticky top-0 ">

          <div className="p-4 font-medium border border-gray-300text-zinc-800 ">

            <span className="p-4">
                <FormDynamicField
                  placeholder={"Máquina"}
                  value={machine}
                  setState={setMachine}
                  valueDefault={""}
                  onKeyDown={() => console.log("onkeydown")}
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
                        <CustomButton
                          color="default"
                          variant="bordered"
                          startContent={<FaSave className="text-secondary_two" />}
                          onClick={handleSubmit}
                          title="Guardar"
                        />
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

export default FormNewMachine;