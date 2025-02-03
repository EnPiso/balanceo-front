import React,{useState} from 'react'
import CustomButton from '../../ui/CustomButton'
import SpinnerLoaderCustom from '../../ui/SpinnerLoaderCustom'
import { FaSave } from 'react-icons/fa'
import { postData } from '../../infraestructure/call_api/crud'
import { urlMain } from '../../infraestructure/data/const'
import { useRecoilState } from 'recoil'
import { orderList } from '../../infraestructure/states/order_states'
import toast from 'react-hot-toast'

const OrderSubmitMultiple = ({filesData, processData, onClose, setIsLoadingMulti, setValueLoading}) => {
    const [orders, setOrders] = useRecoilState(orderList);
  

    const [isLoading, setIsLoading] = useState(false)
    

  const handleSubmit = () => {

    setIsLoadingMulti(true)
  
    setValueLoading(0);

    // Simulación de progreso mientras la API responde
    const interval = setInterval(() => {
      setValueLoading((v) => (v < 90 ? v + 5 : v)); // Aumenta progresivamente hasta 90%
    }, 500);



    const updateData = processData.map((data)=> {
        return data.groupedOrders
    })

    const data = {
      orders: {
        orders: JSON.stringify(updateData)
      }
    }
    
    const createOperation = async () => {

      try {
        const result = await postData(urlMain + "orders/create_multiple_order", data)
        console.log(result)
        
        const updateResult = result.orders.map((order)=> {
          return order.order_products
        })
        
        const updateOrders = [...orders, ...updateResult]
        setOrders(updateOrders)
        toast.success("Las ordenes fueron agregadas con éxito")
        setIsLoadingMulti(false)
        setValueLoading(100)
        onClose()
      } catch (error) {
        console.error('Error setting data', error);
      }
    };

    createOperation();

  }  

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

export default OrderSubmitMultiple