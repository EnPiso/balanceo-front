import React, {useEffect, useState} from 'react';
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import OperationListCustom from "./OperationListCustom.jsx";
import {useRecoilState} from "recoil";
import {orderObjBalancing, showOrderObj} from "../../../../infraestructure/states/order_states.js";
import CloneCustom from "./CloneCustom.jsx";

const ProductCardCustom = ({ product }) => {

  //const [showOrder, setShowOrder] = useRecoilState(showOrderObj);
  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);

  const [listOperations, setListOperations] = useState([])

  useEffect(() => {
    debugger
    setListOperations(objBalancing.operations)
  }, [objBalancing]);


  return (

        <OperationListCustom
          operations={listOperations}
        />

  );
};

export default ProductCardCustom;