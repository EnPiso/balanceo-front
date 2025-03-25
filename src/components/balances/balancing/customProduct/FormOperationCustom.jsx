import React, { useEffect, useState } from "react";
import { Input } from "@nextui-org/react";
import { FaSave } from "react-icons/fa";
import CustomButton from "../../../../ui/CustomButton.jsx";
import InputFormCustom from "./InputFormCustom.jsx";
import { useRecoilState } from "recoil";
import { dataObjClone } from "../../../../infraestructure/states/states_navigation.js";
import {orderObjBalancing} from "../../../../infraestructure/states/order_states.js";
import {postData} from "../../../../infraestructure/call_api/crud.js";
import {urlMain} from "../../../../infraestructure/data/const.js";
import {assignColorsToArray} from "../../../../ui/utils.js";
import toast from "react-hot-toast";
import {toastMessageCustom} from "../../../../infraestructure/data/toastMessage.js";
import {searchOperations} from "../../../../infraestructure/states/operation_states.js";
import MyCustomButton from "../../../../ui/MyCustomButton.jsx";

const FormOperationCustom = () => {
  const [operation, setOperation] = useState({ operation: "", machine: "", sam: "", original: true });
  const [isValid, setIsValid] = useState(false);
  const [dataObj, setDataObjClone] = useRecoilState(dataObjClone);
  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);

  const [cloneOperations, setCloneOperations] = useRecoilState(searchOperations);


  useEffect(() => {
    if (dataObj) {
      const data = {
        operation: dataObj.operation || "",
        machine: dataObj.machine || "",
        sam: dataObj.sam || "",
      };
      console.log("Nuevo dataObj recibido:", data);
      setOperation((prevOperation) => {
        if (
          prevOperation?.operation !== data.operation ||
          prevOperation?.machine !== data.machine ||
          prevOperation?.sam !== data.sam
        ) {
          return data;
        }
        return prevOperation;
      });
    }
  }, [dataObj]);

  useEffect(() => {
    if (operation) {
      const errors = validateOperation(operation);
      setIsValid(Object.keys(errors).length === 0);
    }
  }, [operation]);

  const validateOperation = (operation) => {

    const errors = {};
    if (!operation?.operation || operation.operation.trim().length <= 3) {
      errors.operation = "Debe tener más de 3 caracteres.";
    }

    if (!operation?.machine || operation.machine.trim().length <= 3) {
      errors.machine = "Debe tener más de 3 caracteres.";
    }

    const regexNumber = /^\d+(\.\d{1,2})?$/; // Permitir hasta 15 decimales

    // Validar SAM
    if (operation?.sam == null || operation.sam === "") {
      errors.sam = "El campo SAM es obligatorio.";
    } else {
      const parsedSam = parseFloat(operation.sam); // Convertir a número flotante
      if (isNaN(parsedSam) || parsedSam <= 0) {
        errors.sam = "Debe ser un número mayor a 0.00.";
      }
    }
    return errors;
  };

  const handleSubmit = () => {
    const data = {
      operation: operation,
      product_id: objBalancing.product.id
    }

    const createOperation = async (data) => {

      try {
        const result = await postData(urlMain + "/operations", data)
        setCloneOperations([...cloneOperations, result])
        
        // console.log(result)
        setDataObjClone(null)
        setOperation({ operation: "", machine: "", sam: "" })
        toast.success(toastMessageCustom.operationsNew)
      } catch (error) {
        console.error('Error setting data', error);
      }
    };

    createOperation(data);
  }

  return (
    <div className="flex  justify-between items-center py-2">
      <InputFormCustom name="operation" label="Operación" operation={operation} setOperation={setOperation} validateOperation={validateOperation} setIsValid={setIsValid} />
      <InputFormCustom name="machine" label="Máquina" operation={operation} setOperation={setOperation} validateOperation={validateOperation} setIsValid={setIsValid} />
      <InputFormCustom name="sam" label="Sam" operation={operation} setOperation={setOperation} validateOperation={validateOperation} setIsValid={setIsValid} />
      {isValid && (
    
          <button onClick={handleSubmit} >
            <FaSave className="text-secondary_two mr-2 mt-8" size={30}/>
           
          </button>
          
      )}
    </div>
  );
};

export default FormOperationCustom;
