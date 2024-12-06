import React from "react";
import {FaArrowAltCircleRight} from "react-icons/fa";
import {Chip} from "@nextui-org/react";
import {FaDeleteLeft} from "react-icons/fa6";
import toast from "react-hot-toast";
import {toastMessageCustom} from "../../../../../infraestructure/data/toastMessage.js";

const TrDrop = ({ operation, index, handleDragOver, handleDrop, operations, setOperations,operationsCreate, setOperationsCreate }) => {
  const handleDragStart = (e) => {
    // Envía los datos arrastrados como JSON
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({ operation, index })
    );

  };

  // Verificar si la operación actual está en operationsCreate
  const isSelected = operationsCreate.some(
    (op) => op.id === operation.id
  );


  const handleDelete = (e,operation) => {
    e.preventDefault()

    const updatedArray = operationsCreate.filter(obj => obj.id !== operation.id);
    setOperationsCreate(updatedArray)
    // console.log(operation)

    const updatedArrayList = operations.filter(obj => obj.id !== operation.id);

    // Actualiza las posiciones
    const updatedWithPositions = updatedArrayList.map((op, idx) => ({
      ...op,
      operation_position: idx + 1,
    }));

    setOperations(updatedWithPositions);

    toast.error(toastMessageCustom.operationDragRemove)
  }


  return (
    <tr
      draggable
      onDragStart={handleDragStart} // Evento de inicio de arrastre
      onDragOver={handleDragOver} // Permitir drop en esta fila
      onDrop={handleDrop} // Manejar el evento de drop
      className={`cursor-pointer bg-white transition-all duration-200 border-b hover:shadow-lg ${
        isSelected ? "bg-zinc-200 hover:bg-zinc-300" : "hover:bg-zinc-100"
      }`}
    >
      <td className="px-4 py-2 border border-gray-300 text-left">

        <Chip>
          {operation.operation_position}
        </Chip>

      </td>
      <td className="px-4 py-2 border border-gray-300 flex justify-between items-center">
        <span>{operation.operation}</span>
        {
          isSelected && (
            <button className="ml-2">
              <FaDeleteLeft
                className="!cursor-pointer"
                size={20}
                onClick={(e) => handleDelete(e, operation)}
                color="red"
              />
            </button>
          )
        }
      </td>
      <td className="px-4 py-2 border border-gray-300">{operation.machine}</td>
      <td className="px-4 py-2 border border-gray-300">{operation.sam}</td>
    </tr>
  );
};

export default TrDrop;
