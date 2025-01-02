import {AiFillCheckCircle, AiFillStop} from "react-icons/ai";
import React, {useEffect, useState} from "react";
import {fetchGetData} from "../../../infraestructure/call_api/crud.js";
import {urlMain} from "../../../infraestructure/data/const.js";
import toast from "react-hot-toast";
import {toastMessageCustom} from "../../../infraestructure/data/toastMessage.js";
import {useRecoilState} from "recoil";
import {imageTableUrl} from "../../../infraestructure/states/states_product.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {orderObjBalancing, showOrderObj} from "../../../infraestructure/states/order_states.js";
import {nameImageDateNow} from "../../../infraestructure/utils/imagesFormat.js";
import {Spinner, Tooltip} from "@nextui-org/react";

const GenerateImgPdf = ({product, order, pdfDiv}) => {
    const [tableUrl, setTableUrl] = useRecoilState(imageTableUrl)
    const [showOrder, setShowOrder] = useRecoilState(showOrderObj);
    const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);

    const [isChange,setIsChange] = useState('')
    const [isLoading,setIsLoading] = useState(false)


    useEffect(() => {
        isChange && generatePDF()
    }, [isChange]);

    const handleProductImage = (product) => {
        setIsLoading(true)


        if(product && product.has_opers_balancing){

            const getData = async () => {
                try {
                    //setLoading(true);
                    const result = await fetchGetData(`${urlMain}/products/${product.id}/show_balancing_img/`);

                    const data = {
                        product: result,
                        order: order
                    }
                    setTableUrl(data)
                    setIsChange(nameImageDateNow)

                } catch (error) {
                    console.error('Error al obtener los datos:', error);

                } finally {

                }
            };

            getData();
        }

    }



    const generatePDF = async () => {
        const element = pdfDiv.current;

        if (!element) {
            console.error("El componente no está listo");
            return;
        }

        try {
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                onclone: (clonedDocument) => {
                    clonedDocument.head.innerHTML = document.head.innerHTML;
                },
            });

            const imgData = canvas.toDataURL("image/png");

            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

            // const name = objBalancing.product?.name || "producto";
            // const orderCode = showOrder?.order?.code || "orden";
            // const createdAt = showOrder?.order?.created_at || new Date().toISOString();
            // const createdDate = new Intl.DateTimeFormat("es-ES").format(new Date(createdAt));

            pdf.save(`balanceo.pdf`);
            setIsLoading(false)
            setIsChange("")
            setTableUrl(null)
        } catch (error) {
            console.error("Error al generar el PDF:", error);
        }
    };

    const toastMessage = () => {
        toast.error("Necesitas generar el balanceo para descargar el PDF")
    }


    return(
        <>
            {
                isLoading ? (
                    <span className="flex justify-between items-cente">
                        <Spinner/>
                    </span>
                ) : (
                    <>
                        {
                            order.products[0].has_opers_balancing ? (
                                <Tooltip placement="left-end" content={"Descargar PDF"}>
                                    <span
                                        onClick={() => handleProductImage(product)}
                                        key={product.id}
                                        className="flex justify-between items-center hover:bg-zinc-200 py-1 px-1 cursor-pointer uppercase">
                                        <span>
                                            {product.name}
                                            <span className="font-bold ml-2">
                                                {product.reference}
                                            </span>

                                    </span>
                                        <span>
                                          {product.has_opers_balancing ?
                                              (
                                                  <span className="flex justify-between items-center">
                                                    <span className="font-bold ml-2 mr-2">
                                                     <small> Total sam</small> {product.total_sam}
                                                    </span>
                                                    <AiFillCheckCircle color="green" size={20}/>
                                                  </span>
                                              ) :
                                              <AiFillStop color="red" size={20}/>}


                                        </span>
                                    </span>
                                </Tooltip>
                            ) : (
                                <span
                                    onClick={toastMessage}
                                    key={product.id}
                                    className="flex justify-between items-center hover:bg-zinc-200 py-1 px-1 ">
                                    <span>
                                        {product.name} <span className="font-bold">{product.reference}

                                    </span>
                                </span>
                                    <span>
                                      {product.has_opers_balancing ?
                                          <AiFillCheckCircle color="green" size={20}/> :
                                          <AiFillStop color="red" size={20}/>}

                                    </span>
                                </span>
                            )
                        }

                    </>
                )
            }


        </>
    )
}

export default GenerateImgPdf;