import React, {} from 'react'
import {useRecoilState} from "recoil";
import {balancingData} from "../../../infraestructure/states/states_balancing.js";
import {checkOpersPosition, selectOpers} from "../../../infraestructure/states/opers_states.js";
import ItemBoxBalancing from "./sidebarForm/ItemBoxBalancing.jsx";
import PdfBox from "./PdfBox.jsx";
import {imageBalancePdf, orderObjBalancing, showOrderObj} from "../../../infraestructure/states/order_states.js";

const PdfBalancing = () => {
  const [balancing, setBalancing] = useRecoilState(balancingData);
  const [opersSelect, setOpersSelect] = useRecoilState(selectOpers)
  const [showOrder, setShowOrder] = useRecoilState(showOrderObj);
  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);
  const [selectedOperDetails, setSelectedOperDetails] = useRecoilState(checkOpersPosition); // Array con los detalles de cada selección
  const [imageUrl, setImageUrl] = useRecoilState(imageBalancePdf); // Estado para almacenar la URL de la imagen


  return (
    <div>

      {
        opersSelect.size >= 1 && balancing && (
          <>
            {/* Encabezado principal */}
            <div className="bg-primary_one px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src="/icon/icon.jpeg" alt="Logo" className="w-14 h-14 object-contain rounded" />
                <div>
                  <p className="text-primary_two text-xs font-bold uppercase tracking-widest">
                    Balanceo de Línea
                  </p>
                  <h2 className="text-white font-black text-lg uppercase leading-tight">
                    {objBalancing.product.name}
                  </h2>
                  {objBalancing.balancing?.user_name && (
                    <p className="text-secondary_two text-xs capitalize mt-0.5">
                      {objBalancing.balancing.user_name}
                    </p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-secondary_two font-black uppercase text-base tracking-wide">
                  {showOrder.order.code}
                </p>
                <p className="text-zinc-400 text-xs mt-0.5">
                  {new Intl.DateTimeFormat("es-ES").format(
                    new Date(showOrder.order.created_at)
                  )}
                </p>
              </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-4 divide-x divide-secondary_two bg-secondary_three">
              <PdfBox item={{ title: "Min / hora", description: balancing.minutesHour }} />
              <PdfBox item={{ title: "SAM total", description: parseFloat(balancing.samSum).toFixed(2) }} />
              <PdfBox item={{ title: "Meta / hora", description: balancing.gol_hour }} />
              <PdfBox item={{ title: "Meta / día", description: balancing.gol_day }} />
            </div>

            {/* Operarios */}
            <div className="bg-white px-6 py-3 border-b-2 border-secondary_two">
              <p className="text-xs font-bold uppercase text-primary_one tracking-widest mb-2">
                Operarios asignados
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-1">
                {selectedOperDetails.map((oper, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="bg-primary_one text-white text-xs font-black rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                      {oper.index}
                    </span>
                    <span className="text-xs font-semibold text-zinc-700 uppercase">{oper.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )
      }


    </div>
  )
}
export default PdfBalancing
