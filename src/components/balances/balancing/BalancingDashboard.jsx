import React, {useEffect, useRef, useState} from 'react'
import TitleDashboard from "../../../ui/TitleDashboard.jsx";
import useOpers from "../../../hooks/balances/opers/useOpers.jsx";
import {ListOpers} from "../opers/ListOpers.jsx";
import ListBalancing from "./ListBalancing.jsx";
import {useRecoilState} from "recoil";
import {selectProduct} from "../../../infraestructure/states/states_product.js";
import {isPDFGenerate, orderObjBalancing, showOrderObj} from "../../../infraestructure/states/order_states.js";
import InfoBoxBalancing from "./sidebarForm/InfoBoxBalancing.jsx";
import useModal from "./sidebarForm/useModal.jsx";
import {checkOpersPosition, selectOpers} from "../../../infraestructure/states/opers_states.js";
import {fetchGetData} from "../../../infraestructure/call_api/crud.js";
import {urlMain} from "../../../infraestructure/data/const.js";
import ButtonNavigationVideos from "./tableOperations/videoOperations/ButtonNavigationVideos.jsx";
import {listVideosOperations, listVideosOpers} from "../../../infraestructure/states/states_videos.js";
import ModalCustomProduct from "./customProduct/ModalCustomProduct.jsx";
import ImageLightbox from "../../orders/import/ImageLightBox.jsx";
import {FaFilePdf} from "react-icons/fa6";
import {Button, Spinner, Tooltip} from "@nextui-org/react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {FaCircleNotch, FaTruckLoading} from "react-icons/fa";

export const BalancingDashboard = () => {

  const iconRef = useRef();

  const componentPDF = useRef();
  const [isPDFMode, setIsPDFMode] = useRecoilState(isPDFGenerate);



  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);

  const [, setSelectedOperDetails] = useRecoilState(checkOpersPosition); // No necesitas el valor actual aquí, solo el setter
  const [, setOpersSelect] = useRecoilState(selectOpers);

  const [isLoadPDF, setIsLoadPDF] = useState(false);

  const [showOrder, setShowOrder] = useRecoilState(showOrderObj);

  useEffect(() => {


    const product_id = objBalancing.product?.id; // Usa `?.` en caso de que `product` esté inicialmente indefinido

    if (product_id) {
      const getData = async () => {
        try {
          const result = await fetchGetData(`${urlMain}/opers_balancings?product_id=${product_id}`);

          if (result && Array.isArray(result)) {
            // Extrae los IDs y detalles de los operarios desde la respuesta
            const operDetails = result.map((operBalancing, index) => ({
              id: operBalancing.oper.id,
              name: operBalancing.oper.name,
              index: index + 1 // Define la posición como el índice en la lista
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

    const element = componentPDF.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    // console.log(objBalancing.product.name)
    const name = objBalancing.product.name
    const order = showOrder.order.code
    const created_at = showOrder.order.created_at
    const created = new Intl.DateTimeFormat("es-ES").format(new Date(created_at))

    pdf.save( `${order}_${name}_${created}.pdf`);
    setIsPDFMode(false); // Desactiva el modo PDF
    setIsLoadPDF(false)
  };

  useEffect(() => {
    isPDFMode && generatePDF()
  }, [isPDFMode]);



  return (
      <>
        {
          objBalancing && (
            <>

              <ModalCustomProduct
                product={objBalancing.product}
              />

              {
                isLoadPDF ? (

                    <Button
                      className="ml-5 font-bold uppercase">
                      Generando PDF
                      <span className="transform transition-transform duration-500 rotate ">
                        <FaCircleNotch color="green"/>
                      </span>

                    </Button>

                ) : (
                  <>
                    <Tooltip content="Descargar PDF" placement="right">
                      <Button
                        className="ml-5 font-bold uppercase"
                        onPress={()=> {
                          setIsPDFMode(true)
                          setIsLoadPDF(true)
                        }}>
                        descargar
                        <FaFilePdf color="green"/>
                      </Button>
                    </Tooltip>
                  </>
                )
              }




              <ListBalancing
                componentPDF={componentPDF}
                key={JSON.stringify(objBalancing)}
              />
            </>
          )
        }

      </>
  )
}
