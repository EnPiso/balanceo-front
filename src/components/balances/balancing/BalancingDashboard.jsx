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
import {FaBackward, FaBook, FaCircleNotch, FaClone, FaCrown, FaTruckLoading} from "react-icons/fa";
import ScreenshotComponent from "./ScreenshotComponent.jsx";
import {toPng} from "html-to-image";
import * as htmlToImage from "html-to-image";
import toast from "react-hot-toast";
import {toastMessageCustom} from "../../../infraestructure/data/toastMessage.js";

import { PDFDocument } from "pdf-lib";
import MyCustomButton from '../../../ui/MyCustomButton.jsx';
import { clockGlobalModal, clockZoneByZoneModal } from '../../../infraestructure/states/states_mobile.js';
import SamplesGlobalModal from './tableOperations/samplesByOper/SamplesGlobalModal.jsx';
import { isShowModalZoneSample } from '../../../infraestructure/states/states_samples_zones.js';
import SamplesZonesModal from './tableOperations/samplesZones/SamplesZonesModal.jsx';
import ZonesByZoneModal from './tableOperations/balancingMobile/clockZonesByZone/ZonesByZoneModal.jsx';
import CloneBalancingDashboard from './cloneBalancings/CloneBalancingDashboard.jsx';
import { BalancingSideBar } from './BalancingSideBar.jsx';
import { currentUser } from '../../../infraestructure/states/states_views.js';
import { allOperationsProduct } from '../../../infraestructure/states/operation_states.js';

export const BalancingDashboard = ({backward}) => {

  const iconRef = useRef();

  const componentPDF = useRef();
  const imagePdfRef = useRef();

  const [isPDFMode, setIsPDFMode] = useRecoilState(isPDFGenerate);
  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);
  const [, setSelectedOperDetails] = useRecoilState(checkOpersPosition); // No necesitas el valor actual aquí, solo el setter

  const [isLoadPDF, setIsLoadPDF] = useState(false);
  const [showOrder, setShowOrder] = useRecoilState(showOrderObj);

  const [imageBlob, setImageBlob] = useState(null); // Estado para almacenar la imagen como Blob
  const [imageUrl, setImageUrl] = useRecoilState(imageBalancePdf); // Estado para almacenar la URL de la imagen

  const [imageTable, setImageTable] = useRecoilState(imageTableBalancing)

  const [tableUrl, setTableUrl] = useRecoilState(imageTableUrl)

  const [isScreenShot, setIsScreenShot] = useRecoilState(isScreenShotImg)
  
  const [clockGlobal, setClockGlobal]  = useRecoilState(clockGlobalModal)
  
  const [isShowModalZone, setIsShowModalZone] = useRecoilState(isShowModalZoneSample)
  
  const [zoneByZoneModal, setZoneByZoneModal]  = useRecoilState(clockZoneByZoneModal)
  const [opersSelect, setOpersSelect] = useRecoilState(selectOpers)
  
  const [user, setUser] = useRecoilState(currentUser);
  const [operationsProduct, setOperationsProduct] = useRecoilState(allOperationsProduct)
  
  

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

    // 1. Verificar que el ref existe
    if (!componentPDF.current) {
      console.error("componentPDF.current es null o undefined");
      setIsLoadPDF(false);
      return;
    }

    // 2. Verificar que los datos ya están cargados
    if (!objBalancing || operationsProduct.length === 0) {
      console.error("El contenido aún no está listo para el PDF");
      setIsLoadPDF(false);
      return;
    }

    // 3. Verificar dimensiones visibles
    const rect = componentPDF.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      console.error("El elemento tiene tamaño 0");
      setIsLoadPDF(false);
      return;
    }

    // Esperar un momento por si React aún pinta el contenido
    await new Promise(r => setTimeout(r, 500));

    // html2canvas
    const canvas = await html2canvas(componentPDF.current, {
      scale: 1,
      useCORS: true,
      allowTaint: false,
      imageTimeout: 15000,
      backgroundColor: null,
      logging: true,
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
    

    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);


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
      
    }
  };

  const handleImageTable = async () => {

    if (imagePdfRef.current) {
      try {
        const blob = await htmlToImage.toBlob(imagePdfRef.current, {
          useCORS: true,
          cacheBust: true,
        }); // Captura el contenido como Blob
        
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
        <div>
          <div className="pr-6 pb-2 flex justify-end fixed bottom-0 w-full z-50 left-1">
            <MyCustomButton
              icon={<FaBackward className=" mt-1 mr-3 "/>}
              title={ "Regresar " + showOrder.order.code} 
              handleClick={backward}
              value={"Regresar " + showOrder.order.code} 
              bgButton={"bg-zinc-800"}
              textButton={"text-secondary_two"}
            />
              
          </div>
          <div className="flex justify-start">
            {
              user && (user.role === 'admin' || user.role === 'supervisor') && 
                <div className="hidden lg:block">
                  <ModalCustomProduct />
                </div>
            }
            
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

                          {
                            opersSelect.size >= 1 && (
                              <>
                                <Tooltip content="Descargar PDF" placement="top">
                                  <Button
                                    className={`${user && (user.role === 'admin' || user.role === 'supervisor') && 'ml-5'}  font-bold uppercase`}
                                    onPress={()=> {
                                      setIsScreenShot(true)
                                    }}>
                                    descargar 
                                    <FaFilePdf className='text-secondary_two'/>
                                  </Button>
                                </Tooltip>
                                
                                {
                                  user && (user.role === 'admin' || user.role === 'supervisor') && 
                                    <CloneBalancingDashboard/>
                                }
                                
                                    
                              </>
                            )
                          }

                          

                        </>
                      )
                    }
                    {
                      objBalancing.balancing.user_name &&
                        <span
                          className="ml-5 font-light capitalize text-secondary_two bg-secondary_one">
                            
                          {objBalancing.balancing.user_name}
                        </span>
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
        
       { 
          clockGlobal && 
            <SamplesGlobalModal
              isOpen={clockGlobal}
              setIsOpen={setClockGlobal}
          /> 
       }

        { 
          zoneByZoneModal && 
            <ZonesByZoneModal
              isOpen={zoneByZoneModal}
              setIsOpen={setZoneByZoneModal}
          /> 
        }
         
        {
          isShowModalZone && 
            <SamplesZonesModal
              isOpen={isShowModalZone}
              setIsOpen={setIsShowModalZone}
            />
        }
        <BalancingSideBar/>
         
      </>
  )
}
