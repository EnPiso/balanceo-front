import React from 'react';

const TableRowOperations = ({
    item,
    opersSelect,
    balancing,
    operatorTimes,
    draggable = false,
    onDragStart,
    onDragOver,
    onDrop,
    onDragEnd,
    className = ''
}) => {
  const sam_seg = parseInt(item.sam * 60);

  return (
    <tr
      draggable={draggable}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
      className={`hover:bg-zinc-50 dark:hover:bg-zinc-700 ${className}`}
    >
      <td className="px-4 py-2 border border-gray-300">{item.operation}</td>
      <td className="px-4 py-2 border border-gray-300">{item.machine}</td>
      <td className="px-4 py-2 border border-gray-300">{item.sam}</td>
      <td className="px-4 py-2 border border-gray-300">{sam_seg}</td>
      {opersSelect.size >= 1 && balancing && (
        <>
          <td className="px-4 py-2 border border-gray-300">
            {(item.sam * balancing.gol_hour).toFixed(2)}
          </td>
          {Array.from({ length: opersSelect.size }, (_, i) => (
            <td
              key={`operator-time-${i}`}
              className="px-4 py-2 border border-gray-300"
            >
              {operatorTimes.get(i)?.toFixed(2) || '-'}
            </td>
          ))}
        </>
      )}
    </tr>
  );
};

export default TableRowOperations;