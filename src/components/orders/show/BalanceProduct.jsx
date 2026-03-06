import React, {useEffect} from 'react'
import {Spinner} from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import {FaCalendar, FaX} from "react-icons/fa6";
import {useRecoilState} from "recoil";
import {showOrderObj} from "../../../infraestructure/states/order_states.js";
import {goToUpdateBalance, isShowButtonOpers} from "../../../infraestructure/states/states_balancing.js";
import { goToBalance } from '../../../infraestructure/states/operation_master_state.js';
import MyCustomButton from '../../../ui/MyCustomButton.jsx';
import toast from 'react-hot-toast';
import { useLoadBalancing } from '../../../hooks/balances/useLoadBalancing.jsx';

const BalanceProduct = ({product}) => {
  const navigate = useNavigate();
  const [showOrder] = useRecoilState(showOrderObj);
  const [goToBalanceObj, setBoToBalanceObj] = useRecoilState(goToBalance)
  const [toUpdateBalance, setToUpdateBalance] = useRecoilState(goToUpdateBalance)
  const [, setIsShowButton] = useRecoilState(isShowButtonOpers)
  const { loadBalancing, isLoading } = useLoadBalancing();

  const handleBalancing = async (product, order_id) => {
    await loadBalancing(product, order_id);
    navigate(`/orders/${order_id}/products/${product.product.id}`)
  }

  useEffect(() => {
    if (toUpdateBalance) {
      const product_id = product.product.id
      if (toUpdateBalance.product.id === product_id) {
        handleBalancing(product, toUpdateBalance.orderId)
        setIsShowButton(true)
        setTimeout(() => setToUpdateBalance(null), 1000)
      }
    }
  }, [toUpdateBalance])

  useEffect(() => {
    if (goToBalanceObj) {
      const productObj = goToBalanceObj.product
      if (productObj.id === product.product.id) {
        handleBalancing(product, showOrder.order.id)
        setTimeout(() => setBoToBalanceObj(null), 1000)
      }
    }
  }, [goToBalanceObj])

  return (
    <>
    
  
          <>
          <div className="block lg:hidden">
            <MyCustomButton
                icon={
                  !isLoading && (
                    product.product.has_opers_balancing ? (
                      <FaCalendar className="mt-1 mr-3" />
                    ) : (
                      <FaX className="mt-1 mr-3 text-red-500" />
                    )
                  )
                }
                title={ 
                  isLoading ? 
                    <Spinner 
                      color={"default"} 
                      size={"lg"}/> :
                    <div>
                      {product.product.has_opers_balancing && "Balancear"}
                      {" "}
                      
                      <span className="uppercase">
                        {product.product.name}
                      </span> 
                      <span className="font-bold"> 
                        {product.product.reference} 
                      </span>
                    </div>
                }
                handleClick={()=> {
                  product.product.has_opers_balancing ?
                    handleBalancing(product, showOrder.order.id) :
                    toast.error('No hay balanceo disponible')
                }}
                value={product}
                bgButton={product.product.has_opers_balancing ? "bg-zinc-800" : "bg-zinc-100"}
                textButton={product.product.has_opers_balancing ? "text-secondary_two" : "text-zinc-800"}
              />
          </div>
          <div className="hidden lg:block">
            
            <MyCustomButton
                icon={<FaCalendar className=" mt-1 mr-3 "/>}
                title={ 
                    <div>
                      Balancear {" "}
                      <span className="uppercase">
                        {product.product.name}
                      </span> 
                      <span className="font-bold"> 
                        {product.product.reference} 
                      </span>
                      <span>
                        {isLoading && <Spinner color={"default"} size={"sm"} className='ml-3'/>}
                      </span>
                    </div>
                }
                handleClick={()=> handleBalancing(product, showOrder.order.id)}
                value={product}
                bgButton={"bg-zinc-800"}
                textButton={"text-secondary_two"}
              />
          </div>
            
          </>

            
    </>
  )
}
export default BalanceProduct
