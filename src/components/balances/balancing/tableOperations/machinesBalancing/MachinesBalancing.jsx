import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { allOperationsProduct } from "../../../../../infraestructure/states/operation_states";
import { balancingData } from "../../../../../infraestructure/states/states_balancing";
import { isPDFGenerate } from "../../../../../infraestructure/states/order_states";

const MachinesBalancing = () => {
  const [operationsProduct] = useRecoilState(allOperationsProduct);
  const [balancing] = useRecoilState(balancingData);

  const [useTimeMachines, setUseTimeMachines] = useState([]);

  const [isPDFMode, setIsPDFMode] = useRecoilState(isPDFGenerate);
  

  useEffect(() => {
    if (!operationsProduct || !balancing) return;

    const formatMachines = operationsProduct.map((operation) => ({
      machine: operation.machine_name,
      need_minutes: +(operation.sam * balancing.gol_hour).toFixed(2),
    }));

    const grouped = Object.values(
      formatMachines.reduce((acc, curr) => {
        if (!acc[curr.machine]) {
          acc[curr.machine] = { machine: curr.machine, total_minutes: 0 };
        }
        acc[curr.machine].total_minutes += curr.need_minutes;
        return acc;
      }, {})
    ).map((group) => ({
      machine: group.machine,
      total_minutes: +group.total_minutes.toFixed(2),
      required_machines: Math.ceil(group.total_minutes / 60),
    }));

    setUseTimeMachines(grouped);
  }, [operationsProduct, balancing]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-secondary_two">Máquinas necesarias</h2>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full border-collapse border border-gray-200  mt-2 text-left">
          <thead className="dark:bg-zinc-100 bg-zinc-700 text-secondary_two font-bold">
            <tr>
              <th className="px-4 py-2 text-sm">
                Máquina
              </th>
              <th className="px-4 py-2 text-sm">
                Minutos totales
              </th>
              <th className="px-4 py-2 text-sm">
                Máquinas totales
              </th>
            </tr>
          </thead>
          <tbody>
            {useTimeMachines.map((item, idx) => (
              <tr key={idx} className="bg-zinc-100">
                <td className="px-4 py-2  font-medium text-gray-800 border-1">
                  {item.machine}
                </td>
                <td className="px-4 py-2 text-gray-700 border-1">
                  {item.total_minutes}
                </td>
                <td className="px-4 py-2 border-1">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${

                      !isPDFMode && 
                        (item.required_machines > 2
                          ? "bg-red-100 text-red-500"
                          : item.required_machines > 1
                          ? "bg-red-100 text-red-500"
                          : "bg-green-100 text-secondary_two")
                    }`}
                  >
                    {item.required_machines}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MachinesBalancing;
