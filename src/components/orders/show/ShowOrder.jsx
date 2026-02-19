import React,{useEffect, useState} from 'react'
import {useRecoilState} from "recoil";
import {showOrderObj} from "../../../infraestructure/states/order_states.js";
import {fetchGetData} from "../../../infraestructure/call_api/crud.js";
import {urlMain} from "../../../infraestructure/data/const.js";
import {Spinner} from "@nextui-org/react";
import { goToBalance } from '../../../infraestructure/states/operation_master_state.js';
import { FaArrowCircleRight } from 'react-icons/fa';
import { FaArrowRight, FaRightLong } from 'react-icons/fa6';
import { goToUpdateBalance } from '../../../infraestructure/states/states_balancing.js';

const ShowOrder = ({order}) => {
  const [showOrder, setShowOrder] = useRecoilState(showOrderObj)
  const [toUpdateBalance, setToUpdateBalance] = useRecoilState(goToUpdateBalance)

  
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=> {
    if(toUpdateBalance){
      handleShowOrder(toUpdateBalance.orderId)
    }
  },toUpdateBalance)

  const handleShowOrder = (order_id) => {
    setIsLoading(true)
    //setShowOrder(order)
    const getData = async () => {
      try {
        //setLoading(true);
        const result = await fetchGetData(`${urlMain}orders/${order_id}/show_order_details/`);

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
          <span>
            <button onClick={() => handleShowOrder(order.id)}>
              <h4 className="font-bold text-lg  flex justify-between items-center text-secondary_two">
                {
                  order.code
                }
              </h4>
            </button>
          </span>
        )
      }

      

    </>
  )
}
export default ShowOrder
