import React, { useState } from "react";
import InputUpdateOperations from "./InputUpdateOperations";
import {updateData} from "../../infraestructure/call_api/crud.js";
import {urlMain} from "../../infraestructure/data/const.js";
import {useRecoilState} from "recoil";
import {operationsProduct} from "../../infraestructure/states/operation_states.js";
import BtnDeleteOperationCustom from "./BtnDeleteOperationCustom.jsx";
import toast from "react-hot-toast";

const FormOperationProduction = ({ operation }) => {
  const [fields, setFields] = useState({
    operationData: false,
    machine: false,
    sam: false,
  });

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

  const handleSubmit = (operation) => {
    // console.log(operationUpdate, operation.id)
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
        // guardar imagen de la tabla del balanceo en product
      } catch (error) {
        console.error('Error setting data', error);
      }
    };

    updateOperation()

  }

  return (
    <tr className="p-2 border border-gray-300 cursor-pointer lowercase">
      {["operation", "machine", "sam"].map((field) => (
        <td key={field} className="px-1 py-1">
          {fields[field] ? (
            <InputUpdateOperations
              valueDefault={operation && operation[field]}
              operation={operation}
              label={field.charAt(0).toUpperCase() + field.slice(1)} // Capitaliza la etiqueta
              setClose={() => handleEditToggle(field)}
              name={field}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          ) : (
            <span className={"flex justify-between items-center"}>
              <span onClick={() => handleEditToggle(field)}>
                {operation[field]}
              </span>
              {
                field === "sam" &&
                  <BtnDeleteOperationCustom
                    operation={operation}
                  />
              }

            </span>

          )}
        </td>
      ))}

    </tr>
  );
};

export default FormOperationProduction;
