import React, { useEffect } from 'react';
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { fetchGetData } from "../../../infraestructure/call_api/crud.js";
import { urlMain } from "../../../infraestructure/data/const.js";
import { useRecoilState } from "recoil";
import { orderList, showOrderObj } from "../../../infraestructure/states/order_states.js";
import ShowOrder from "../show/ShowOrder.jsx";
import OrderDetail from "../show/OrderDetail.jsx";
import ImageLightbox from "../import/ImageLightBox.jsx";

const DashboardOrder = () => {
  const [orders, setOrders] = useRecoilState(orderList);
  const [showOrder, setShowOrder] = useRecoilState(showOrderObj);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchGetData(`${urlMain}/orders`);
        setOrders(result);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    getData();
  }, []);

  return (
    <div className="grow p-8 overflow-y-auto bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-100 ">
      {showOrder ? (
        <OrderDetail />
      ) : (
        <>
          {/* Tabla para Pantallas Grandes */}
          <div className="hidden lg:block ">
            <h3 className="text-xl font-semibold mb-4">Ordenes</h3>
            <table className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-lg shadow-md border border-gray-300">
              <thead>
              <tr className="dark:bg-gray-100 bg-zinc-800 text-zinc-100 dark:text-zinc-800">
                <th className="p-4 text-left font-medium border border-gray-300">Ordén</th>
                <th className="p-4 text-left font-medium border border-gray-300">Ficha técnicas</th>
              </tr>
              </thead>
              <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td className="p-4 border border-gray-300">
                    <ShowOrder order={order} />
                  </td>
                  <td className="p-4 border border-gray-300">
                    {order.products.map((product, i) => (
                      <p key={i} className="font-medium">{product.name}</p>
                    ))}
                  </td>
                </tr>
              ))}
              </tbody>
            </table>

          </div>

          {/* Tarjetas para Pantallas Pequeñas */}
          <div className="lg:hidden space-y-4">
            <h3 className="text-xl font-semibold">Orders</h3>
            {orders.map((order, index) => (
              <Card key={index} className="py-4 mt-2 border rounded-lg shadow-lg">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <ShowOrder order={order} />
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                  <div className="flex items-center">
                    {order.image_url ? (
                      <Image
                        alt="Order Image"
                        src={order.image_url}
                        className="rounded-lg object-cover w-32 h-32"
                      />
                    ) : (
                      <p>No Image</p>
                    )}
                  </div>
                  <div className="mt-2">
                    <h4 className="font-semibold">Products:</h4>
                    {order.products.map((product, i) => (
                      <p key={i} className="font-medium">{product.name}</p>
                    ))}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardOrder;
