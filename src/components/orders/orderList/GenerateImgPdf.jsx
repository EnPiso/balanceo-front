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
import {Badge, Spinner, Tooltip} from "@nextui-org/react";
import { PDFDocument } from "pdf-lib";
import {FaClockRotateLeft, FaFilePdf} from "react-icons/fa6";
import { FaClock, FaQuestion } from "react-icons/fa";
import SamplesCountProduct from "./SamplesCountProduct.jsx";


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

    let total_sam = product.total_sam
    total_sam = parseFloat(total_sam)
    total_sam = total_sam.toFixed(2);

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
                                
                                    <span
                                        key={product.id}
                                        className="flex justify-between items-center hover:bg-zinc-200 py-1 px-1 cursor-pointer uppercase">
                                        <Tooltip 
                                            placement="left-end" 
                                            content={`Descargar PDF 
                                                ${category_product_name ? category_product_name : product.name}`}>
                                            <span
                                                onClick={() => handleProductImage(product)}>
                                                <span>{product.name}</span>
                                                <span className="font-bold ml-2">
                                                <span className={`ml-2  text-small lowercase`}>
                                                    {product.reference === "null" ? 'Referencia' : product.reference}
                                                </span>
                                                    
                                                    <span className={`ml-2  text-small lowercase ${category_product_name === "" ? '' : 'text-secondary_two'}`}> 
                                                        { category_product_name == "" ? "" : category_product_name } 
                                                    </span>
                                                   
                                                    {
                                                        product.has_opers_balancing &&
                                                            <small className={`ml-2 text-small capitalize font-light text-secondary_two`}> 
                                                                { product.plant_module_name } 
                                                            </small>
                                                       
                                                    } 
                                                </span>
                                            </span>
                                        </Tooltip>    
                                        

                                        <span>
                                          {product.has_opers_balancing ?
                                              (
                                                  <span className="flex justify-between items-center">
                                                    
                                                    <SamplesCountProduct
                                                        value={product.samplings_cycles_count}
                                                        style={"red"}  
                                                        tooltip={"Ciclos del producto"}  
                                                    />
                                                    <SamplesCountProduct
                                                        value={product.time_cycle_oper_count}
                                                        style={"blue"}   
                                                        tooltip={"Zona secuencial"}   
                                                    />

                                                    <SamplesCountProduct
                                                        value={product.opers_zones_count}
                                                        style={"yellow"}
                                                        tooltip={"Tiempos por zona"}    
                                                    />
                                                    <SamplesCountProduct
                                                        value={product.samplings_count}
                                                        style={"green"}
                                                        tooltip={"Secuencial operaciones"}    
                                                    />
                                                   
                                                    <span 
                                                         onClick={() => handleProductImage(product)}
                                                        className="font-bold ml-4 mr-2">
                                                        <small> Total sam</small> {total_sam}
                                                    </span>
                                                    <span
                                                         onClick={() => handleProductImage(product)}
                                                    >
                                                        <AiFillCheckCircle className="text-secondary_two" size={20}/>
                                                    </span>
                                                    <span
                                                         onClick={() => handleProductImage(product)}
                                                    >
                                                        <FaFilePdf  size={17} className={"ml-2 text-secondary_two"}/>
                                                    </span>
                                                        
                                                        
                                                  </span>
                                              ) :
                                              <>
                                                  <AiFillStop color="red" size={20}/>
                                              </>
                                          }


                                        </span>
                                    </span>
                            ) : (
                                <span
                                      onClick={toastMessage}
                                      key={product.id}
                                      className="flex justify-between items-center text-zinc-400 hover:bg-zinc-200 py-1 px-1 ">
                                    <span>
                                        {product.name} <span className="font-bold">
                                        <span className={`ml-2  text-small lowercase`}>
                                                 {product.reference === "null" ? 'Referencia' : product.reference}
                                        </span>
                                           
                                    </span>
                                    <span className={`ml-2  text-small lowercase `}>  { category_product_name == "" ? "" : category_product_name }</span>
                                </span>
                                    <span>
                                      {product.has_opers_balancing ?
                                          <AiFillCheckCircle className="text-secondary_two" size={20}/> :
                                          <AiFillStop className="text-zinc-400" size={20}/>}

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