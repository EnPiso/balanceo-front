import React,{useState} from 'react'
import {useRecoilState} from "recoil";
import {showOrderObj} from "../../../infraestructure/states/order_states.js";
import {fetchGetData} from "../../../infraestructure/call_api/crud.js";
import {urlMain} from "../../../infraestructure/data/const.js";
import {Spinner} from "@nextui-org/react";

const ShowOrder = ({order}) => {
  const [showOrder, setShowOrder] = useRecoilState(showOrderObj)


  const [isLoading, setIsLoading] = useState(false);

  const handleShowOrder = (order) => {
    setIsLoading(true)
    //setShowOrder(order)
    const getData = async () => {
      try {
        //setLoading(true);
        const result = await fetchGetData(`${urlMain}orders/${order.id}/show_order_details/`);

        setShowOrder(result)
        //setOrders(result)
        //setError(null);
      } catch (error) {
        console.error('Error al obtener los datos:', error);

      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }

  return (
    <>
      {
        isLoading ? <Spinner color={"default"} size={"lg"}/> : (
            <button onClick={() => handleShowOrder(order)}>
              <h4 className="font-bold text-large hover:text-green-800 uppercase">
                {
                  order.code
                }
              </h4>
            </button>
        )
      }
    </>
  )
}
export default ShowOrder
