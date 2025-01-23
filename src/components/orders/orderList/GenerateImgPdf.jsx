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
import { PDFDocument } from "pdf-lib";
import {FaFilePdf} from "react-icons/fa6";
import { FaQuestion } from "react-icons/fa";


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
            // Optimización de la captura
            const canvas = await html2canvas(element, {
                scale: 1, // Reducido de 1.5 a 1
                useCORS: true,
                allowTaint: true,
                imageTimeout: 0,
                // Reduce calidad de imágenes
                backgroundColor: null,
                logging: false,
            });

            // Comprime la imagen antes de agregarla al PDF
            const imgData = canvas.toDataURL("image/jpeg", 0.5); // Cambiado a JPEG con menor calidad

            // Crear PDF con compresión
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4",
                compress: true
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            // Agregar imagen con compresión
            pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');

            // Optimización adicional con pdf-lib
            const pdfBytes = pdf.output("arraybuffer");
            const pdfDoc = await PDFDocument.load(pdfBytes);

            const compressedPdfBytes = await pdfDoc.save({
                useObjectStreams: true,
                addDefaultPage: false,
                preserveCollectedStreams: true,
                removeUnusedObjects: true
            });

            // Descargar PDF optimizado
            const blob = new Blob([compressedPdfBytes], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "balanceo_optimizado.pdf";
            link.click();

            // Limpieza
            URL.revokeObjectURL(url);
            setIsLoading(false);
            setIsChange("");
            setTableUrl(null);
        } catch (error) {
            console.error("Error al generar el PDF:", error);
        }
    };


    const toastMessage = () => {
        toast.error("Necesitas generar el balanceo para descargar el PDF")
    }

    const category_product_name =  product.category_product_name == "null" ? "" : product.category_product_name.toUpperCase();



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
                           product.has_opers_balancing ? (
                                <Tooltip placement="left-end" content={`Descargar PDF ${category_product_name}`}>
                                    <span
                                        onClick={() => handleProductImage(product)}
                                        key={product.id}
                                        className="flex justify-between items-center hover:bg-zinc-200 py-1 px-1 cursor-pointer uppercase">

                                        <span>
                                            <span>{product.name}</span>
                                            <span className="font-bold ml-2">
                                            <span className={`ml-2  text-small lowercase`}>
                                                 {product.reference === "null" ? 'Referencia' : product.reference}
                                            </span>
                                                
                                                 <span className={`ml-2  text-small lowercase ${category_product_name === "" ? 'text-red-500' : 'text-green-700'}`}> 
                                                     { category_product_name == "" ? "Categoría" : category_product_name } 
                                                 </span>
                                                {/** product.category_product_name **/}
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
                                                      <FaFilePdf color="green" size={17} className={"ml-2"}/>
                                                  </span>
                                              ) :
                                              <>
                                                  <AiFillStop color="red" size={20}/>
                                              </>
                                          }


                                        </span>
                                    </span>
                                </Tooltip>
                            ) : (
                                <Tooltip placement="left-end" content={`${category_product_name}`}>
                                  <span
                                      onClick={toastMessage}
                                      key={product.id}
                                      className="flex justify-between items-center hover:bg-zinc-200 py-1 px-1 ">
                                    <span>
                                        {product.name} <span className="font-bold">
                                        <span className={`ml-2  text-small lowercase`}>
                                                 {product.reference === "null" ? 'Referencia' : product.reference}
                                        </span>
                                           
                                    </span>
                                    <span className={`ml-2  text-small lowercase ${category_product_name === "" ? 'text-red-500' : 'text-green-700'}`}>  { category_product_name == "" ? "Categoría" : category_product_name }</span>
                                </span>
                                    <span>
                                      {product.has_opers_balancing ?
                                          <AiFillCheckCircle color="green" size={20}/> :
                                          <AiFillStop color="red" size={20}/>}

                                    </span>
                                </span>
                                </Tooltip>

                            )
                        }

                    </>
                )
            }


        </>
    )
}

export default GenerateImgPdf;