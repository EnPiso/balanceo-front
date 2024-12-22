import React, {} from 'react'
import {useRecoilState} from "recoil";
import {balancingData} from "../../../infraestructure/states/states_balancing.js";
import {checkOpersPosition, selectOpers} from "../../../infraestructure/states/opers_states.js";
import ItemBoxBalancing from "./sidebarForm/ItemBoxBalancing.jsx";
import PdfBox from "./PdfBox.jsx";
import {orderObjBalancing, showOrderObj} from "../../../infraestructure/states/order_states.js";

const PdfBalancing = () => {
  const [balancing, setBalancing] = useRecoilState(balancingData);
  const [opersSelect, setOpersSelect] = useRecoilState(selectOpers)
  const [showOrder, setShowOrder] = useRecoilState(showOrderObj);
  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);
  const [selectedOperDetails, setSelectedOperDetails] = useRecoilState(checkOpersPosition); // Array con los detalles de cada selección


  return (
    <div className="py-2 px-2">

      {
        opersSelect.size >= 1 && balancing && (
          <>
              <div className="mb-2 mt-2 flex justify-between items-center bg-zinc-200 drop-shadow-2xl">

                  <div className="mt-2 mb-2">
                    <h1 className='text-4xl font-bold uppercase ml-2 mb-2'>
                      <span className="underline dark:text-zinc-300 text-zinc-700">
                        Balance
                      </span>
                      <span className="text-zinc-600 ml-1">
                        app
                      </span>
                    </h1>

                   <div className="ml-4 mt-4 mb-3 uppercase  pt-2 pb-2">
                     <h2 className="text-zinc-600 font-bold text-xl">
                       <span>
                         {showOrder.order.code}
                       </span>

                     </h2>
                     <h3 className="text-zinc-600 font-black text-medium">
                        <span>
                         {objBalancing.product.name}
                        </span>
                     </h3>
                     <p className="text-zinc-600 font-medium text-sm">
                       <span>
                        {new Intl.DateTimeFormat("es-ES").format(new Date(showOrder.order.created_at))}
                       </span>
                     </p>
                   </div>
                  </div>

                 <div className="mt-2 mb-4">
                     <PdfBox
                       item={{
                         title: "Minutos disponibles x hora",
                         description: balancing.minutesHour,
                       }}
                     />
                     <PdfBox
                       item={{
                         title: "Sam total",
                         description: balancing.samSum,
                       }}
                     />
                     <PdfBox
                       item={{
                         title: "Meta por hora",
                         description: balancing.gol_hour,
                       }}
                     />
                     <PdfBox
                       item={{
                         title: "Meta al día ",
                         description: balancing.gol_day,
                       }}
                     />

                     <div>
                       <h3 className="font-bold text-zinc-700">Operarios</h3>
                       <div className="ml-2 mt-2">
                         {
                           selectedOperDetails.map((oper, i)=> {
                             return(
                               <div key={i} className="mt-1">
                                 <p className="font-bold uppercase text-sm text-zinc-600" >
                                   {oper.index} -
                                 <span className="bg-zinc-100">
                                    {oper.name}
                                 </span>
                                 </p>
                               </div>

                             )
                           })
                         }
                       </div>
                     </div>

                 </div>
            </div>
          </>
        )
      }

    </div>
  )
}
export default PdfBalancing
