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
            }}>

            <div className="mb-2 mt-2 flex justify-between items-center bg-zinc-200 ">

                <div className="mt-2 mb-2">
                    <h1 className='text-4xl font-bold uppercase ml-2 mb-2'>
                          <span className="underline dark:text-zinc-300 text-zinc-700">
                            Balance
                          </span>
                        <span className="text-zinc-600 ml-1">
                            app
                          </span>
                    </h1>
                </div>

                {
                    tableUrl && (
                        <div className="ml-4 mr-4 mt-4 mb-3 uppercase  pt-2 pb-2">
                            <h2 className="text-zinc-600 font-bold text-xl">
                               <span>
                                 {tableUrl.order.code}
                               </span>

                            </h2>
                            <h3 className="text-zinc-600 font-black text-medium">
                                <span>
                                 {tableUrl.product.name}
                                </span>
                            </h3>
                            <p className="text-zinc-600 font-medium text-sm">
                               <span>
                                {new Intl.DateTimeFormat("es-ES").format(new Date(tableUrl.order.created_at))}
                               </span>
                            </p>
                        </div>
                    )
                }


        </div>


        <div>
            {
                tableUrl && <img className="w-full" src={tableUrl.product.balancing_img_url} alt=""/>
            }
            {
                tableUrl && <img className="w-full" src={tableUrl.order.image_url} alt=""/>
            }
        </div>

        </div>

</>
)
}

export default PdfBalancingImg;