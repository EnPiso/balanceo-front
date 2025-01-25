import React, { useEffect, useRef, useState } from "react";
import { Card, CardHeader, CardBody, Image, Spinner } from "@nextui-org/react";
import CustomPaginator from "../../../ui/CustomPaginator.jsx";
import { fetchGetData } from "../../../infraestructure/call_api/crud.js";
import { urlMain } from "../../../infraestructure/data/const.js";
import { useRecoilState } from "recoil";
import {orderList, showOrderObj} from "../../../infraestructure/states/order_states.js";
import FileArchiver from "./FileArchiver.jsx";
import {FaFile} from "react-icons/fa6";
import {FaFileArchive, FaWindowClose} from "react-icons/fa";
import OrderDetail from "../show/OrderDetail.jsx";
import ShowOrder from "../show/ShowOrder.jsx";
import toast from "react-hot-toast";
import {toastMessageCustom} from "../../../infraestructure/data/toastMessage.js";
import {AiFillDatabase, AiTwotoneStop} from "react-icons/ai";

const OrdersArchive = ({setIsArchive}) => {
  const [orders, setOrders] = useRecoilState(orderList);
  const [showOrder, setShowOrder] = useRecoilState(showOrderObj);

  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [totalPages, setTotalPages] = useState(1); // Total de páginas
 const [perPage, setPerPage] = useState(10); // Total de páginas

  const fetchOrders = async (page) => {
    setIsLoading(true);
    try {
      const result = await fetchGetData(`${urlMain}orders?page=${page}&archive=${true}&per_page=${per_page}`);
      setOrders(result.orders);
      setTotalPages(result.total_pages);
      setCurrentPage(result.current_page);
      //result.orders.length < 1 && toast.error(toastMessageCustom.noArchiveOrder)
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="grow p-8 overflow-y-auto bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-100">
        {
          showOrder ? <OrderDetail /> : (
            <>
              {isLoading ? (
                <div className="flex items-center justify-center h-screen">
                  <Spinner color="default" size="lg" />
                </div>
              ) : (
                <div>
                <span className="flex justify-start items-center">
                  <button
                    onClick={()=> setIsArchive(false)}>
                    <h3
                      className="text-md  mb-4 hover:text-zinc-500 flex justify-between hover:underline">
                      Órdenes
                      <FaFile className="mt-1 ml-1"/>
                    </h3>
                  </button>
                  <button
                    onClick={()=> {
                      setIsArchive(true)
                    }}
                    className="ml-4">
                    <h3
                      className="text-md font-semibold mb-4 hover:text-zinc-500 flex justify-between hover:underline uppercase">
                      Archivadas
                      <FaFileArchive
                        className="mt-1 ml-1"/>
                    </h3>
                  </button>
                </span>

                  <table className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-lg shadow-md border border-gray-300">
                    <thead>
                    <tr className="dark:bg-gray-100 bg-zinc-800 text-zinc-100 dark:text-zinc-800">
                      <th className="p-4 text-left font-medium border border-gray-300">Orden de producción</th>
                      <th className="p-4 text-left font-medium border border-gray-300">Referencias</th>
                      <th className="p-4 text-left font-medium border border-gray-300">Creación</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td className="p-4 border border-gray-300">
                          <ShowOrder order={order} />
                        </td>
                        <td className="p-4 border border-gray-300">
                          {order.products.map((product) => (
                            <span key={product.id} className="flex justify-between items-center hover:bg-zinc-200 py-1 px-1">
                                <span>
                                  {product.name} {" "}
                                  <span className="font-bold">{product.reference}</span>
                                </span>
                                <span>
                                  {product.has_opers_balancing ? <AiFillDatabase/> : <AiTwotoneStop/> }
                                </span>
                              </span>
                          ))}
                        </td>
                        <td className="p-4 border border-gray-300">

                    <span className="flex justify-between items-center">
                      <span>
                         {new Intl.DateTimeFormat("es-ES").format(new Date(order.created_at))}
                      </span>

                      <FileArchiver
                        archive={true}
                        order={order}
                      />
                    </span>
                        </td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                  <div className="flex justify-start py-4">
                    <CustomPaginator
                      total={totalPages}
                      initialPage={currentPage}
                      onChange={handlePageChange}
                    />
                  </div>
                </div>
              )}
            </>
          )
        }


      </div>


    </div>
  );
};

export default OrdersArchive;
