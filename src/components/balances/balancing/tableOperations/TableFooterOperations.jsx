// components/TableFooter.jsx
const TableFooterOperations = ({ samSum, opersSelect, balancing, zones }) => (
  <tr className="border border-zinc-50">
    <td>
       <p className="text-left">
            <span className="font-bold ml-4">
                Total
            </span>
       </p>
    </td>
    <td></td>
    <td className="font-bold bg-zinc-200 dark:bg-zinc-600 pl-4 py-2 ">
      {samSum}
    </td>
    <td className=""></td>
    {opersSelect.size >= 1 && balancing && (
      <>
        <td className=""></td>
        {Array.from({ length: opersSelect.size }, (_, i) => (
          <td key={`operator-total-${i}`} className="font-bold bg-zinc-200 dark:bg-zinc-600 pl-4 py-2">
              {Math.round(zones[i]?.reduce((total, op) => total + parseFloat(op.minutes), 0) || 0)}

          </td>
        ))}
      </>
    )}
  </tr>
);

export default TableFooterOperations;