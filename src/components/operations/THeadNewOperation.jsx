import React, { useState } from "react";
import InputNewOperation from "./InputNewOperation.jsx";
import { Tooltip } from "@nextui-org/react";
import { FaPlusCircle } from "react-icons/fa";
import {postData} from "../../infraestructure/call_api/crud.js";
import {urlMain} from "../../infraestructure/data/const.js";
import {useRecoilState} from "recoil";
import {operationsProduct} from "../../infraestructure/states/operation_states.js";
import toast from "react-hot-toast";
import BtnDeleteOperationCustom from "./BtnDeleteOperationCustom.jsx";

const THeadNewOperation = () => {
  const [operationVal, setOperationVal] = useState({
    operation: '',
    machine: '',
    sam: '',
  });

  const [errors, setErrors] = useState({
    sam: '',
  });

  const [operations, setOperations] = useRecoilState(operationsProduct)

  // Validar que no haya errores y todos los campos estén completos
  const isButtonDisabled =
    Object.values(errors).some((error) => error !== '') || // Si hay errores
    Object.values(operationVal).some((value) => value.trim() === ''); // Si algún campo está vacío

  // Actualiza el valor del campo correspondiente
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validar campo SAM
    if (name === "sam") {
      if (value === '' || !/^\d*\.?\d*$/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          sam: "El valor debe ser un número entero o flotante.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          sam: '',
        }));
      }
    }

    // Actualizar el estado general
    setOperationVal((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };



  const handleSubmit = () => {
    const postDataOrder = async (operationVal) => {

      const data = {
        operation: operationVal,
        product_id: operations.product.id
      }

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

        setOperationVal({
          operation: '',
          machine: '',
          sam: '',
        })
        toast.success("Se ha guardado con exito la operación")
        // setListPlants([...listPlants, result])

      } catch (error) {
        console.error('Error setting data', error);
      }
    };

    postDataOrder(operationVal);


  }

  return (
    <>
      <thead>
      <tr className="dark:bg-gray-100 bg-zinc-100 text-zinc-800 dark:text-zinc-800 uppercase">
        <th className="p-4 text-left font-medium border border-gray-300">
          <InputNewOperation
            value={operationVal.operation}
            handleChange={handleChange}
            label={"Ingresa operación"}
            name={"operation"}
          />
        </th>
        <th className="p-4 text-left font-medium border border-gray-300">
          <InputNewOperation
            value={operationVal.machine}
            handleChange={handleChange}
            label={"Ingresa máquina"}
            name={"machine"}
          />
        </th>
        <th className="p-4 text-left font-medium border border-gray-300 flex justify-between items-center">
          <InputNewOperation
            value={operationVal.sam}
            handleChange={handleChange}
            label={"Ingresa SAM"}
            name={"sam"}
            errorSam={errors.sam}
          />

          <span>
             <Tooltip placement={"right-end"} content={"Agregar nueva operación"}>
              <button
                onClick={handleSubmit}
                disabled={isButtonDisabled}
                className={`ml-3 ${isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <FaPlusCircle color={isButtonDisabled ? "gray" : "green"} size={23} />
              </button>
            </Tooltip>

          </span>

        </th>
      </tr>
      </thead>
    </>
  );
};

export default THeadNewOperation;
