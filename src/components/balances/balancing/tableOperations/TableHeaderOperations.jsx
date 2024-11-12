// components/TableHeader.jsx
import {useRecoilState} from "recoil";
import {checkOpersPosition} from "../../../../infraestructure/states/opers_states.js";

const TableHeaderOperations = ({ opersSelect, balancing }) => {
  const [selectedOperDetails, setSelectedOperDetails] = useRecoilState(checkOpersPosition); // Array con los detalles de cada selección

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
                  className="px-4 py-2 border border-gray-300 text-left dark:text-zinc-700 text-zinc-100"
                >
                  {oper.name}
                </th>
              )
            })
          }

        </>
      )}
    </tr>
  )
}


export default TableHeaderOperations;