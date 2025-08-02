import React, { useState } from "react";
import InputUpdateOperations from "./InputUpdateOperations";
import {updateData} from "../../infraestructure/call_api/crud.js";
import {urlMain} from "../../infraestructure/data/const.js";
import {useRecoilState} from "recoil";
import {operationsProduct} from "../../infraestructure/states/operation_states.js";
import BtnDeleteOperationCustom from "./BtnDeleteOperationCustom.jsx";
import toast from "react-hot-toast";
import SelectListMachines from "../operations_master/SelectListMachines.jsx";
import SelectListEditMachine from "./SelectListEditMachine.jsx";
import { FaBackward, FaBackwardStep, FaX } from "react-icons/fa6";
import { FaBackspace, FaWindowClose } from "react-icons/fa";
import ModalMachineEdit from "./ModalMachineEdit.jsx";

const FormOperationProduction = ({ operation }) => {
  const [showOperation, setShowOperation] = useState(false)
  const [showSam, setShowSam] = useState(false)
  const [showMachine, setShowMachine] = useState(false)

  const [fields, setFields] = useState({
    operationData: false,
    machine: false,
    sam: false,
  });

  const [isOpen, setIsOpen] = useState(false)


  const [operationUpdate,setOperationUpdate] = useState(null)

  const [operations, setOperations] = useRecoilState(operationsProduct)


  const handleEditToggle = (field) => {
    setFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e) => {
    // console.log(`${e.target.name}: ${e.target.value}`);
    const data = {
      [e.target.name] : e.target.value
    }
    setOperationUpdate(data)
  };

  const handleSubmit = (operation, setShow) => {
    
    const operation_id = operation.id
    
    const data = {
      operation: operationUpdate
    }
    const updateOperation = async () => {
      try {
        const result = await updateData(urlMain + `/operations/${operation_id}`, data)
        const updatedItems = operations.operations
          .map((item) => (item.id === result.id ? result : item))
          .sort((a, b) => new Date(a.created_at) - new Date(b.created_at)); // Ascendente
        setOperations((prevState) => ({
          ...prevState, // Copia los demás atributos del objeto
          operations: updatedItems, // Actualiza solo el atributo `name`
        }));
        toast.success("La operación ha sido actualizada con éxito")
        setShow(false)
        
      } catch (error) {
        console.error('Error setting data', error);
      }
    };

    updateOperation()

  }

  return (
    <tr className="p-2 border border-gray-300 cursor-pointer lowercase">
      <td className="px-1 py-1">
        {
          showOperation ? 
            <InputUpdateOperations
              valueDefault={operation.operation}
              operation={operation}
              label={"operation"} // Capitaliza la etiqueta
              setClose={() => handleEditToggle("operation")}
              name={"operation"}
              handleChange={handleChange}
              handleSubmit={()=> handleSubmit(operation, setShowOperation)}
            /> : <>
              <button onClick={()=> setShowOperation(true)}>
                {operation.operation}
              </button>
            </>
        }
        
      </td>
      <td>
        <button onClick={()=> setIsOpen(true)}>
          {operation.machine_name}
        </button>
      </td>

      <td className="px-1 py-1 flex justify-between items-center">
        {
          showSam ? 
            <InputUpdateOperations
              valueDefault={operation.sam}
              operation={operation}
              label={"sam"} // Capitaliza la etiqueta
              setClose={() => handleEditToggle("sam")}
              name={"sam"}
              handleChange={handleChange}
              handleSubmit={()=> handleSubmit(operation, setShowSam)}
            /> : 
            <>
              <button onClick={()=> setShowSam(true)}>
                {operation.sam}
              </button>
            </>
        }
        
        <span>  
          <BtnDeleteOperationCustom
            operation={operation}
          />
        </span>
      </td>
      {
        isOpen && 
          <ModalMachineEdit
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            operation={operation}
          />
      }
      
    </tr>
  );
};

export default FormOperationProduction;
