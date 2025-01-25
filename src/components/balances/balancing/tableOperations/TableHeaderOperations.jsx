// components/TableHeader.jsx
import {useRecoilState} from "recoil";
import {checkOpersPosition} from "../../../../infraestructure/states/opers_states.js";
import {isPDFGenerate} from "../../../../infraestructure/states/order_states.js";

const TableHeaderOperations = ({ opersSelect, balancing }) => {
  const [selectedOperDetails, setSelectedOperDetails] = useRecoilState(checkOpersPosition); // Array con los detalles de cada selección
  const [isPDFMode, setIsPDFMode] = useRecoilState(isPDFGenerate);

  return(
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
          {
            selectedOperDetails.map((oper, i)=> {
              return(
                <th
                  key={`operator-${i}`}
                  className="px-4 py-2 border border-gray-300 text-left dark:text-zinc-700 text-zinc-100 text-sm"
                >
                  {isPDFMode && `${oper.index} - `} {oper.name} 
                </th>
              )
            })
          }

        </>
      )}
      {/*<th className="px-4 py-2 border border-gray-300 text-left dark:text-zinc-700 text-zinc-100">Polivalencia</th>*/}
    </tr>
  )
}


export default TableHeaderOperations;