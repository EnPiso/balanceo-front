import React,{useEffect, useState} from 'react'
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import DashboardOrder from "./DashboardOrder.jsx";
import OrdersArchive from "./OrdersArchive.jsx";
import {useRecoilState} from "recoil";
import {orderObjBalancing, showOrderObj} from "../../../infraestructure/states/order_states.js";
import { videoOperation } from '../../../infraestructure/states/states_videos.js';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { fetchGetData } from '../../../infraestructure/call_api/crud.js';
import { urlMain } from '../../../infraestructure/data/const.js';
import { pendingExitConfirm } from '../../../infraestructure/states/states_balancing.js';

const OrdersTab = () => {
  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);
  const [showOrder, setShowOrder] = useRecoilState(showOrderObj);
  const [videoObjOperation, setVideoObjOperation] = useRecoilState(videoOperation);
  const [, setIsPendingExit] = useRecoilState(pendingExitConfirm);
  const { orderId, productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [isArchive, setIsArchive] = useState(false);

  // Sincronización con el botón Atrás/Adelante del navegador:
  // cuando la URL cambia externamente los átomos deben seguirla
  useEffect(() => {
    if (!orderId && showOrder) {
      // Volvió a / → limpiar todo
      setShowOrder(null);
      setObjBalancing(null);
    } else if (orderId && !productId && objBalancing) {
      // Volvió a /orders/:id desde el balanceo (browser back):
      // restaurar la URL y pedirle a OrderDetail que muestre el confirm
      navigate(`/orders/${orderId}/products/${objBalancing.product.id}`, { replace: true });
      setIsPendingExit(true);
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
            isArchive={isArchive}
            setIsArchive={setIsArchive}/>
      }

    </div>
  )
}
export default OrdersTab

