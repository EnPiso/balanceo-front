import React, { useState } from "react";
import TrDrop from "./TrDrop.jsx";
import { normalizeOperation } from "./shared.js";
import toast from "react-hot-toast";
import { toastMessageCustom } from "../../../../../infraestructure/data/toastMessage.js";
import {FaArrowDownUpAcrossLine} from "react-icons/fa6";

const OperationListDrag = ({
                            operations,
                            setOperations,
                            operationsCreate,
                            setOperationsCreate,
                          }) => {
  const [draggedIndex, setDraggedIndex] = useState(null); // Para el reordenamiento interno

  const handleDragOver = (e) => {
    e.preventDefault(); // Permite el drop
  };

  const handleDropInternal = (e, targetIndex) => {
    e.preventDefault();

    if (draggedIndex === null) return;

    const updatedOperations = [...operations];
    const [draggedItem] = updatedOperations.splice(draggedIndex, 1); // Remueve el elemento arrastrado
    updatedOperations.splice(targetIndex, 0, draggedItem); // Inserta en la nueva posición

    // Actualiza las posiciones
    const updatedWithPositions = updatedOperations.map((op, idx) => ({
      ...op,
      operation_position: idx + 1,
    }));

    setOperations(updatedWithPositions);
    setDraggedIndex(null); // Limpia el índice
  };

  const handleDropExternal = (e, targetIndex) => {
    e.preventDefault();
    const draggedData = JSON.parse(e.dataTransfer.getData("application/json"));
    const normalizedOperation = normalizeOperation(draggedData);

    const updatedOperations = [...operations];

    // Validar contra operations
    const isMatch = updatedOperations.some(
      (op) => op.operation === normalizedOperation.operation
    );

    if (isMatch) {
      toast.error(toastMessageCustom.operationDragEqual);
      return;
    }

    setOperationsCreate([...operationsCreate, normalizedOperation]);

    // Inserta el objeto normalizado en la nueva posición
    updatedOperations.splice(targetIndex, 0, normalizedOperation);

    // Actualiza las posiciones
    const updatedWithPositions = updatedOperations.map((op, idx) => ({
      ...op,
      operation_position: idx + 1,
    }));

    setOperations(updatedWithPositions);
  };

  return (
    <div className="overflow-auto max-h-[600px] bg-gray-50 p-4 rounded-md shadow-md">
      <table className="min-w-full border-collapse text-small">
        <thead className="bg-gradient-to-r from-zinc-700 to-zinc-900 text-white sticky top-0 z-10">
        <tr>
          <th className="px-4 py-2 text-left font-bold flex justify-between items-center text-secondary_two">
            <FaArrowDownUpAcrossLine className="text-secondary_two"/>
            Posición
          </th>
          <th className="px-4 py-2 text-left font-bold text-secondary_two">
            Operación
          </th>
          <th className="px-4 py-2 text-left font-bold text-secondary_two">Máquina</th>
          <th className="px-4 py-2 text-left font-bold text-secondary_two">Sam</th>
        </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
        {operations.map((operation, index) => (
          <TrDrop
            key={index}
            operation={operation}
            index={index}
            handleDragStart={() => setDraggedIndex(index)} // Para el reordenamiento interno
            handleDragOver={handleDragOver}
            handleDrop={(e) => {
              if (draggedIndex !== null) {
                handleDropInternal(e, index); // Reordenamiento interno
              } else {
                handleDropExternal(e, index); // Arrastre externo
              }
            }}
            operations={operations}
            setOperations={setOperations}
            operationsCreate={operationsCreate}
            setOperationsCreate={setOperationsCreate}
            setDraggedIndex={setDraggedIndex}
          />
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default OperationListDrag;
