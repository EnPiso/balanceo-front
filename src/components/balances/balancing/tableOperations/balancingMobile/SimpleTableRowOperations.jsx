// components/SimpleTableRowOperations.jsx
import React from 'react';

const SimpleTableRowOperations = ({ item, opersSelect, balancing, operatorTimes }) => {
  const sam_seg = parseInt(item.sam * 60);
  
  // Sample polyvalence data for each operator
  const operatorPolyvalence = [
    { polyvalence: 95, color: "#e6f7ff", samplingsCount: 2 },
    { polyvalence: 87, color: "#ffccc7", samplingsCount: 1 }
  ];

  return (
    <tr
      className="hover:bg-zinc-200 transition"
      style={{
        background: item.is_repeat
          ? `linear-gradient(to right, ${item.color}, white)`
          : item.color,
        backgroundBlendMode: item.is_repeat ? "multiply" : "normal",
        border: item.is_repeat ? "1px double #71717a" : "",
      }}
    >
      <td className="px-4 py-4 border border-gray-300 flex justify-between items-center">
        <span className="flex justify-start items-center">
          <span className="mr-3">
            <span className="font-bold">
              {item.operation_position}
            </span>
          </span>
          {item.operation}
        </span>
        <div className="flex justify-end">
          <button className="p-1 bg-blue-100 rounded-full mr-1">
            <span role="img" aria-label="play">▶️</span>
          </button>
        </div>
      </td>
      <td className="px-4 py-4 border border-gray-300">{item.machine}</td>
      <td className={`px-4 py-2 border border-gray-300 ${item.is_sam_minutes && "font-bold"}`}>
        {item.sam.toFixed(2)}
      </td>
      <td className={`px-4 py-4 border border-gray-300 ${!item.is_sam_minutes && "font-bold"}`}>
        {sam_seg}
      </td>

      {opersSelect.size >= 1 && balancing && (
        <>
          <td className="px-4 py-4 border border-gray-300">
            {(item.sam * balancing.gol_hour).toFixed(2)}
          </td>
          
          {/* First operator cell */}
          <td
            className="px-4 py-4 border border-gray-300"
            style={{ backgroundColor: operatorTimes.get(0)?.toFixed(2) ? operatorPolyvalence[0].color : '' }}
          >
            {operatorTimes.get(0)?.toFixed(2) && (
              <div className="flex justify-around">
                <div>
                  <button className="p-1 bg-gray-200 rounded-full">
                    <span role="img" aria-label="clock">⏰</span>
                  </button>
                </div>
                <div>
                  {operatorTimes.get(0)?.toFixed(2) || ''}
                </div>
                <div>
                  <span className="px-2 py-1 bg-gray-200 rounded-full">
                    {operatorPolyvalence[0].polyvalence} %
                  </span>
                </div>
              </div>
            )}
          </td>
          
          {/* Second operator cell */}
          <td
            className="px-4 py-4 border border-gray-300"
            style={{ backgroundColor: operatorTimes.get(1)?.toFixed(2) ? operatorPolyvalence[1].color : '' }}
          >
            {operatorTimes.get(1)?.toFixed(2) && (
              <div className="flex justify-around">
                <div>
                  <button className="p-1 bg-gray-200 rounded-full">
                    <span role="img" aria-label="clock">⏰</span>
                  </button>
                </div>
                <div>
                  {operatorTimes.get(1)?.toFixed(2) || ''}
                </div>
                <div>
                  <span className="px-2 py-1 bg-gray-200 rounded-full">
                    {operatorPolyvalence[1].polyvalence} %
                  </span>
                </div>
              </div>
            )}
          </td>
        </>
      )}
    </tr>
  );
};

export default SimpleTableRowOperations;