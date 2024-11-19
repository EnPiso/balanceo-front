// components/BalancedOperationsTable.jsx
import React, {useEffect} from 'react';
import { useRecoilState } from "recoil";
import {balancingData} from "../../../../infraestructure/states/states_balancing.js";
import {selectOpers} from "../../../../infraestructure/states/opers_states.js";
import {balanceOperations} from "../../../../infraestructure/utils/balanceOperations.js";
import TableHeaderOperations from "./TableHeaderOperations.jsx";
import TableRowOperations from "./TableRowOperations.jsx";
import TableFooterOperations from "./TableFooterOperations.jsx";
import OperatorDetailsOperations from "./OperatorDetailsOperations.jsx";
import {allOperationsProduct} from "../../../../infraestructure/states/operation_states.js";
import {postData, updateData} from "../../../../infraestructure/call_api/crud.js";
import {urlMain} from "../../../../infraestructure/data/const.js";

const BalancedOperationsTable = ({ data, samSum }) => {
  const [balancing] = useRecoilState(balancingData);
  const [opersSelect] = useRecoilState(selectOpers);
  const [operationsProduct, setOperationsProduct] = useRecoilState(allOperationsProduct)




  const { zones, operationMap } = balanceOperations(operationsProduct, opersSelect.size, balancing.gol_hour);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index);
    e.target.classList.add('opacity-50');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    const sourceIndex = e.dataTransfer.getData('text/plain');
    const newItems = [...operationsProduct];

    // Swap items
    const temp = newItems[sourceIndex];
    newItems[sourceIndex] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    setOperationsProduct(newItems);

    const operationsBalancings = newItems.map((item, index) => ({
      id: item.id,
      position: index + 1 // Asumiendo que quieres indexar desde 1
    }));

    handleApi(operationsBalancings)
    e.target.classList.remove('opacity-50');
  };


  const handleApi = (operationsBalancings) => {

    const data = {
      operationsBalancing: {
        operations: JSON.stringify(operationsBalancings)
      }
    }
    const postDataOrder = async (data) => {
      try {
        const result = await updateData(urlMain + "/balancings/update_operations_balancing", data)
        console.log(result)
        console.log(operationsProduct)
        setOperationsProduct(result)
        // debugger

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
        <table className="min-w-full border-collapse border border-gray-200">
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
              className="cursor-move border-l-4 border-transparent hover:border-zinc-600 dark:hover:border-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-600 transition"
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
    </div>
  );
};

export default BalancedOperationsTable;