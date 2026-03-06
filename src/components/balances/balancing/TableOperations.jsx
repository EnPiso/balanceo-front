import React, { useMemo } from 'react';
import { useRecoilValue } from "recoil";
import { balancingData } from "../../../infraestructure/states/states_balancing.js";
import { selectOpers } from "../../../infraestructure/states/opers_states.js";

const BalancedOperationsTable = ({ data, samSum }) => {
  const balancing = useRecoilValue(balancingData);
  const opersSelect = useRecoilValue(selectOpers);

  // Función para balancear operaciones y crear un mapa de asignaciones
  const balanceOperations = (operations, numOperators) => {
    if (numOperators < 1) return { zones: [], operationMap: new Map() };

    const zones = Array.from({ length: numOperators }, () => []);
    const zonesMinutes = Array.from({ length: numOperators }, () => 0);
    // Mapa para guardar las asignaciones de tiempo por operación y operador
    const operationMap = new Map();

    operations.forEach((operation) => {
      let minutes = operation.sam * balancing.gol_hour;
      let currentOperator = 0;

      // Inicializar el mapa para esta operación
      const operatorTimes = new Map();

      while (minutes > 0 && currentOperator < numOperators) {
        if (zonesMinutes[currentOperator] + minutes <= 60) {
          zones[currentOperator].push({
            operation: operation.operation,
            machine: operation.machine,
            minutes: minutes.toFixed(2),
            sam: operation.sam
          });
          operatorTimes.set(currentOperator, parseFloat(minutes.toFixed(2)));
          zonesMinutes[currentOperator] += minutes;
          minutes = 0;
        } else {
          const remaining = 60 - zonesMinutes[currentOperator];
          if (remaining > 0) {
            zones[currentOperator].push({
              operation: operation.operation,
              machine: operation.machine,
              minutes: remaining.toFixed(2),
              sam: operation.sam
            });
            operatorTimes.set(currentOperator, parseFloat(remaining.toFixed(2)));
          }
          minutes -= remaining;
          zonesMinutes[currentOperator] = 60;
          currentOperator += 1;
        }
      }

      // Guardar las asignaciones de tiempo para esta operación
      operationMap.set(operation.operation, operatorTimes);
    });

    return {
      zones: zones.filter(zone => zone.length > 0),
      operationMap
    };
  };

  const { zones, operationMap } = useMemo(
    () => balanceOperations(data, opersSelect.size),
    [data, opersSelect.size, balancing.gol_hour]
  );

  return (
    <div className="space-y-8">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="dark:bg-zinc-100 bg-zinc-700">
          <tr>
            <th className="px-4 py-2 border border-gray-300 text-left dark:text-zinc-700 text-zinc-100">Operación</th>
            <th className="px-4 py-2 border border-gray-300 text-left dark:text-zinc-700 text-zinc-100">Máquina</th>
            <th className="px-4 py-2 border border-gray-300 text-left dark:text-zinc-700 text-zinc-100">Sam en min</th>
            <th className="px-4 py-2 border border-gray-300 text-left dark:text-zinc-700 text-zinc-100">Sam en seg</th>
            {opersSelect.size >= 1 && balancing && (
              <th className="px-4 py-2 border border-gray-300 text-left dark:text-zinc-700 text-zinc-100">
                Minutos necesarios
              </th>
            )}
            {/* Columnas dinámicas para operadores */}
            {opersSelect.size >= 1 && balancing &&
              Array.from({ length: opersSelect.size }, (_, i) => (
                <th
                  key={`operator-${i}`}
                  className="px-4 py-2 border border-gray-300 text-left dark:text-zinc-700 text-zinc-100"
                >
                  Operador {i + 1}
                </th>
              ))
            }
          </tr>
          </thead>
          <tbody>
          {data.map((item, i) => {
            const sam_seg = parseInt(item.sam * 60);
            const operatorTimes = operationMap.get(item.operation) || new Map();

            return (
              <tr key={i} className="hover:bg-zinc-50 dark:hover:bg-zinc-700">
                <td className="px-4 py-2 border border-gray-300">{item.operation}</td>
                <td className="px-4 py-2 border border-gray-300">{item.machine}</td>
                <td className="px-4 py-2 border border-gray-300">{item.sam}</td>
                <td className="px-4 py-2 border border-gray-300">{sam_seg}</td>
                {opersSelect.size >= 1 && balancing && (
                  <td className="px-4 py-2 border border-gray-300">
                    {(item.sam * balancing.gol_hour).toFixed(2)}
                  </td>
                )}
                {/* Celdas dinámicas para tiempos de operadores */}
                {opersSelect.size >= 1 && balancing &&
                  Array.from({ length: opersSelect.size }, (_, i) => (
                    <td
                      key={`operator-time-${i}`}
                      className="px-4 py-2 border border-gray-300"
                    >
                      {operatorTimes.get(i)?.toFixed(2) || '-'}
                    </td>
                  ))
                }
              </tr>
            );
          })}
          <tr>
            <td className="border border-gray-300"></td>
            <td className="border border-gray-300"></td>
            <td className="border border-gray-300 font-bold">
              <hr className="py-2" />
              {samSum}
            </td>
            <td className="border border-gray-300"></td>
            {opersSelect.size >= 1 && balancing && <td className="border border-gray-300"></td>}
            {/* Celdas de totales para operadores */}
            {opersSelect.size >= 1 && balancing &&
              Array.from({ length: opersSelect.size }, (_, i) => (
                <td key={`operator-total-${i}`} className="border border-gray-300 font-bold">
                  {zones[i]?.reduce((total, op) => total + parseFloat(op.minutes), 0).toFixed(2) || '0.00'}
                </td>
              ))
            }
          </tr>
          </tbody>
        </table>
      </div>

      {/* Sección de balanceo detallado por operador */}
      {opersSelect.size >= 1 && balancing && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold">Detalle de Balanceo por Operador</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {zones.map((zone, index) => (
              <div key={index} className="border rounded-lg p-4 bg-white dark:bg-zinc-800">
                <h3 className="text-lg font-medium mb-3">Operador {index + 1}</h3>
                <div className="space-y-2">
                  {zone.map((operation, opIndex) => (
                    <div key={opIndex} className="border-b pb-2">
                      <p className="font-medium">{operation.operation}</p>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <p>Máquina: {operation.machine}</p>
                        <p>Minutos: {operation.minutes}</p>
                      </div>
                    </div>
                  ))}
                  <p className="font-medium pt-2">
                    Total minutos: {zone.reduce((total, op) => total + parseFloat(op.minutes), 0).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BalancedOperationsTable;