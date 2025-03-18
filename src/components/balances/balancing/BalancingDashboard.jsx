import React, {useEffect, useRef, useState} from 'react'
import TitleDashboard from "../../../ui/TitleDashboard.jsx";
import useOpers from "../../../hooks/balances/opers/useOpers.jsx";
import {ListOpers} from "../opers/ListOpers.jsx";
import ListBalancing from "./ListBalancing.jsx";
import {useRecoilState} from "recoil";
import {imageTableBalancing, imageTableUrl, isScreenShotImg, selectProduct} from "../../../infraestructure/states/states_product.js";
import {
  imageBalancePdf,
  isPDFGenerate,
  orderObjBalancing,
  showOrderObj
} from "../../../infraestructure/states/order_states.js";
import InfoBoxBalancing from "./sidebarForm/InfoBoxBalancing.jsx";
import useModal from "./sidebarForm/useModal.jsx";
import {checkOpersPosition, selectOpers} from "../../../infraestructure/states/opers_states.js";
import {fetchGetData, updateData} from "../../../infraestructure/call_api/crud.js";
import {urlMain} from "../../../infraestructure/data/const.js";
import ButtonNavigationVideos from "./tableOperations/videoOperations/ButtonNavigationVideos.jsx";
import {listVideosOperations, listVideosOpers} from "../../../infraestructure/states/states_videos.js";
import ModalCustomProduct from "./customProduct/ModalCustomProduct.jsx";
import ImageLightbox from "../../orders/import/ImageLightBox.jsx";
import {FaFilePdf} from "react-icons/fa6";
import {Button, Spinner, Tooltip} from "@nextui-org/react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {FaBackward, FaCircleNotch, FaTruckLoading} from "react-icons/fa";
import ScreenshotComponent from "./ScreenshotComponent.jsx";
import {toPng} from "html-to-image";
import * as htmlToImage from "html-to-image";
import toast from "react-hot-toast";
import {toastMessageCustom} from "../../../infraestructure/data/toastMessage.js";

import { PDFDocument } from "pdf-lib";
import MyCustomButton from '../../../ui/MyCustomButton.jsx';

export const BalancingDashboard = ({backward}) => {

  const iconRef = useRef();

  const componentPDF = useRef();
  const imagePdfRef = useRef();


  const [isPDFMode, setIsPDFMode] = useRecoilState(isPDFGenerate);



  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);

  const [, setSelectedOperDetails] = useRecoilState(checkOpersPosition); // No necesitas el valor actual aquí, solo el setter
  const [, setOpersSelect] = useRecoilState(selectOpers);

  const [isLoadPDF, setIsLoadPDF] = useState(false);

  const [showOrder, setShowOrder] = useRecoilState(showOrderObj);

  const [imageBlob, setImageBlob] = useState(null); // Estado para almacenar la imagen como Blob
  const [imageUrl, setImageUrl] = useRecoilState(imageBalancePdf); // Estado para almacenar la URL de la imagen

  const [imageTable, setImageTable] = useRecoilState(imageTableBalancing)

  const [tableUrl, setTableUrl] = useRecoilState(imageTableUrl)

  const [isScreenShot, setIsScreenShot] = useRecoilState(isScreenShotImg)
  


  useEffect(() => {


    const product_id = objBalancing.product?.id; // Usa `?.` en caso de que `product` esté inicialmente indefinite

    if (product_id) {
      const getData = async () => {
        try {
          const result = await fetchGetData(`${urlMain}/opers_balancings?product_id=${product_id}`);

          if (result && Array.isArray(result)) {
            // Extrae los IDs y detalles de los operarios desde la respuesta
            const operDetails = result.map((operBalancing, index) => ({
              id: operBalancing.oper.id,
              name: operBalancing.oper.name,
              index: index + 1, // Define la posición como el índice en la lista
              avatar: operBalancing.oper.avatar
            }));
            setSelectedOperDetails(operDetails);
          

            const operIds = new Set(result.map(operBalancing => operBalancing.oper.id));
            setOpersSelect(operIds); // Asegura que opersSelect esté actualizado

          } else {
            console.warn("No se encontraron datos de operarios.");
          }
        } catch (error) {
          console.error('Error al obtener los datos:', error);
        }
      };

      getData();

    }

  }, []); // Dependencias vacías para que se ejecute solo una vez al montar

  const generatePDF = async () => {
    setIsLoadPDF(true);
    const element = componentPDF.current;

    const canvas = await html2canvas(element, {
  
      scale: 1,
      useCORS: true, // Habilitar uso de CORS
      allowTaint: false, // Evitar tainting para imágenes externas
      imageTimeout: 15000, // Aumentar tiempo de espera para cargar imágenes
      backgroundColor: null, // Fondo transparente
      logging: true, // Para depurar si hay errores
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.5);

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');

    const name = objBalancing.product.name;
    const order = showOrder.order.code;
    const created = new Intl.DateTimeFormat("es-ES").format(
      new Date(showOrder.order.created_at)
    );

    pdf.save(`${order}_${name}_${created}.pdf`);
    setIsPDFMode(false);
    setIsLoadPDF(false);
    setImageUrl('');
  };

  useEffect(() => {
    isPDFMode && generatePDF()

    handleUpload()
  }, [isPDFMode]);


  useEffect(()=> {

    isScreenShot && handleScreenshot()

  }, [isScreenShot])

  const handleScreenshot = async () => {


    if (imagePdfRef.current) {
      try {
        const blob = await htmlToImage.toBlob(imagePdfRef.current, {
          useCORS: true,
          cacheBust: true,
        }); // Captura el contenido como Blob
        setImageBlob(blob); // Almacena el Blob en el estado
        const url = URL.createObjectURL(blob); // Genera una URL temporal
        setIsPDFMode(true)
        setImageUrl(url); // Almacena la URL para previsualización
        setTimeout(()=> {
          setIsScreenShot(false)
        }, 400)
      } catch (error) {
        console.error("Error al capturar el componente:", error);
      } 
    }
  };


  const handleUpload =  () => {
    if (imageBlob) {
      const formData = new FormData();
      formData.append("file", imageBlob, "screenshot.png");
      console.log(formData)


    }
  };

  const handleImageTable = async () => {

    if (imagePdfRef.current) {
      try {
        const blob = await htmlToImage.toBlob(imagePdfRef.current, {
          useCORS: true,
          cacheBust: true,
        }); // Captura el contenido como Blob
        // console.log(blob); // Almacena el Blob en el estado
        if(blob){

          fetchUpdateImageTable(blob)

        }
      } catch (error) {
        console.error("Error al capturar el componente:", error);
      }
    }
  };

  const fetchUpdateImageTable = (blob) => {
    const productId = objBalancing.product.id

    const formData = new FormData();
    formData.append('product[balancing_img]', blob); // Nota la estructura "product[...]"
    formData.append('product[product_id]', productId);

    const updatePlant = async () => {
      try {
        const result = await updateData(urlMain + `/products/${productId}`, formData)
        console.log(result)

        // guardar imagen de la tabla del balanceo en product
      } catch (error) {
        console.error('Error setting data', error);
      }
    };

    updatePlant()

  }

  useEffect(() => {
    imageTable && handleImageTable()

  }, [imageTable]);



  return (
      <>
        <div className="ml-2">
          <div className="pr-6 pb-2 flex justify-end fixed bottom-0 w-full z-50 left-1">
            <MyCustomButton
              icon={<FaBackward className=" mt-1 mr-3 "/>}
              title={ "Regresar a " + showOrder.order.code} 
              handleClick={backward}
              value={"Regresar a " + showOrder.order.code} 
              bgButton={"bg-zinc-800"}
              textButton={"text-secondary_two"}
            />
              
          </div>
          <div className="flex justify-start">
            <div className="hidden lg:block">
              <ModalCustomProduct />
            </div>
            <div>
              {
              objBalancing && (
                <>
                <div className="hidden lg:block">
                  {
                      isLoadPDF ? (

                          <Button
                            className="ml-5 font-bold uppercase">
                            Generando PDF
                            <span className="transform transition-transform duration-500 rotate ">
                              <FaCircleNotch className='text-secondary_two'/>
                            </span>

                          </Button>

                      ) : (
                        <>


                          <Tooltip content="Descargar PDF" placement="right">
                            <Button
                              className="ml-5 font-bold uppercase"
                              onPress={()=> {
                                setIsScreenShot(true)
                              
                              }}>
                              descargar 
                              <FaFilePdf className='text-secondary_two'/>
                            </Button>
                          </Tooltip>

                        </>
                      )
                    }

                </div>
          
                </>
              )
            }
            </div>
          </div>
          

         
            

         

          {
             objBalancing && 
                <ListBalancing
                  componentPDF={componentPDF}
                  imagePdfRef={imagePdfRef}
                  key={JSON.stringify(objBalancing)}
                />
          }
        </div>
       

      </>
  )
}
