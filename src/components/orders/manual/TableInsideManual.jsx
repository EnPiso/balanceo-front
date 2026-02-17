import React from 'react'

const TableInsideManual = ({product}) => {
  return (
    <table className="min-w-full border border-gray-300 dark:border-gray-600 mt-2">
      <thead className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
        <tr>
          <th className="px-4 py-2 border text-left border-gray-300 dark:border-gray-600">
            Operación
          </th>
          <th className="px-4 py-2 border text-left border-gray-300 dark:border-gray-600">
            Máquina
          </th>
          <th className="px-4 py-2 border text-left border-gray-300 dark:border-gray-600">
            Sam
          </th>
        </tr>
      </thead>
      <tbody>
        {product.operations.map((operation, j) => (
          <tr
            key={j}
            className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-800 dark:even:bg-gray-900"
          >
            <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
              {operation.operation}
            </td>
            <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
              {operation.machine }
            </td>
            <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
              {operation.sam }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TableInsideManual