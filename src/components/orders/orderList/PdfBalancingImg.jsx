import {useRecoilState} from "recoil";
import {imageTableUrl} from "../../../infraestructure/states/states_product.js";
import {showOrderObj} from "../../../infraestructure/states/order_states.js";
import PdfBalancing from "../../balances/balancing/PDFBalancing.jsx";
import React from "react";

const PdfBalancingImg = ({pdfDiv}) => {

    const [tableUrl, setTableUrl] = useRecoilState(imageTableUrl)


    return(
        <>
        <div
            ref={pdfDiv}
            style={{
                position: "absolute",
                left: "-9999px",
                width: "900px",
            }}>

            {/* Encabezado principal */}
            <div className="bg-primary_one px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <img src="/icon/icon.jpeg" alt="Logo" className="w-14 h-14 object-contain rounded" />
                    <div>
                        <p className="text-primary_two text-xs font-bold uppercase tracking-widest">
                            Balanceo de Línea
                        </p>
                        {tableUrl && (
                            <h2 className="text-white font-black text-lg uppercase leading-tight">
                                {tableUrl.product.name}
                            </h2>
                        )}
                    </div>
                </div>
                {tableUrl && (
                    <div className="text-right">
                        <p className="text-secondary_two font-black uppercase text-base tracking-wide">
                            {tableUrl.order.code}
                        </p>
                        <p className="text-zinc-400 text-xs mt-0.5">
                            {new Intl.DateTimeFormat("es-ES").format(new Date(tableUrl.order.created_at))}
                        </p>
                    </div>
                )}
            </div>

            {/* Separador de sección */}
            <div className="bg-secondary_three h-1" />

            {/* Imágenes */}
            {tableUrl && (
                <div className="bg-white">
                    <div className="px-4 pt-4">
                        <p className="text-xs font-bold uppercase text-primary_one tracking-widest mb-2 border-b border-secondary_two pb-1">
                            Tabla de balanceo
                        </p>
                        <img className="w-full" src={tableUrl.product.balancing_img_url} alt="" />
                    </div>
                    <div className="px-4 pt-4 pb-4">
                        <p className="text-xs font-bold uppercase text-primary_one tracking-widest mb-2 border-b border-secondary_two pb-1">
                            Imagen de la orden
                        </p>
                        <img className="w-full" src={tableUrl.order.image_url} alt="" />
                    </div>
                </div>
            )}

            {/* Pie de página */}
            <div className="bg-primary_one px-6 py-2 flex justify-end">
                <p className="text-zinc-500 text-xs">
                    {new Intl.DateTimeFormat("es-ES", { dateStyle: "long" }).format(new Date())}
                </p>
            </div>

        </div>
</>
)
}

export default PdfBalancingImg;