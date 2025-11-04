import React, { useState } from "react";
import {FaArrowAltCircleRight, FaArrowRight, FaPlusCircle} from "react-icons/fa";
import {useRecoilState} from "recoil";
import { dataObjClone, isOperationClone } from "../../infraestructure/states/states_navigation";
import { normalizeOperation } from "../balances/balancing/customProduct/dragAndDrop/shared";
import { postData } from "../../infraestructure/call_api/crud";
import { urlMain } from "../../infraestructure/data/const";
import { operationsProduct } from "../../infraestructure/states/operation_states";
import toast from "react-hot-toast";
import { Tooltip } from "@nextui-org/react";

const CloneOperationObjCustom = ({ operation, addOperation, setShowFormNew }) => {

  const [dataObj, setDataObjClone] = useRecoilState(dataObjClone);
  const [operations, setOperations] = useRecoilState(operationsProduct)

  const [isLoading, setIsLoading] = useState(false);

  const handleAddOperation = (operation) => {
    // Validar si ya existe una operación igual
    const exists = operations.operations.some(
      (op) =>
        op.operation === operation.operation &&
        op.machine === operation.machine &&
        op.sam === operation.sam
    );

    if (exists) {
      toast.error("Ya existe una operación con los mismos datos");
      return;
    }
    let operation_update = null
    let data 

    if(operation.is_manual){
      operation_update = operation.id
      data = {
        operation: operation,
        product_id: operations.product.id,
        operation_is_manual: operation.id
      }
    } else {
      data = {
        operation: operation,
        product_id: operations.product.id
      }
    }

    const postDataOrder = async (data) => {
      setIsLoading(true)
      try {
        const result = await postData(urlMain + "operations", data)
        console.log(result,operations)
        const arr = operations.operations
        const updateArr = [... arr, result]

        setOperations((prevOperation) => {
          const updatedOperation = {
            ...prevOperation,
            operations: updateArr,
          };
          return updatedOperation;
        });


        toast.success("Se ha guardado con exito la operación")
        // setListPlants([...listPlants, result])

      } catch (error) {
        console.error('Error setting data', error);
      } finally {
        setIsLoading(false);
        setDataObjClone(null);
      }
    };

    postDataOrder(data);
    
  }


  return (
    <tr
      className="cursor-pointer bg-white hover:bg-gray-50 transition-all border-b border-gray-200 shadow-sm hover:shadow-md"
    >
      <td className="px-4 py-2 border-l-1 text-left text-gray-700 font-medium hover:scale-105 hover:shadow-md transition-transform duration-300 transform origin-center flex items-center space-x-2 group">
        {operation.operation}
        <Tooltip content="Clonar operación" placement="top">
          <button onClick={()=> {
            handleAddOperation(operation)
            }}>
            <FaPlusCircle 
              size={20}
              className="ml-3 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            />
          </button>
        </Tooltip>
        <Tooltip content="personalizar operación" placement="top">
          <button onClick={()=> {
            setDataObjClone(operation)
            setShowFormNew(true);
            }}>
            <FaArrowRight
              size={20}
              className="ml-3 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            />
          </button>
        </Tooltip>
        
      </td>

      <td className="px-4 py-2 border-l-1">
        {operation.machine}
      </td>
      <td className="px-4 py-2 border-l-1">
        {operation.sam}
      </td>
    </tr>
  );
};

export default CloneOperationObjCustom;
