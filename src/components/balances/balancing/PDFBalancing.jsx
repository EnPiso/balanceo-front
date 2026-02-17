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
            <div className="bg-zinc-200 p-3 rounded-lg grid grid-cols-[1fr_2fr] gap-4">
              {/* Columna izquierda */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <img src="/icon/icon.jpeg" alt="Icono" className="w-16 h-16 object-contain" />
                  <div>
                    <h2 className="text-zinc-700 font-bold text-base uppercase">
                      {showOrder.order.code}
                    </h2>
                    <h3 className="text-zinc-600 font-semibold text-sm">
                      {objBalancing.product.name}
                    </h3>
                    <p className="text-zinc-500 text-xs">
                      {new Intl.DateTimeFormat("es-ES").format(
                        new Date(showOrder.order.created_at)
                      )}
                    </p>
                  </div>
                </div>

                <h3 className="font-bold text-zinc-700 mb-1">Operarios</h3>
                <div className="space-y-1">
                  {selectedOperDetails.map((oper, i) => (
                    <p key={i} className="text-xs text-zinc-600 font-semibold uppercase">
                      {oper.index} - <span className="bg-zinc-100">{oper.name}</span>
                    </p>
                  ))}
                </div>
              </div>

              {/* Columna derecha */}
              <div className="grid grid-cols-2 gap-2 content-start">
                <PdfBox item={{ title: "Minutos por hora", description: balancing.minutesHour }} />
                <PdfBox item={{ title: "Sam total", description: balancing.samSum }} />
                <PdfBox item={{ title: "Meta por hora", description: balancing.gol_hour }} />
                <PdfBox item={{ title: "Meta al día", description: balancing.gol_day }} />
              </div>
            </div>
          </>
        )
      }


    </div>
  )
}
export default PdfBalancing
