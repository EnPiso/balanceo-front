import React from 'react'
import { useRecoilState } from 'recoil'
import { showOperationMasterObj } from '../../infraestructure/states/operation_master_state'
import { Tooltip } from '@nextui-org/react'
import { AiFillApi, AiFillBuild } from 'react-icons/ai'
import { hourMinuteSecond, monthDayYear } from '../../infraestructure/utils/dateFormat'
import GoToBalanceButton from './GoToBalanceButton'

const ShowOperationMaster = () => {
  const [showOperation, setShowOperation] = useRecoilState(showOperationMasterObj)

  

  return (
    <div>

    
<div className="p-6 max-w-4xl mx-auto">
     
      {showOperation.length === 0 ? (
        <p className="text-gray-500">No Hay operaciones.</p>
      ) : (
        showOperation.map((op, index) => (
          <div key={index} className="mb-4 p-4 bg-white shadow-lg rounded-2xl">
            <h2 className="text-xl font-semibold mb-2">Operación: {op.operation}</h2>

            {op.operations_balancings.length === 0 ? (
              <p className="text-gray-500">No hay balanceos.</p>
            ) : (
              op.operations_balancings.map((ob, idx) => (
                <div key={idx} className="border-t pt-2 mt-2">
                  <p className="text-gray-600">Posición: {ob.position}</p>

                  <div className="mt-2">
                    <h3 className="text-lg font-medium">Vídeos:</h3>
                    {ob.videos.length === 0 ? (
                      <p className="text-gray-500">No hay vídeos.</p>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {ob.videos.map((video, vidIdx) => (
                          <video key={vidIdx} controls className="w-40 h-24 rounded-lg shadow">
                            <source src={video.video} type="video/mp4" />
                          </video>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-2">
                    <h3 className="text-lg font-medium">Operario</h3>
                    {ob.opers_balancings.length === 0 ? (
                      <p className="text-gray-500">No hay operario.</p>
                    ) : (
                      <ul className="list-disc list-inside">
                        {ob.opers_balancings.map((oper, operIdx) => (
                          <li className='text-green-700 font-bold uppercase text-sm' key={operIdx}>{oper.oper.name}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))
            )}

            {/* Sección de productos y órdenes */}
            <div className="mt-4">
              <h3 className="text-lg font-medium">Orden:</h3>
              {op.products.length === 0 ? (
                <p className="text-gray-500">No hay productos.</p>
              ) : (
                <ul className="list-disc list-inside">
                  {op.products.map((product, prodIdx) => (
                    <div key={prodIdx} className="mb-2">
                         <div>
                          {product.orders.map((order, ordIdx) => (
                              <div key={ordIdx}>

                                  <Tooltip content={"Orden de producción"} placement={"bottom"}>
                                    <span className='mr-2'>
                                    {order.code}
                                    </span>      
                                  </Tooltip>


                                <span>

                                  <small className="ml-2 font-bold text-black">
                                    {
                                        order.created_at && monthDayYear(order.created_at)
                                    }
                                  </small>
                                 

                                  <small className="ml-2 ">
                                    {
                                        order.created_at && hourMinuteSecond(order.created_at)
                                    }

                                  </small>
                                </span>



                                  <div className="flex justify-end" >
                                   
                                    <Tooltip content={"Ir al balanceo"} placement={"top"}>
                                      <GoToBalanceButton
                                        order={order} 
                                        product={product} 
                                        ordIdx={ordIdx}/>
                                    </Tooltip>                   
                                  </div>
                              
                              </div>
                            ))}
                         </div>
                    </div>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))
      )}
    </div>


      <button 
        className='btn' 
        onClick={()=> setShowOperation(null)}>
        Regresar
      </button>
    </div>
  )
}

export default ShowOperationMaster