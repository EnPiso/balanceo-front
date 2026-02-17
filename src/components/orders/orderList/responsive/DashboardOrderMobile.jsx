import React from 'react'
import { Card, CardHeader, CardBody, Spinner, Tooltip } from "@nextui-org/react";
import { useRecoilState } from 'recoil';
import { orderList } from '../../../../infraestructure/states/order_states';
import { hourMinuteSecond, monthDayYear } from '../../../../infraestructure/utils/dateFormat';
import ShowOrder from '../../show/ShowOrder';
import { FaArrowCircleRight, FaFilePdf, FaRegFileExcel } from 'react-icons/fa';
import { BsArrowDownCircle, BsArrowUpCircle } from 'react-icons/bs';
import { FaDownLong, FaUpLong } from 'react-icons/fa6';
import SamplesCountProduct from '../SamplesCountProduct';
import { AiFillCheckCircle, AiFillStop } from 'react-icons/ai';


const DashboardOrderMobile = ({totalPaginate,handlePerPageChange,perPage,setDesc,desc }) => {
  const [orders, setOrders] = useRecoilState(orderList);

  return (
    <div>
      <div className="py-3 ">

         <div className="flex justify-end">
            <span className="flex space-x-2  p-2 ">
              
              {
                totalPaginate.map((page) => (
                  <span
                    key={page}
                    onClick={() => handlePerPageChange(page)}
                    className={`cursor-pointer text-1xl font-bold flex items-center justify-center w-8 h-8   border-zinc-800 ${perPage === page ? 'text-secondary_two border-secondary_two' : 'text-zinc-800'}`}
                  >
                    {page}
                  </span>
                ))
              }
            <span>
                {
                  desc ? (
                  <>
                    <button onClick={() => setDesc(false)}>
                      <FaDownLong size={30} className="text-secondary_two " />
                    </button>
                  </>
                  ) :( 
                  <>
                    <button onClick={() => setDesc(true)}>
                      <FaUpLong size={30} className="text-secondary_two " />
                    </button>
                  </>
                  )
                }
                
                
              </span>
            </span>
         </div>
         

          {orders.map((order) => (
            <div key={order.id} className="p-1 mt-2 border">
              <div>
                <div>
                  <div className="flex justify-between items-center mb-1 rounded-md">
                    <h3 className="text-md font-semibold flex justify-between items-center">
                      <ShowOrder order={order} /> 
                    </h3>
                    <div className="text-end">
                      <p className="text-sm text-zinc-800">
                        {order.created_at && monthDayYear(order.created_at)}
                        
                      </p>
                      <small className="text-md font-bold text-zinc-800 ml-1">
                          {order.created_at && hourMinuteSecond(order.created_at)}
                      </small>
                    </div>
                  </div>
                  
                  
                  <div>
                    {order.products.map((product, i) => (
                      <div key={product.id || `${order.id}-${i}`} className="p-2  border-t border-zinc-100 bg-zinc-50">
                        <div className="flex justify-between items-start  py-1">
                          <p className={`text-md ${product.has_opers_balancing ? 'text-secondary_two' : 'text-zinc-400'}  font-black text-start`}>
                            <small>
                              {product.name}
                            </small>
                            
                          </p>

                          <span>
                            {product.has_opers_balancing ?
                                (
                                    <span className="flex justify-between items-center">
                                      <SamplesCountProduct
                                          value={product.samplings_cycles_count}
                                          style={"red"}
                                          order={order}
                                          product={product}
                                          timeCyclesGo={1}     
                                      />
                                      
                                      <SamplesCountProduct
                                          value={product.time_cycle_oper_count}
                                          style={"blue"} 
                                          order={order}
                                          product={product}
                                          timeCyclesGo={2}    
                                      />

                                      <SamplesCountProduct
                                          value={product.opers_zones_count}
                                          style={"yellow"}  
                                          order={order}
                                          product={product}
                                          timeCyclesGo={3}   
                                      />
                                      <SamplesCountProduct
                                          value={product.samplings_count}
                                          style={"green"} 
                                          order={order}
                                          product={product}
                                          timeCyclesGo={4}    
                                      />
                                      
                                    </span>
                                ) :
                                <>
                                    <AiFillStop size={20} className="ml-2 text-zinc-400"/>
                                </>
                            }


                          </span>
                          
                        </div>
                        {
                            product.has_opers_balancing &&
                                <small className={`capitalize font-light text-zinc-700`}> 
                                    { product.plant_module_name } 
                                </small>
                              
                          } 
                          
                      </div>
                    ))}
                      
                  </div>
                </div>
                
              
                
              </div>
              
              
              
            </div>
          ))}
        </div>
    </div>
  )
}

export default DashboardOrderMobile