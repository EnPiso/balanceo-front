import React, { useState } from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import TrDrop from "./TrDrop.jsx";
import {normalizeOperation} from "./shared.js";
import toast from "react-hot-toast";
import {toastMessageCustom} from "../../../../../infraestructure/data/toastMessage.js";

const OperationListDrag = ({ operations, setOperations, operationsCreate, setOperationsCreate }) => {


  const handleDragOver = (e) => {
    e.preventDefault(); // Permite el drop
  };




  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    const draggedData = JSON.parse(e.dataTransfer.getData("application/json"));

    const updatedOperations = [...operations];
    const normalizedOperation = normalizeOperation(draggedData);

    // Validar contra operations
    const isMatch = updatedOperations.some(
      (op) => op.operation === normalizedOperation.operation
    );

    if (isMatch) {
      toast.error(toastMessageCustom.operationDragEqual)
      return;
    }

    setOperationsCreate([...operationsCreate, normalizedOperation])

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
      <table className="min-w-full border-collapse">
        <thead className="bg-gradient-to-r from-zinc-700 to-zinc-900 text-white sticky top-0 z-10">
        <tr>
          <th className="px-4 py-2 text-left font-bold">Posición</th>
          <th className="px-4 py-2 text-left font-bold">{operations.length} - Operaciones</th>
          <th className="px-4 py-2 text-left font-bold">Máquina</th>
          <th className="px-4 py-2 text-left font-bold">Sam</th>
        </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
        {operations.map((operation, index) => (
          <TrDrop
            key={index}
            operation={operation}
            index={index}
            handleDragOver={handleDragOver}
            handleDrop={(e) => handleDrop(e, index)}
            operations={operations}
            setOperations={setOperations}
            operationsCreate={operationsCreate}
            setOperationsCreate={setOperationsCreate}
          />
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default OperationListDrag;
