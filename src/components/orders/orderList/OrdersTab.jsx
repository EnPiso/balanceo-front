import React,{useEffect, useState} from 'react'
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import DashboardOrder from "./DashboardOrder.jsx";
import OrdersArchive from "./OrdersArchive.jsx";
import {useRecoilState} from "recoil";
import {orderObjBalancing, showOrderObj} from "../../../infraestructure/states/order_states.js";
import { videoOperation } from '../../../infraestructure/states/states_videos.js';
import { useParams, useLocation } from 'react-router-dom';
import { fetchGetData } from '../../../infraestructure/call_api/crud.js';
import { urlMain } from '../../../infraestructure/data/const.js';

const OrdersTab = () => {
  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);
  const [showOrder, setShowOrder] = useRecoilState(showOrderObj);
  const [videoObjOperation, setVideoObjOperation] = useRecoilState(videoOperation);
  const { orderId, productId } = useParams();
  const location = useLocation();

  const [isArchive, setIsArchive] = useState(false);

  // Sincronización con el botón Atrás/Adelante del navegador:
  // cuando la URL cambia externamente los átomos deben seguirla
  useEffect(() => {
    if (!orderId && showOrder) {
      // Volvió a / → limpiar todo
      setShowOrder(null);
      setObjBalancing(null);
    } else if (orderId && !productId && objBalancing) {
      // Volvió a /orders/:id → limpiar solo el balanceo
      setObjBalancing(null);
    }
  }, [location.pathname]);

  // Hidratación: si se entra directo a /orders/:orderId (F5 o link compartido)
  useEffect(() => {
    if (orderId && (!showOrder || String(showOrder.order.id) !== String(orderId))) {
      fetchGetData(`${urlMain}orders/${orderId}/show_order_details/`)
        .then(result => setShowOrder(result))
        .catch(err => console.error('Error hidratando orden:', err))
    }
  }, [orderId]);
  
  return (
    <div className="flex w-full flex-col">
      {
        isArchive ?
          <OrdersArchive
            key={JSON.stringify(objBalancing)}
            isArchive={isArchive}
            setIsArchive={setIsArchive}/> :
          <DashboardOrder
            key={JSON.stringify(showOrder)}
            isArchive={isArchive}
            setIsArchive={setIsArchive}/>
      }

    </div>
  )
}
export default OrdersTab

