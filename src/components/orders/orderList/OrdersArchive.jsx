import React, { useEffect, useRef, useState } from "react";
import { Card, CardHeader, CardBody, Image, Spinner } from "@nextui-org/react";
import CustomPaginator from "../../../ui/CustomPaginator.jsx";
import { fetchGetData } from "../../../infraestructure/call_api/crud.js";
import { urlMain } from "../../../infraestructure/data/const.js";
import { useRecoilState } from "recoil";
import {orderList, showOrderObj} from "../../../infraestructure/states/order_states.js";
import FileArchiver from "./FileArchiver.jsx";
import {FaDownLong, FaFile, FaUpLong} from "react-icons/fa6";
import {FaArrowRight, FaFileArchive, FaWindowClose} from "react-icons/fa";
import OrderDetail from "../show/OrderDetail.jsx";
import ShowOrder from "../show/ShowOrder.jsx";
import toast from "react-hot-toast";
import {toastMessageCustom} from "../../../infraestructure/data/toastMessage.js";
import {AiFillDatabase, AiTwotoneStop} from "react-icons/ai";
import SearchDateOrders from "./SearchDateOrders.jsx";
import SearchArchive from "./SearchArchive.jsx";


const totalPaginate = [5, 10, 20, 30, 40, 50];


const OrdersArchive = ({setIsArchive,isArchive }) => { 
  const [orders, setOrders] = useRecoilState(orderList);
  const [showOrder, setShowOrder] = useRecoilState(showOrderObj);

  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [totalPages, setTotalPages] = useState(1); // Total de páginas
  const [perPage, setPerPage] = useState(10); // Total de páginas
  const [desc, setDesc] = useState(true);
  const [queryString, setQueryString] = useState("");
  const [queryDate, setQueryDate] = useState("");
  

  const fetchOrders = async (page, per_page, desc, is_order = true) => {
    setIsLoading(true);
        
    try {
      const formattedDate = queryDate ? queryDate.toString() : '';
      const stringSearch = queryString;

      const result = await fetchGetData(
        `${urlMain}orders?page=${page}&is_order=${is_order}&archive=${false}&per_page=${per_page}&desc=${desc}&q[created_at_eq]=${encodeURIComponent(formattedDate)}&q[code_or_products_name_or_products_category_product_name_or_products_reference_cont]=${encodeURIComponent(stringSearch)}`
      );

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
      fetchOrders(currentPage, perPage, desc);
    }, [queryDate, queryString, desc, currentPage]);
  
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (page) => {
    setPerPage(page);
    fetchOrders(1, page, desc);
  };

  


  return (
    <div>
      <div className="grow  overflow-y-auto bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-100">
        {isLoading ? (
                <div className="flex items-center justify-center h-screen">
                  <Spinner color="default" size="lg" />
                </div>
                ) : (
                  <div>
                  <span className="flex justify-start items-center">
                    <div className="hidden lg:block">
                      <span className="flex justify-start items-center ">
                        <button onClick={() => setIsArchive(false)}>
                          <h3 className={`${!isArchive ? 'text-zinc-800': 'text-secondary_one'} text-md lg:text-2xl font-semibold py-6 flex justify-between`}>
                            Ordenes de producción
                            <FaFile className="mt-1 ml-1" />
                          </h3>
                        </button>
                        <button
                          onClick={() => setIsArchive(true)} 
                          className="ml-4">
                          <h3 className={`${isArchive ? 'text-zinc-800': 'text-secondary_one'} text-md lg:text-2xl font-semibold py-6  text-secondary_one hover:text-zinc-800 flex justify-between`}>
                            Archivadas
                            <FaFileArchive color="red" className="mt-1 ml-1" />
                          </h3>
                        </button>
                      </span>
                    </div>
                  </span>
                  <div className="flex justify-end">
                    <SearchArchive setQueryString={setQueryString}/>
                  </div>
                  

                    <table className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-lg shadow-md border border-gray-300">
                      <thead>
                      <tr className="dark:bg-gray-100 bg-zinc-800 text-secondary_two dark:text-zinc-800">
                        <th className="p-4 text-left font-medium border border-gray-300">Orden de producción</th>
                        <th className="p-4 text-left font-medium border border-gray-300">Referencias</th>
                        <th className="p-4 text-left font-medium border border-gray-300 flex justify-between items-center">
                          <span>
                            Creación
                          </span>
                          

                          <span className="flex space-x-2">
                            {totalPaginate.map((page, i) => (
                                <span
                                  onClick={() => handlePerPageChange(page)}
                                  className={`cursor-pointer  ${perPage === page && 'text-secondary_two'}`}
                                  key={i}
                                >
                                  {page}
                                </span>
                            ))}
                            <span>
                              {desc ? (
                                <button onClick={() => setDesc(false)}>
                                  <FaDownLong size={28} className="text-secondary_two" />
                                </button>
                              ) : (
                                <button onClick={() => setDesc(true)}>
                                  <FaUpLong size={28} className="text-secondary_two" />
                                </button>
                              )}
                            </span>
                          </span>

                        </th>
                      </tr>
                      </thead>
                      <tbody>
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td className="p-4 border border-gray-300">
                            <span>
                              <h4 className="font-bold text-lg uppercase flex justify-between items-center">
                                {
                                  order.code
                                }
                              </h4>
                            </span>
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

      </div>


    </div>
  );
};

export default OrdersArchive;
