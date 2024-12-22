import React from 'react'
import {useRecoilState} from "recoil";
import {showOrderObj} from "../../../infraestructure/states/order_states.js";
import {fetchGetData} from "../../../infraestructure/call_api/crud.js";
import {urlMain} from "../../../infraestructure/data/const.js";

const ShowOrder = ({order}) => {
  const [showOrder, setShowOrder] = useRecoilState(showOrderObj)

  const handleShowOrder = (order) => {
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
        //setLoading(false);
      }
    };

    getData();
  }

  return (
    <>

      <button onClick={() => handleShowOrder(order)}>
        <h4 className="font-bold text-large">
          {
            order.code
          }
        </h4>

      </button>
    </>
  )
}
export default ShowOrder
