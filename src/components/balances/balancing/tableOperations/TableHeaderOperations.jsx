// components/TableHeader.jsx
import {useRecoilState} from "recoil";
import {checkOpersPosition} from "../../../../infraestructure/states/opers_states.js";
import {isPDFGenerate, orderObjBalancing} from "../../../../infraestructure/states/order_states.js";
import { useEffect } from "react";
import { detailOperOperations } from "../../../../infraestructure/states/states_balancing.js";
import { Avatar } from "@nextui-org/react";
import { userAvatarImage } from "../../../../infraestructure/data/links.js";
import ImageThead from "./ImageThead.jsx";
import ButtonSamplesByOper from "./samplesByOper/ButtonSamplesByOper.jsx";

const TableHeaderOperations = ({ opersSelect, balancing }) => {
  const [selectedOperDetails, setSelectedOperDetails] = useRecoilState(checkOpersPosition); // Array con los detalles de cada selección
  const [isPDFMode, setIsPDFMode] = useRecoilState(isPDFGenerate);
  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);


  return(
    <tr>
      <th className="px-4 py-2 border border-gray-300 text-left dark:text-zinc-700 text-secondary_two">Operación</th>
      <th className="px-4 py-2 border border-gray-300 text-left dark:text-zinc-700 text-secondary_two">Máquina</th>
      <th className="px-4 py-2 border border-gray-300 text-left dark:text-zinc-700 text-secondary_two">Sam en min</th>
      <th className="px-4 py-2 border border-gray-300 text-left dark:text-zinc-700 text-secondary_two">Sam en seg</th>
      {opersSelect.size >= 1 && balancing && (
        <>
          <th className="px-4 py-2 border border-gray-300 text-left dark:text-zinc-700 text-secondary_two">
            Minutos necesarios
          </th>
          {
            selectedOperDetails.map((oper, i)=> {
              return(
                <th
                  key={`operator-${i}`}
                  className="px-4 py-2 border border-gray-300 text-left dark:text-zinc-700 text-secondary_two text-sm "
                >
                  <span className="flex justify-between items-center truncate">
                  

                    {isPDFMode && `${oper.index} - `}
                    <ButtonSamplesByOper oper={oper} objBalancing={objBalancing}/>
                    
                   
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