// components/SimpleTableFooterOperations.jsx
import React from 'react';

const SimpleTableFooterOperations = ({ samSum, opersSelect, balancing, zones }) => {
  return (
    <tr className="bg-zinc-300">
      <td colSpan="3" className="px-4 py-4 border border-gray-300 font-bold">
        Total
      </td>
      <td className="px-4 py-4 border border-gray-300 font-bold">
        {(samSum * 60).toFixed(0)}
      </td>
      
      {opersSelect.size >= 1 && balancing && (
        <>
          <td className="px-4 py-4 border border-gray-300 font-bold">
            {(samSum * balancing.gol_hour).toFixed(2)}
          </td>
          
          {zones.map((zone, index) => (
            <td key={`zone-${index}`} className="px-4 py-4 border border-gray-300">
              <div className="flex flex-col">
                <span className="font-bold">{zone.utilization}%</span>
                <span className="text-sm">{zone.operations.length} op.</span>
              </div>
            </td>
          ))}
        </>
      )}
    </tr>
  );
};

export default SimpleTableFooterOperations;