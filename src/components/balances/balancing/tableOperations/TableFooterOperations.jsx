// components/TableFooter.jsx
const TableFooterOperations = ({ samSum, opersSelect, balancing, zones }) => (
  <tr>
    <td className="border border-gray-300"></td>
    <td className="border border-gray-300"></td>
    <td className="border border-gray-300 font-bold">
      <hr className="py-2" />
      {samSum}
    </td>
    <td className="border border-gray-300"></td>
    {opersSelect.size >= 1 && balancing && (
      <>
        <td className="border border-gray-300"></td>
        {Array.from({ length: opersSelect.size }, (_, i) => (
          <td key={`operator-total-${i}`} className="border border-gray-300 font-bold">
            {zones[i]?.reduce((total, op) => total + parseFloat(op.minutes), 0).toFixed(2) || '0.00'}
          </td>
        ))}
      </>
    )}
  </tr>
);

export default TableFooterOperations;