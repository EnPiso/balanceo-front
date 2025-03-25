import React from "react";
import {normalizeOperation} from "./dragAndDrop/shared.js";
import {FaArrowAltCircleRight, FaPlusCircle} from "react-icons/fa";
import {useRecoilState} from "recoil";
import {dataObjClone, isOperationClone} from "../../../../infraestructure/states/states_navigation.js";

const CloneObjCustom = ({ operation, addOperation }) => {

  const [operationCloneIs, setOperationCloneIs] = useRecoilState(isOperationClone);

  const [dataObj, setDataObjClone] = useRecoilState(dataObjClone);

  const handleDragStart = (e) => {
    const normalizedOperation = normalizeOperation(operation);
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify(normalizedOperation)
    );
    setOperationCloneIs(true)
  };

  const handleDrop = (e) => {
    e.preventDefault();
    addOperation(operation);
  };

  return (
    <tr
      draggable
      onDragStart={handleDragStart}
      className="cursor-pointer bg-white hover:bg-gray-50 transition-all border-b border-gray-200 shadow-sm hover:shadow-md"
    >
      <td className="px-4 py-2 border-l-1 text-left text-gray-700 font-medium hover:scale-105 hover:shadow-md transition-transform duration-300 transform origin-center flex items-center space-x-2 group">
        {operation.operation}
        <FaArrowAltCircleRight
          size={20}
          className="ml-3 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        />
        <button onClick={()=> setDataObjClone(operation)}>
          <FaPlusCircle
            size={20}
            className="ml-3 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          />
        </button>
      </td>

      <td className="px-4 py-2 border-l-1">
        {operation.machine}
      </td>
      <td className="px-4 py-2 border-l-1">
        {operation.sam}
      </td>
    </tr>
  );
};

export default CloneObjCustom;
