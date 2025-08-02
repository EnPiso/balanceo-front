import React, { useEffect, useState } from "react";
import { CircularProgress, Input } from "@nextui-org/react";
import { FaSave } from "react-icons/fa";


import toast from "react-hot-toast";
import InputFormCustom from "../balances/balancing/customProduct/InputFormCustom";
import CustomButton from "../../ui/CustomButton";
import { postData } from "../../infraestructure/call_api/crud";
import { urlMain } from "../../infraestructure/data/const";
import SelectListMachines from "./SelectListMachines";
import { useRecoilState } from "recoil";
import { operationsArrayMaster } from "../../infraestructure/states/operation_master_state";

const FormOperationManual = ({operation, setOperation, isValid, setIsValid}) => {

  const [isLoading, setIsLoading] = useState(false);

  const [masterOperations, setMasterOperations] = useRecoilState(operationsArrayMaster)
  


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

    if (!operation?.machine_id) {
      errors.machine_id = "Debe seleccionar la máquina.";
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



  return (
    <div className="w-full">
      <InputFormCustom
        name="operation" 
        label="Operación" 
        operation={operation} 
        setOperation={setOperation} 
        validateOperation={validateOperation} 
        setIsValid={setIsValid} />

      <SelectListMachines
        operation={operation}
        setOperation={setOperation}
      />
      
      <InputFormCustom 
        name="sam" 
        label="Sam" 
        operation={operation} 
        setOperation={setOperation} 
        validateOperation={validateOperation} 
        setIsValid={setIsValid} />
  </div>
  );
};

export default FormOperationManual;
