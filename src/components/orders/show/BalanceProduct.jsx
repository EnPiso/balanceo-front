import React from 'react'
import {Button} from "@nextui-org/react";
import {FaCalendar} from "react-icons/fa6";
import {useRecoilState} from "recoil";
import {orderObjBalancing, showOrderObj} from "../../../infraestructure/states/order_states.js";
import {fetchGetData, postData} from "../../../infraestructure/call_api/crud.js";
import {urlMain} from "../../../infraestructure/data/const.js";

const BalanceProduct = ({product}) => {
  const [showOrder, setShowOrder] = useRecoilState(showOrderObj);
  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);

  const handleBalancing = (product) => {
    // balancings/show_balance


    const order_id = showOrder.order.id
    const product_id =  product.product.id
    const prod = product
    const getData = async () => {
      try {
        //setLoading(true);
        const result = await fetchGetData(`${urlMain}/balancings/show_balance?order_id=${order_id}&product_id=${product_id}`);

        console.log(result)
        console.log(prod)

        const data = {
          product: prod.product,
          total_sam: prod.total_sam,
          operations: result
        }
        setObjBalancing(data)
        //setShowOrder(result)
        //setOrders(result)
        //setError(null);
      } catch (error) {
        console.error('Error al obtener los datos:', error);

      } finally {
        //setLoading(false);
      }
    };

    getData();


     //

  }


  return (
    <>
      <Button
        className="mt-2"
        onClick={() => handleBalancing(product)}
        color="default"
        endContent={<FaCalendar />}
      >
        Balancear {product.product.name}
      </Button>
    </>
  )
}
export default BalanceProduct
