import React, { useEffect, useState } from "react";
import { CircularProgress, Input } from "@nextui-org/react";
import { FaSave } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { dataObjClone } from "../../infraestructure/states/states_navigation.js";
import InputFormCustom from "../balances/balancing/customProduct/InputFormCustom.jsx";
import { operationsProduct } from "../../infraestructure/states/operation_states.js";
import { postData } from "../../infraestructure/call_api/crud.js";
import { urlMain } from "../../infraestructure/data/const.js";
import toast from "react-hot-toast";
import SelectListMachines from "../operations_master/SelectListMachines.jsx";

const initForm = { 
  operation: "",
  machine_id: "", 
  machine_name: "", 
  sam: "", 
  original: true 
}

const FormNewOperationCustom = () => {

  const [operation, setOperation] = useState(initForm);
  const [isValid, setIsValid] = useState(false);
  const [dataObj, setDataObjClone] = useRecoilState(dataObjClone);
  const [operations, setOperations] = useRecoilState(operationsProduct)
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if (dataObj) {
      const data = {
        operation: dataObj.operation || "",
        machine_id: dataObj.machine_id || "",
        machine_name: dataObj.machine_name || "",
        sam: dataObj.sam || "",
      };
      setOperation((prevOperation) => {
        if (
          prevOperation?.operation !== data.operation ||
          prevOperation?.machine_id !== data.machine_id ||
          prevOperation?.machine_name !== data.machine_name ||
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

  const handleSubmit = () => {
    const data = {
      operation: operation,
      product_id: operations.product.id
    }
    const postDataOrder = async (data) => {
      setIsLoading(true)
      try {
        const result = await postData(urlMain + "operations", data)
        const arr = operations.operations
        const updateArr = [... arr, result]

        setOperations((prevOperation) => {
          const updatedOperation = {
            ...prevOperation,
            operations: updateArr,
          };
          return updatedOperation;
        });

        setOperation(initForm)


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
    <div className="flex  justify-between items-center py-2">
      <InputFormCustom
        name="operation" 
        label="Operación" 
        operation={operation} 
        setOperation={setOperation} 
        validateOperation={validateOperation} 
        setIsValid={setIsValid} />
      <div className="mr-2 mt-2 w-full">
        <SelectListMachines
          operation={operation}
          setOperation={setOperation}
        />
      </div>
      <InputFormCustom 
        name="sam" 
        label="Sam" 
        operation={operation} 
        setOperation={setOperation} 
        validateOperation={validateOperation} 
        setIsValid={setIsValid} />
      {isValid && (
    <>
    {
      isLoading ? 
        <CircularProgress size={24} /> : 
        <button onClick={handleSubmit} >
          <FaSave 
            className="text-secondary_two mr-2 mt-8" 
            size={30}/>
        </button>
    }
        
    </>
          
          
      )}
    </div>
  );
};

export default FormNewOperationCustom;
