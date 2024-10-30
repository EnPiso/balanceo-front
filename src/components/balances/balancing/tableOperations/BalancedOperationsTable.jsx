// components/BalancedOperationsTable.jsx
import React from 'react';
import { useRecoilState } from "recoil";
import {balancingData} from "../../../../infraestructure/states/states_balancing.js";
import {selectOpers} from "../../../../infraestructure/states/opers_states.js";
import {balanceOperations} from "../../../../infraestructure/utils/balanceOperations.js";
import TableHeaderOperations from "./TableHeaderOperations.jsx";
import TableRowOperations from "./TableRowOperations.jsx";
import TableFooterOperations from "./TableFooterOperations.jsx";
import OperatorDetailsOperations from "./OperatorDetailsOperations.jsx";

const BalancedOperationsTable = ({ data, samSum }) => {
  const [balancing] = useRecoilState(balancingData);
  const [opersSelect] = useRecoilState(selectOpers);

  const { zones, operationMap } = balanceOperations(data, opersSelect.size, balancing.gol_hour);

  return (
    <div className="space-y-8">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="dark:bg-zinc-100 bg-zinc-700">
          <TableHeaderOperations opersSelect={opersSelect} balancing={balancing} />
          </thead>
          <tbody>
          {data.map((item, i) => (
            <TableRowOperations
              key={i}
              item={item}
              opersSelect={opersSelect}
              balancing={balancing}
              operatorTimes={operationMap.get(item.operation) || new Map()}
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