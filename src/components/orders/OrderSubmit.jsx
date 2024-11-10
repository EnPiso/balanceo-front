import React from 'react'
import {FaSave} from "react-icons/fa";
import CustomButton from "../../ui/CustomButton.jsx";
import {urlMain} from "../../infraestructure/data/const.js";
import {postData} from "../../infraestructure/call_api/crud.js";
import {useRecoilState} from "recoil";
import {orderList} from "../../infraestructure/states/order_states.js";

const OrderSubmit = ({operationsData, orderProOpe, images, onClose,eraseData}) => {
  const [orders, setOrders] = useRecoilState(orderList);

  const handleSubmit = () => {
    const formData = new FormData();

    formData.append('order[operationsData]', JSON.stringify(operationsData));
    formData.append('order[orderProOpe]', orderProOpe.order);
    formData.append('order[image]', images[0])
    // Llamar a `createOrder` pasando el `FormData`
    createOrder(formData);

  };

  const createOrder =  (formData) => {

    const postDataOrder = async (formData) => {
      try {
        const result = await postData(urlMain + "/orders/create_order", formData)
        const order = result.order_products
        setOrders([...orders, order])
        onClose()
        eraseData()
      } catch (error) {
        console.error('Error setting data', error);
      }
    };

    postDataOrder(formData);

  };


  return (
    <>
      <CustomButton
        color="default"
        variant="bordered"
        startContent={<FaSave color="green"/>}
        onClick={handleSubmit}
        title="Guardar"
      />
    </>
  )
}
export default OrderSubmit
