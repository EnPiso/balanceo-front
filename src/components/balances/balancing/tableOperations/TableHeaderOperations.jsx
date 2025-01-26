// components/TableHeader.jsx
import {useRecoilState} from "recoil";
import {checkOpersPosition} from "../../../../infraestructure/states/opers_states.js";
import {isPDFGenerate} from "../../../../infraestructure/states/order_states.js";
import { useEffect } from "react";
import { detailOperOperations } from "../../../../infraestructure/states/states_balancing.js";
import { Avatar } from "@nextui-org/react";
import { userAvatarImage } from "../../../../infraestructure/data/links.js";
import ImageThead from "./ImageThead.jsx";

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
                  className="px-4 py-2 border border-gray-300 text-left dark:text-zinc-700 text-zinc-100 text-sm "
                >
                  <span className="flex justify-between items-center truncate">
                    {isPDFMode && `${oper.index} - `}
                    {oper.name}  
                   
                    <ImageThead image={oper.avatar ? oper.avatar : userAvatarImage} />
                  </span>
                 

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