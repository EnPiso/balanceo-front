import React from 'react'
import { Card, CardHeader, CardBody, Spinner, Tooltip } from "@nextui-org/react";
import { useRecoilState } from 'recoil';
import { orderList } from '../../../../infraestructure/states/order_states';
import { hourMinuteSecond, monthDayYear } from '../../../../infraestructure/utils/dateFormat';
import ShowOrder from '../../show/ShowOrder';


const DashboardOrderMobile = () => {
  const [orders, setOrders] = useRecoilState(orderList);

  return (
    <div>
      <div className="grid gap-4 py-3">
          {orders.map((order) => (
            <Card key={order.id} className="p-4">
              <CardHeader className='flex justify-between items-center'>
                <h3 className="text-md font-semibold mr-2 bg-zinc-200 p-2 rounded-lg">
                  <ShowOrder order={order} />
                </h3>
               <div>
                <p className="text-xs text-gray-600">
                    {order.created_at && monthDayYear(order.created_at)}
                    
                  </p>
                  <small className="text-xs  text-black ml-2">{order.created_at && hourMinuteSecond(order.created_at)}</small>
               </div>
                
              </CardHeader>
              <CardBody>
                <div className="flex justify-start">
                  <div>
                    
                    {order.products.map((product, i) => (
                      <>
                          <p key={i} className="text-xs text-secondary_two font-bold">
                            {product.name}
                          </p>

                      </>
                    ))}
                      
                  </div>
                  
                </div>
                
              </CardBody>
            </Card>
          ))}
        </div>
    </div>
  )
}

export default DashboardOrderMobile