import React, {useEffect} from 'react';
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import OperationListCustom from "./OperationListCustom.jsx";
import {useRecoilState} from "recoil";
import {orderObjBalancing, showOrderObj} from "../../../../infraestructure/states/order_states.js";
import CloneCustom from "./CloneCustom.jsx";

const ProductCardCustom = ({ product }) => {

  //const [showOrder, setShowOrder] = useRecoilState(showOrderObj);
  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);

  useEffect(() => {
    console.log(objBalancing)
  //  debugger
  }, [objBalancing]);


  return (
    <Card className="rounded-lg shadow-sm p-4 ">

      <CardBody className="space-y-2">

        <OperationListCustom
          operations={objBalancing.operations}
        />

      </CardBody>
    </Card>
  );
};

export default ProductCardCustom;