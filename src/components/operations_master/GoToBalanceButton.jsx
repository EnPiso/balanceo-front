import React from 'react'
import { AiFillBuild } from 'react-icons/ai'
import { useRecoilState } from 'recoil'
import { goToBalance } from '../../infraestructure/states/operation_master_state'
import { Tooltip } from '@nextui-org/react'
import { showOrderObj } from '../../infraestructure/states/order_states'
import { fetchGetData } from '../../infraestructure/call_api/crud'
import { urlMain } from '../../infraestructure/data/const'
import { FaArrowAltCircleRight } from 'react-icons/fa'

const GoToBalanceButton = ({order, product, ordIdx}) => {
  const [goToBalanceObj, setBoToBalanceObj] = useRecoilState(goToBalance)

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
        }
      };
  
      getData();
    }

  const handleBalance = (order, product) => {

    setBoToBalanceObj({
      order: order,
      product: product
    })
    handleShowOrder(order)
  }

  return (

    <>
      <Tooltip content={"Ir al balanceo"} placement={"top"}>
        <button
            onClick={() => handleBalance(order, product)}
            key={ordIdx}>
              <span className="font-semibold text-green-700 flex justify-between items-center hover:text-green-900">
                {product.name}
                <FaArrowAltCircleRight size={23} className='ml-2'/>
              </span>
          </button>                                                                
      </Tooltip>        
    </>
    
  )
}

export default GoToBalanceButton