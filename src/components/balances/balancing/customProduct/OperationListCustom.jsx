import React, { useEffect, useState } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {useRecoilState} from "recoil";
import {orderObjBalancing, showOrderObj} from "../../../../infraestructure/states/order_states.js";
import {postData} from "../../../../infraestructure/call_api/crud.js";
import {urlMain} from "../../../../infraestructure/data/const.js";
import {
  balancingData,
  detailOperOperations,
  updateDragOperation,
  zonesOpers
} from "../../../../infraestructure/states/states_balancing.js";
import {checkOpersPosition} from "../../../../infraestructure/states/opers_states.js";
import {assignColorsToArray} from "../../../../ui/utils.js";
import toast from "react-hot-toast";
import {toastMessageCustom} from "../../../../infraestructure/data/toastMessage.js";
import {FaBackward, FaFileArchive, FaRemoveFormat, FaStop} from "react-icons/fa";
import {FaArrowDownUpAcrossLine, FaDeleteLeft, FaTornado} from "react-icons/fa6";
import OperationDeleteCustom from "./OperationDeleteCustom.jsx";
import {Tooltip} from "@nextui-org/react";
import OperationRedistribution from "./OperationRedistribution.jsx";



const   DraggableRow = ({ operation, index, handleDragStart, handleDragOver, handleDrop, operationsUpdate }) => {
  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);
  const [zonesOpersData, setZonesOpersData] = useRecoilState(zonesOpers); // Array con los detalles de cada selección
  const [selectedOperDetails, setSelectedOperDetails] = useRecoilState(checkOpersPosition); // Array con los detalles de cada selección
  const [showOrder, setShowOrder] = useRecoilState(showOrderObj);
  const [detailOperOpera, setDetailOperOpera] = useRecoilState(detailOperOperations);
  const [updateDrag, setUpdateDrag] = useRecoilState(updateDragOperation);

  const [balancing, setBalancing] = useRecoilState(balancingData);





  const handleDropUpdate = (index) => {
    const updatedList = handleDrop(index)
    handleList(updatedList)

  }


  const handleList = (updatedList) => {
    const data = {
      operations_balancings: {
        updated_list: JSON.stringify(updatedList),
        balancing_id: objBalancing.balancing_id,
        selected_oper_details: JSON.stringify(selectedOperDetails),
        gol_hour: balancing.gol_hour
      }
    }
    handleApi(data, updatedList)
  }
  const handleApi = (data, updatedList) => {
    const udateOperationsIndex = async (data, updatedList) => {
      try {
        const result = await postData(urlMain + "/operations_balancings/update_index", data)
        console.log(result.operations_balance)

        const detail = assignColorsToArray(result.details)

        setDetailOperOpera(detail)
        toast.success(toastMessageCustom.oper_drag)
        // console.log(detailOperOpera)


        console.log(objBalancing)

        setObjBalancing((prevState) => ({
          ...prevState, // Copia el objeto actual
          operations: updatedList, // Copia el array actual y agrega el nuevo elemento
        }));



      } catch (error) {
        console.error('Error setting data', error);
      }
    };

    udateOperationsIndex(data,updatedList);

  }
// f59e0b



  const handleDestribuye = (e, operation) => {
    e.preventDefault()
    console.log(operation)
  }



  return (
    <tr
      draggable
      onDragStart={() => handleDragStart(index)} // Inicio del drag
      onDragOver={(e) => handleDragOver(e)} // Permitir el drop
      onDrop={() => handleDropUpdate(index)} // Acción al soltar
      className="cursor-move bg-white hover:bg-gray-100 transition-all"
    >
      <td className="px-4 py-2 border border-gray-300 text-right">
        {operation.operation_position}
      </td>
      <td className="px-4 py-2 border border-gray-300 flex justify-start items-center">
        <OperationDeleteCustom
          operation={operation}
        />
        <OperationRedistribution
          operation={operation}
        />

        {operation.operation}
      </td>
      <td className="px-4 py-2 border border-gray-300">{operation.machine}</td>
      <td className="px-4 py-2 border border-gray-300">{operation.sam}</td>
    </tr>

  );
};

const OperationListCustom = ({ operations }) => {
  const [operationsUpdate, setOperationsUpdate] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null); // Para rastrear el elemento arrastrado


  const [isOpenConfirm,setIsOpenConfirm] = useState(false)

  const [objDelete,setObjDelete] = useState(false)

  useEffect(()=> {
    setOperationsUpdate(operations)
  }, [operations])




  const handleConfirmDeleteData = (operation, open) => {
    setIsOpenConfirm(open)
    setObjDelete(operation)
  }


  // Inicio del drag
  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  // Permitir el drop
  const handleDragOver = (e) => {
    e.preventDefault(); // Necesario para permitir el drop
  };

  // Manejar el drop
  const handleDrop = (index) => {
    if (draggedIndex === null) return;

    const updatedOperations = [...operationsUpdate];
    const [draggedItem] = updatedOperations.splice(draggedIndex, 1); // Elimina el elemento arrastrado
    updatedOperations.splice(index, 0, draggedItem); // Inserta en la nueva posición

    // Actualizar las posiciones en la lista
    const updatedWithPosition = updatedOperations.map((op, idx) => ({
      ...op,
      operation_position: idx + 1, // Actualiza las posiciones
    }));

    setOperationsUpdate(updatedWithPosition); // Actualiza el estado
    setDraggedIndex(null); // Limpia el índice arrastrado
    return updatedWithPosition
  };



  return (
      <div className="space-y-4  overflow-auto max-h-100">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="dark:bg-zinc-100 bg-zinc-700 sticky top-0 z-10">
          <tr>
            <th className="px-4 py-2 border text-left dark:text-zinc-700 text-zinc-100 flex justify-between items-center">
              <FaArrowDownUpAcrossLine/>
              <span>Posición</span>
            </th>
            <th className="px-4 py-2 border text-left dark:text-zinc-700 text-zinc-100">Operación</th>
            <th className="px-4 py-2 border text-left dark:text-zinc-700 text-zinc-100">Máquina</th>
            <th className="px-4 py-2 border text-left dark:text-zinc-700 text-zinc-100">Sam</th>

          </tr>
          </thead>
          <tbody className="rounded-md text-zinc-700  font-semibold !cursor-grabbing">
          {operationsUpdate.map((operationData, index) => (
            <DraggableRow
              key={index}
              operation={operationData}
              index={index}
              handleDragStart={handleDragStart}
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
              operationsUpdate={operationsUpdate}
            />
          ))}
          </tbody>
        </table>
      </div>
  );
};

export default OperationListCustom;
