import React from 'react'
import {FaCalendar} from "react-icons/fa6";
import {Button} from "@nextui-org/react";
import {useRecoilState} from "recoil";
import {orderObjBalancing, showOrderObj} from "../../../infraestructure/states/order_states.js";
import {postData} from "../../../infraestructure/call_api/crud.js";
import {urlMain} from "../../../infraestructure/data/const.js";
import {allOperationsProduct} from "../../../infraestructure/states/operation_states.js";

const SaveBalance = () => {
  const [showOrder, setShowOrder] = useRecoilState(showOrderObj);
  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);
  const [operationsProduct, setOperationsProduct] = useRecoilState(allOperationsProduct)

  const handleApi = () => {

    const data = {
      balancing: {
        order_id: showOrder.order.id,
        product_id: objBalancing.product.id,
        number_workers: 0,
        operations: JSON.stringify(operationsProduct)
      }
    }
    console.log(data)


    const postDataOrder = async (data) => {
      try {
        const result = await postData(urlMain + "/balancings", data)
        console.log(result)
      } catch (error) {
        console.error('Error setting data', error);
      }
    };

    postDataOrder(data);

  }



  return (
    <Button
      className="mt-2"
      onClick={handleApi}
      color="default"
      endContent={<FaCalendar />}
    >
      Guardar balanceo
    </Button>
  )
}
export default SaveBalance
