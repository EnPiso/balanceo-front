// components/TableHeader.jsx
const TableHeaderOperations = ({ opersSelect, balancing }) => (
  <tr>
    <th className="px-4 py-2 border border-gray-300 text-left dark:text-zinc-700 text-zinc-100">Operación</th>
    <th className="px-4 py-2 border border-gray-300 text-left dark:text-zinc-700 text-zinc-100">Máquina</th>
    <th className="px-4 py-2 border border-gray-300 text-left dark:text-zinc-700 text-zinc-100">Sam en min</th>
    <th className="px-4 py-2 border border-gray-300 text-left dark:text-zinc-700 text-zinc-100">Sam en seg</th>
    {opersSelect.size >= 1 && balancing && (
      <>
        <th className="px-4 py-2 border border-gray-300 text-left dark:text-zinc-700 text-zinc-100">
          Minutos necesarios
        </th>
        {Array.from({ length: opersSelect.size }, (_, i) => (
          <th
            key={`operator-${i}`}
            className="px-4 py-2 border border-gray-300 text-left dark:text-zinc-700 text-zinc-100"
          >
            Operador {i + 1}
          </th>
        ))}
      </>
    )}
  </tr>
);


export default TableHeaderOperations;