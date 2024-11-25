// components/BalancedOperationsTable.jsx
import React, {useEffect, useState} from 'react';
import { useRecoilState } from "recoil";
import {balancingData, detailOperOperations} from "../../../../infraestructure/states/states_balancing.js";
import {checkOpersPosition, selectOpers} from "../../../../infraestructure/states/opers_states.js";
import {balanceOperations} from "../../../../infraestructure/utils/balanceOperations.js";
import TableHeaderOperations from "./TableHeaderOperations.jsx";
import TableRowOperations from "./TableRowOperations.jsx";
import TableFooterOperations from "./TableFooterOperations.jsx";
import OperatorDetailsOperations from "./OperatorDetailsOperations.jsx";
import {allOperationsProduct} from "../../../../infraestructure/states/operation_states.js";
import {postData, updateData} from "../../../../infraestructure/call_api/crud.js";
import {urlMain} from "../../../../infraestructure/data/const.js";
import SaveBalance from "../../../orders/show/SaveBalance.jsx";
import toast, { Toaster } from 'react-hot-toast';
import {toastMessageCustom} from "../../../../infraestructure/data/toastMessage.js";
import ModalVideoInput from "./videoOperations/ModalVideoInput.jsx";
import TrDinamycVideo from "./videoOperations/TrDinamycVideo.jsx";
import DraggableVideo from "./videoOperations/DraggableVideo.jsx";

const BalancedOperationsTable = ({ data, samSum }) => {
  const [balancing] = useRecoilState(balancingData);
  const [opersSelect] = useRecoilState(selectOpers);
  const [operationsProduct, setOperationsProduct] = useRecoilState(allOperationsProduct)

  const [detailOperOpera, setDetailOperOpera] = useRecoilState(detailOperOperations);


  const { zones, operationMap } = balanceOperations(operationsProduct, opersSelect.size, balancing.gol_hour);

  const [selectedOperDetails, setSelectedOperDetails] = useRecoilState(checkOpersPosition); // Array con los detalles de cada selección

  const [isModalInput,setIsModalInput] = useState(false)

  const [showVideos, setShowVideos]  = useState(null)


useEffect(()=> {
  //console.log(detailOperOpera)
  //debugger
},[detailOperOpera])

  const handleDragStart = (e, index) => {
    const draggedItem = operationsProduct[index]; // Obtén el objeto seleccionado
    e.dataTransfer.setData('application/json', JSON.stringify(draggedItem)); // Almacena como JSON
    e.target.classList.add('opacity-50'); // Indicador visual opcional

   // console.log("Objeto arrastrado en drag start:", draggedItem); // Depuración
  };


  const handleDragOver = (e) => {
    e.preventDefault();

  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();

    // Recupera el objeto arrastrado desde dataTransfer
    const draggedItem = JSON.parse(e.dataTransfer.getData('application/json'));
   //  console.log("Objeto arrastrado recibido en drop:", draggedItem);

    // Opcional: Intercambia elementos (si aplica a tu caso)
    const newItems = [...operationsProduct];
    const sourceIndex = newItems.findIndex((item) => item.id === draggedItem.id); // Encuentra el índice original
    if (sourceIndex !== -1) {
      const temp = newItems[sourceIndex];
      newItems[sourceIndex] = newItems[targetIndex];
      newItems[targetIndex] = temp;
    }

    // Actualiza el estado
    setOperationsProduct(newItems);

    const operationsBalancings = newItems.map((item, index) => ({
      id: item.id,
      position: index + 1, // Ajusta la posición
    }));

    console.log(draggedItem.operation_balancing_id, operationsBalancings);

    handleApi(operationsBalancings, draggedItem.operation_balancing_id, detailOperOpera);
  };




  const handleApi = (operationsBalancings, operation_balancing_id, detailOperOpera) => {

    const data = {
      operationsBalancing: {
        operations: JSON.stringify(operationsBalancings),
        operation_balancing_id: operation_balancing_id,
        opers_select: JSON.stringify(detailOperOpera)
      }
    }
    const postDataOrder = async (data) => {
      try {
        const result = await updateData(urlMain + "/balancings/update_operations_balancing", data)
       //  console.log(result)
        // console.log(operationsProduct)
        setOperationsProduct(result.sorted_operations)
        setDetailOperOpera(result.formatted_objects)

        //console.log(detailOperOpera)
        toast.success(toastMessageCustom.oper_drag)


      } catch (error) {
        console.error('Error setting data', error);
      }
    };

    postDataOrder(data);
  }


  const handleDragEnd = (e) => {
    e.target.classList.remove('opacity-50');

  };


  return (
    <div className="space-y-8">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200 table-hover-columns">
          <thead className="dark:bg-zinc-100 bg-zinc-700">
          <TableHeaderOperations opersSelect={opersSelect} balancing={balancing} />
          </thead>
          <tbody>
          {operationsProduct.map((item, i) => (
            <TableRowOperations
              key={i}
              draggable
              onDragStart={(e) => handleDragStart(e, i)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, i)}
              onDragEnd={handleDragEnd}
              item={item}
              opersSelect={opersSelect}
              balancing={balancing}
              operatorTimes={operationMap.get(item.operation) || new Map()}
              className={`cursor-move border-l-4 border-transparent hover:border-zinc-600 dark:hover:border-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-600 transition
                
              `}
              setIsModalInput={setIsModalInput}
              showVideos={showVideos}
              setShowVideos={setShowVideos}

            />
          ))}


          <TableFooterOperations
            samSum={samSum}
            opersSelect={opersSelect}
            balancing={balancing}
            zones={zones}
          />
          </tbody>
        </table>
        <SaveBalance/>
      </div>

      {opersSelect.size >= 1 && balancing && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold">Detalle de Balanceo por Operador</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {zones.map((zone, index) => (
              <OperatorDetailsOperations key={index} zone={zone} index={index} />
            ))}
          </div>
        </div>
      )}

   <ModalVideoInput
     isModalInput={isModalInput}
     setIsModalInput={setIsModalInput}
   />
      <DraggableVideo/>
    </div>
  );
};

export default BalancedOperationsTable;