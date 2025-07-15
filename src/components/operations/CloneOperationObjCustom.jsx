import React from "react";
import {FaArrowAltCircleRight, FaPlusCircle} from "react-icons/fa";
import {useRecoilState} from "recoil";
import { dataObjClone, isOperationClone } from "../../infraestructure/states/states_navigation";
import { normalizeOperation } from "../balances/balancing/customProduct/dragAndDrop/shared";

const CloneOperationObjCustom = ({ operation, addOperation, setShowFormNew }) => {

  const [dataObj, setDataObjClone] = useRecoilState(dataObjClone);

  return (
    <tr
      className="cursor-pointer bg-white hover:bg-gray-50 transition-all border-b border-gray-200 shadow-sm hover:shadow-md"
    >
      <td className="px-4 py-2 border-l-1 text-left text-gray-700 font-medium hover:scale-105 hover:shadow-md transition-transform duration-300 transform origin-center flex items-center space-x-2 group">
        {operation.operation}
      
        <button onClick={()=> {
          setDataObjClone(operation)
          setShowFormNew(true);
          }}>
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

export default CloneOperationObjCustom;
