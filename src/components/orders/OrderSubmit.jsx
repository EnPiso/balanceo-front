import React, {useState} from 'react'
import {FaSave} from "react-icons/fa";
import CustomButton from "../../ui/CustomButton.jsx";
import {urlMain} from "../../infraestructure/data/const.js";
import {postData} from "../../infraestructure/call_api/crud.js";
import {useRecoilState} from "recoil";
import {orderList} from "../../infraestructure/states/order_states.js";
import toast from "react-hot-toast";
import {toastMessageCustom} from "../../infraestructure/data/toastMessage.js";
import SpinnerLoaderCustom from "../../ui/SpinnerLoaderCustom.jsx";

const OrderSubmit = ({operationsData, orderProOpe, images, onClose,eraseData}) => {
  const [orders, setOrders] = useRecoilState(orderList);

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = () => {
    setIsLoading(true)
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

        toast.success(toastMessageCustom.order_create)
        onClose()
        eraseData()
      } catch (error) {
        console.error('Error setting data', error);
        setIsLoading(false)
      }
    };

    postDataOrder(formData);

  };


  return (
    <>
      {
        isLoading ? (
          <>
            <div className="flex justify-center mr-5">
              <SpinnerLoaderCustom/>
            </div>
          </>
        ) : <CustomButton
          color="default"
          variant="bordered"
          startContent={<FaSave color="green"/>}
          onClick={handleSubmit}
          title="Guardar"
        />
      }


    </>
  )
}
export default OrderSubmit
