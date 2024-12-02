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
import {FaBackward, FaRemoveFormat} from "react-icons/fa";
import CustomButton from "../../../../ui/CustomButton.jsx";
import {FaDeleteLeft, FaTornado} from "react-icons/fa6";
import CheckDeleteCustom from "./CheckDeleteCustom.jsx";
import {ConfirmOpen} from "../sidebarForm/ConfirmOpers.jsx";

const ITEM_TYPE = "operation"; // Tipo de elemento para DnD

const   DraggableRow = ({ operation, index, moveRow, handleConfirmDeleteData }) => {
  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);
  const [zonesOpersData, setZonesOpersData] = useRecoilState(zonesOpers); // Array con los detalles de cada selección
  const [selectedOperDetails, setSelectedOperDetails] = useRecoilState(checkOpersPosition); // Array con los detalles de cada selección
  const [showOrder, setShowOrder] = useRecoilState(showOrderObj);
  const [detailOperOpera, setDetailOperOpera] = useRecoilState(detailOperOperations);
  const [updateDrag, setUpdateDrag] = useRecoilState(updateDragOperation);

  const [isUpdate,setIsUpdate] = useState(false)

  const [balancing, setBalancing] = useRecoilState(balancingData);





  // Configuración del drag
  const [, dragRef] = useDrag({
    type: ITEM_TYPE,
    item: { index },
    canDrag: () => !isUpdate,
  });

  // Configuración del drop
  const [, dropRef] = useDrop({
    accept: ITEM_TYPE,
    canDrop: () => !isUpdate,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveRow(draggedItem.index, index);
        draggedItem.index = index; // Evita múltiples reordenamientos
      }

    },
    drop: (item, monitor) => {
      const draggedItem = monitor.getItem(); // Obtén el elemento arrastrado
      const updatedList = moveRow(draggedItem.index, index); // Obtén la lista actualizada

      const data = {
        operations_balancings: {
          updated_list: JSON.stringify(updatedList),
          balancing_id: objBalancing.balancing_id,
          selected_oper_details: JSON.stringify(selectedOperDetails),
          gol_hour: balancing.gol_hour
        }
      }
      debugger
      handleApi(data, updatedList)
    },
  });



  const handleApi = (data, updatedList) => {
    const udateOperationsIndex = async (data, updatedList) => {
      try {
        setIsUpdate(true)
        const result = await postData(urlMain + "/operations_balancings/update_index", data)
        console.log(result.operations_balance)
        debugger
        const detail = assignColorsToArray(result.details)

        setDetailOperOpera(detail)
        toast.success(toastMessageCustom.oper_drag)
        // console.log(detailOperOpera)


        console.log(objBalancing)

        setObjBalancing((prevState) => ({
          ...prevState, // Copia el objeto actual
          operations: updatedList, // Copia el array actual y agrega el nuevo elemento
        }));
        setIsUpdate(false)


      } catch (error) {
        console.error('Error setting data', error);
      }
    };

    udateOperationsIndex(data,updatedList);

  }

  return (
    <tr
      ref={(node) => dragRef(dropRef(node))} // Asigna las referencias de drag y drop
      className={`p-2 border border-gray-300 rounded-md text-zinc-700 transition-transform transform hover:scale-105 origin-center will-change-transform hover:bg-zinc-50 font-semibold ${
        isUpdate ? "opacity-50 cursor-not-allowed" : "cursor-grab"
      }`}    >
      <td className="px-4 py-2 border border-gray-300  text-right">{operation.operation_position}</td>
      <td className="px-4 py-2 border border-gray-300 ">{operation.operation}</td>
      <td className="px-4 py-2 border border-gray-300 ">{operation.machine}</td>
      <td className="px-4 py-2 border border-gray-300 ">{operation.sam}</td>
    </tr>

  );
};

const OperationListCustom = ({ operations }) => {
  const [operationsUpdate, setOperationsUpdate] = useState([]);

  const [isOpenConfirm,setIsOpenConfirm] = useState(false)

  const [objDelete,setObjDelete] = useState(false)

  useEffect(()=> {
    setOperationsUpdate(operations)
  }, [operations])


  // Función para mover filas
  const moveRow = (fromIndex, toIndex) => {
    const updatedOperations = [...operationsUpdate];
    const [movedItem] = updatedOperations.splice(fromIndex, 1); // Elimina el elemento arrastrado
    updatedOperations.splice(toIndex, 0, movedItem); // Inserta el elemento en la nueva posición

    // Actualiza la posición en cada operación
    const updatedWithPosition = updatedOperations.map((op, idx) => ({
      ...op,
      operation_position: idx + 1, // Actualiza `operation_position` basado en el nuevo índice
    }));

    setOperationsUpdate(updatedWithPosition); // Actualiza el estado
    return updatedWithPosition; // Devuelve la lista actualizada
  };

  const handleConfirmDeleteData = (operation, open) => {
    setIsOpenConfirm(open)
    setObjDelete(operation)
  }




  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-4 overflow-hidden">

        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="dark:bg-zinc-100 bg-zinc-700">
          <tr>
            <th className="px-4 py-2 border text-left dark:text-zinc-700 text-zinc-100">Posición</th>
            <th className="px-4 py-2 border text-left dark:text-zinc-700 text-zinc-100">Operación</th>
            <th className="px-4 py-2 border text-left dark:text-zinc-700 text-zinc-100">Máquina</th>
            <th className="px-4 py-2 border text-left dark:text-zinc-700 text-zinc-100">Sam</th>
          </tr>
          </thead>
          <tbody>
          {operationsUpdate.map((operationData, index) => (
            <DraggableRow
              key={index}
              operation={operationData}
              index={index}
              moveRow={moveRow}

            />
          ))}
          </tbody>
        </table>
      </div>
    </DndProvider>
  );
};

export default OperationListCustom;
