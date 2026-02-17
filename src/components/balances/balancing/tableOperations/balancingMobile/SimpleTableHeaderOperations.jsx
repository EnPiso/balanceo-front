// components/SimpleTableHeaderOperations.jsx
import React from 'react';

const SimpleTableHeaderOperations = ({ opersSelect, balancing }) => {
  // Sample operator details
  const selectedOperDetails = [
    { id: 101, name: "Operador 1", index: 1, avatar: null },
    { id: 102, name: "Operador 2", index: 2, avatar: null }
  ];

  return (
    <tr>
      <th className="px-4 py-2 border border-gray-300 text-left text-zinc-100">Operación</th>
      <th className="px-4 py-2 border border-gray-300 text-left text-zinc-100">Máquina</th>
      <th className="px-4 py-2 border border-gray-300 text-left text-zinc-100">Sam en min</th>
      <th className="px-4 py-2 border border-gray-300 text-left text-zinc-100">Sam en seg</th>
      {opersSelect.size >= 1 && balancing && (
        <>
          <th className="px-4 py-2 border border-gray-300 text-left text-zinc-100">
            Minutos necesarios
          </th>
          {selectedOperDetails.map((oper, i) => (
            <th
              key={`operator-${i}`}
              className="px-4 py-2 border border-gray-300 text-left text-zinc-100 text-sm"
            >
              <span className="flex justify-between items-center truncate">
                {`${oper.index} - ${oper.name}`}
                <div className="w-8 h-8 rounded-full bg-gray-400"></div>
              </span>
            </th>
          ))}
        </>
      )}
    </tr>
  );
};

export default SimpleTableHeaderOperations;