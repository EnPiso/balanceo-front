import React, {useEffect, useState} from 'react'
import {Input} from "@nextui-org/react";
import {FaSave} from "react-icons/fa";
import CustomButton from "../../../../ui/CustomButton.jsx";
import InputFormCustom from "./InputForm Custom.jsx";

const FormOperationCustom = () => {

  const [operation, setOperation] = useState(null)
  const [isValid, setIsValid] = useState(false)


  useEffect(() => {
    if(operation){
      const errors = validateOperation(operation);
      setIsValid(Object.keys(errors).length === 0);
    }
  }, [operation]);


  // Función de validación
  const validateOperation = (operation) => {
    const errors = {};

    // Validar operación
    if (!operation.operation || operation.operation.length <= 3) {
      errors.operation = "Debe tener más de 3 caracteres.";
    }

    // Validar máquina
    if (!operation.machine || operation.machine.length <= 3) {
      errors.machine = "Debe tener más de 3 caracteres.";
    }

    // Validar SAM
    const regexNumber = /^\d+(\.\d{1,2})?$/;
    if (!operation.sam || !regexNumber.test(operation.sam) || parseFloat(operation.sam) <= 0) {
      errors.sam = "Debe ser un número mayor a 0.00.";
    }

    return errors;
  };

  return (
    <div className="flex w-full justify-between ">

      <InputFormCustom
        name="operation"
        label="Operación"
        operation={operation}
        setOperation={setOperation}
      />
      <InputFormCustom
        name="machine"
        label="Máquina"
        setOperation={setOperation}
        operation={operation}
      />
      <InputFormCustom
        name="sam"
        label="Sam"
        setOperation={setOperation}
        operation={operation}
      />
      {
        isValid && (
          <div className="mr-2 mt-3">
            <CustomButton
              color="default"
              variant="bordered"
              startContent={<FaSave color="green"  size={20}/>}
              onClick={()=> console.log("save")}
            />
          </div>

        )
      }



    </div>
  )
}
export default FormOperationCustom
