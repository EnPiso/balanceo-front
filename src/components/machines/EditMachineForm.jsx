import React, {useState} from "react";
import {Spinner, Tooltip} from "@nextui-org/react";
import {useRecoilState} from "recoil";
import toast from "react-hot-toast";
import { updateData } from "../../infraestructure/call_api/crud.js";
import { urlMain } from "../../infraestructure/data/const.js";
import { toastMessageCustom } from "../../infraestructure/data/toastMessage.js";
import InputTextEdit from "../products/InputTextEdit.jsx";
import { FaArrowRight, FaPlay } from "react-icons/fa";
import { machinesList } from "../../infraestructure/states/states_machine.js";

const EditMachineForm = ({machine}) => {
    const [isEditName, setIsEditName] = useState(false)
    const [isEditNameLoad, setIsEditNameLoad] = useState(false)

    const [machines,setMachines] = useRecoilState(machinesList)
    

    const handleFetchApi = (val, obj) => {
        setIsEditNameLoad(true)
        const data = {
            machine: {
                machine: val
            }
        }
        
        const updateProduct = async (data) => {
            try {
                const result = await updateData(urlMain + "machines/" + obj.id, data)
                const updatedMachines = machines.map((item) =>
                    item.id === result.id ? result : item
                );
                setMachines(updatedMachines)

                toast.success("La máquina ha sido actualizada con éxito")
                setIsEditName(false)
            } catch (error) {
                console.error('Error setting data', error);
            }  finally {
                setIsEditNameLoad(false)
            }
        };

        updateProduct(data);


    }



    return(
        <>
            <td
                className="p-2 border border-gray-100 dark:border-transparent cursor-pointer">
                {
                    isEditName ?
                        <>
                            {
                                isEditNameLoad ? <Spinner size="lg" color={"default"}/> :  <InputTextEdit
                                    handleFetchApi={handleFetchApi}
                                    obj={machine}
                                    valueDefault={ machine.machine}
                                    isEdit={isEditName}
                                    setIsEdit={setIsEditName}
                                    label={"Editar " +  machine.machine + " (ENTER/ESC)"}  />
                            }

                        </>
                            :
                        <>
                            
                            <button 
                                className="flex justify-between items-center"
                                onClick={() => setIsEditName(!isEditName)}> 
                                {machine.machine} <FaArrowRight className="ml-3"/>
                            </button>

                        </>
                }

            </td>
        </>
    )
}

export default EditMachineForm;