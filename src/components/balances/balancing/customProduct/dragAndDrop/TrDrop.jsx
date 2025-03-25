import React, {useEffect} from "react";
import {FaArrowAltCircleRight, FaStop} from "react-icons/fa";
import { Chip } from "@nextui-org/react";
import { FaDeleteLeft } from "react-icons/fa6";
import toast from "react-hot-toast";
import { toastMessageCustom } from "../../../../../infraestructure/data/toastMessage.js";
import {useRecoilState} from "recoil";
import {isOperationClone} from "../../../../../infraestructure/states/states_navigation.js";
import {orderObjBalancing} from "../../../../../infraestructure/states/order_states.js";

const TrDrop = ({
                  operation,
                  index,
                  handleDragOver,
                  handleDrop,
                  operations,
                  setOperations,
                  operationsCreate,
                  setOperationsCreate,
                  draggedIndex, // Estado para identificar un reordenamiento interno
                  setDraggedIndex, // Método para actualizar el índice arrastrado
                }) => {


  const [operationCloneIs, setOperationCloneIs] = useRecoilState(isOperationClone);
  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);



  const handleDragStart = (e) => {
    // Envía los datos arrastrados como JSON
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({ operation, index })
    );

    // Si es un reordenamiento interno, guarda el índice en draggedIndex
    setDraggedIndex(index);
  };

  const handleDelete = (e, operation) => {
    e.preventDefault();

    const updatedArray = operationsCreate.filter((obj) => obj.id !== operation.id);
    setOperationsCreate(updatedArray);

    const updatedArrayList = operations.filter((obj) => obj.id !== operation.id);

    // Actualiza las posiciones
    const updatedWithPositions = updatedArrayList.map((op, idx) => ({
      ...op,
      operation_position: idx + 1,
    }));

    setOperations(updatedWithPositions);

    toast.error(toastMessageCustom.operationDragRemove);
  };

  // Verificar si la operación actual está en operationsCreate
  const isSelected = operationsCreate.some((op) => op.id === operation.id);

  const handleChangeList = () => {
    setOperationCloneIs(false)
    setOperationsCreate([])
    if (objBalancing?.operations) {
      setOperations(
        objBalancing.operations.map((op, index) => ({
          ...op,
          operation_position: index + 1,
        }))
      );
    }
  }



  return (
    <tr
      draggable
      onDragStart={handleDragStart} // Evento de inicio de arrastre
      onDragOver={handleDragOver} // Permitir drop en esta fila
      onDrop={handleDrop} // Manejar el evento de drop
      className={`cursor-pointer bg-white transition-all duration-200 border-b hover:shadow-lg font-bold ${
        isSelected ? "bg-zinc-200 hover:bg-zinc-300" : "hover:bg-zinc-100"
      }`}
    >
      <td className="px-4 py-2  text-right border-l-1">
        {operation.operation_position}
      </td>
      <td className="px-4 py-2  flex justify-between items-center border-l-1">
       <div className="flex justify-between items-center">
         <FaDeleteLeft
           size={20}
           onClick={handleChangeList}
           color="gray"
         />
         <FaStop
           className="ml-2"
           size={20}
           onClick={handleChangeList}
           color="gray"
         />
         <span className="ml-2">{operation.operation}</span>
       </div>

        {isSelected && (
          <button className="ml-2">
            <FaDeleteLeft
              className="!cursor-pointer"
              size={20}
              onClick={(e) => handleDelete(e, operation)}
              color="red"
            />
          </button>
        )}
      </td>
      <td className="px-4 py-2 border-l-1">{operation.machine}</td>
      <td className="px-4 py-2 border-l-1">{operation.sam}</td>
    </tr>
  );
};

export default TrDrop;
