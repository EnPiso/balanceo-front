import React,{useState} from 'react'
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import DashboardOrder from "./DashboardOrder.jsx";
import OrdersArchive from "./OrdersArchive.jsx";
import {useRecoilState} from "recoil";
import {orderObjBalancing, showOrderObj} from "../../../infraestructure/states/order_states.js";

const OrdersTab = () => {
  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);
  const [showOrder, setShowOrder] = useRecoilState(showOrderObj);

  const [isArchive, setIsArchive] = useState(false);

  return (
    <div className="flex w-full flex-col ">
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

