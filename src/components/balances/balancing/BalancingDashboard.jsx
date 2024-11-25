import React, {useEffect, useRef} from 'react'
import TitleDashboard from "../../../ui/TitleDashboard.jsx";
import useOpers from "../../../hooks/balances/opers/useOpers.jsx";
import {ListOpers} from "../opers/ListOpers.jsx";
import ListBalancing from "./ListBalancing.jsx";
import {useRecoilState} from "recoil";
import {selectProduct} from "../../../infraestructure/states/states_product.js";
import {orderObjBalancing, showOrderObj} from "../../../infraestructure/states/order_states.js";
import InfoBoxBalancing from "./sidebarForm/InfoBoxBalancing.jsx";
import useModal from "./sidebarForm/useModal.jsx";
import {checkOpersPosition, selectOpers} from "../../../infraestructure/states/opers_states.js";
import {fetchGetData} from "../../../infraestructure/call_api/crud.js";
import {urlMain} from "../../../infraestructure/data/const.js";
import ButtonNavigationVideos from "./tableOperations/videoOperations/ButtonNavigationVideos.jsx";
import {listVideosOperations, listVideosOpers} from "../../../infraestructure/states/states_videos.js";

export const BalancingDashboard = () => {

  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);

  const [, setSelectedOperDetails] = useRecoilState(checkOpersPosition); // No necesitas el valor actual aquí, solo el setter
  const [, setOpersSelect] = useRecoilState(selectOpers);




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



  return (
      <>
        {
          objBalancing && (
            <>
              <TitleDashboard
               title={objBalancing.product.name}
              />
              <ListBalancing/>
            </>
          )
        }

      </>
  )
}
