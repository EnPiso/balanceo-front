import React, { useEffect, useRef, useState } from "react";
import { Card, CardHeader, CardBody, Image, Spinner, Tooltip } from "@nextui-org/react";
import CustomPaginator from "../../../ui/CustomPaginator.jsx";
import { fetchGetData } from "../../../infraestructure/call_api/crud.js";
import { urlMain } from "../../../infraestructure/data/const.js";
import { useRecoilState } from "recoil";
import { orderList, showOrderObj } from "../../../infraestructure/states/order_states.js";
import FileArchiver from "./FileArchiver.jsx";
import { FaDownLong, FaFile, FaFolderClosed, FaUpLong } from "react-icons/fa6";
import { FaDoorClosed, FaFileArchive, FaSearch, FaSearchLocation, FaWindowClose } from "react-icons/fa";
import ShowOrder from "../show/ShowOrder.jsx";
import OrderDetail from "../show/OrderDetail.jsx";
import { AiFillCheckCircle, AiFillDatabase, AiFillStop, AiOutlineSortDescending, AiTwotoneStop } from "react-icons/ai";
import GenerateImgPdf from "./GenerateImgPdf.jsx";
import PdfBalancingImg from "./PdfBalancingImg.jsx";
import { hourMinuteSecond, monthDayYear } from "../../../infraestructure/utils/dateFormat.js";
import SearchDashboardOrders from "./SearchOrdersCustom.jsx";
import SearchDateOrders from "./SearchDateOrders.jsx";
import { allOperationsProduct } from "../../../infraestructure/states/operation_states.js";
import { detailOperOperations, numberCurrentPage } from "../../../infraestructure/states/states_balancing.js";
import { BsArrow90DegUp, BsArrowDown, BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";
import DashboardOrderMobile from "./responsive/DashboardOrderMobile.jsx";

const totalPaginate = [5, 10, 20, 30, 40, 50];

const DashboardOrder = ({ setIsArchive, isArchive, archive }) => {
  const [orders, setOrders] = useRecoilState(orderList);
  const [showOrder, setShowOrder] = useRecoilState(showOrderObj);
  const [detailOperOpera, setDetailOperOpera] = useRecoilState(detailOperOperations);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useRecoilState(numberCurrentPage); // Página actual
  const [totalPages, setTotalPages] = useState(1); // Total de páginas
  const [perPage, setPerPage] = useState(10); // Total de páginas
  const [queryDate, setQueryDate] = useState(null); // Estado para el valor del input
  const [queryString, setQueryString] = useState("");
  const [desc, setDesc] = useState(true);
  const [isSearchVisible, setIsSearchVisible] = useState(false); // Estado para controlar la visibilidad de SearchDateOrders
  const pdfDiv = useRef(null);

  useEffect(() => {
    fetchOrders(currentPage, perPage, desc);
  }, [queryDate, queryString]);

  useEffect(() => {
    fetchOrders(currentPage, perPage, desc);
  }, [desc]);

  const fetchOrders = async (page, per_page, desc) => {
    setIsLoading(true);

    try {
      const formattedDate = queryDate ? queryDate.toString() : '';
      const stringSearch = queryString;

      const result = await fetchGetData(
        `${urlMain}orders?page=${page}&archive=${false}&per_page=${per_page}&desc=${desc}&q[created_at_eq]=${encodeURIComponent(formattedDate)}&q[code_or_products_name_or_products_category_product_name_or_products_reference_cont]=${encodeURIComponent(stringSearch)}`
      );

      setOrders(result.orders);
      setTotalPages(result.total_pages);
      setCurrentPage(result.current_page);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchOrders(page, perPage, desc);
  };

  const handlePerPageChange = (page) => {
    setPerPage(page);
    fetchOrders(1, page, desc);
  };

  const toggleSearchVisibility = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <div>
      <div className="grow p-3 overflow-y-auto bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-100">
        {!isLoading && (
          <>
            <div className="block lg:hidden">
             
              <div className="flex justify-between items-center">
              {
                !showOrder && 
                  <h1 className="text-xl font-semibold py-6 uppercase text-secondary_one">
                    Ordenes de producción
                  </h1>
              }

              <div>
                  {
                    !showOrder && 
                    <button
                      onClick={toggleSearchVisibility}
                      className="text-primary_one font-bold"
                    >
                      {isSearchVisible ? <FaWindowClose size={28}/> : <FaSearch size={28}/>}
                    </button>
                  }
                </div>
              </div>
              
            </div>
            
            { 
              !showOrder && (
                <div className="hidden lg:block">
                  <span className="flex justify-start items-center ">
                    <button onClick={() => setIsArchive(false)}>
                      <h3 className="text-md lg:text-2xl font-semibold py-6 uppercase text-secondary_one hover:text-zinc-800 flex justify-between hover:underline">
                        Ordenes de producción
                        <FaFile className="mt-1 ml-1" />
                      </h3>
                    </button>
                    <button onClick={() => setIsArchive(true)} className="ml-4">
                      <h3 className="text-md lg:text-2xl font-semibold py-6 uppercase text-secondary_one hover:text-zinc-800 flex justify-between hover:underline">
                        Archivadas
                        <FaFileArchive color="red" className="mt-1 ml-1" />
                      </h3>
                    </button>
                  </span>
                </div>
              )
            }
           
          </>
        )}

        {!showOrder && (
          <>
            
            {isSearchVisible && (
              <div className="block lg:hidden">
                <SearchDateOrders
                  queryString={queryString}
                  setQueryString={setQueryString}
                  queryDate={queryDate}
                  setQueryDate={setQueryDate}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              </div>
            )}
          </>
        )}

        {showOrder ? (
          <OrderDetail />
        ) : (
          <>
            {isLoading ? (
              <div className="flex items-center justify-center h-screen">
                <Spinner color="default" size="lg" />
              </div>
            ) : (
              <div>
                <div className="hidden lg:block">
                  <SearchDateOrders
                    queryString={queryString}
                    setQueryString={setQueryString}
                    queryDate={queryDate}
                    setQueryDate={setQueryDate}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                  />
                  <table className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-lg  border border-gray-300 mt-2">
                    <thead>
                      <tr className="dark:bg-gray-100 bg-zinc-800 text-zinc-100 dark:text-zinc-800">
                        <th className="p-4 text-left font-medium border border-gray-300 text-secondary_two">
                          Orden de producción
                        </th>
                        <th className="p-4 text-left font-medium border border-gray-300 text-secondary_two">
                          Referencias
                        </th>
                        <th className="p-4 text-left font-medium border border-gray-300 flex justify-between items-center">
                          <span className="text-secondary_two">Creación</span>
                          <Tooltip content="Cantidad de balanceos">
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
                          </Tooltip>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td className="p-2 border border-gray-300">
                            <ShowOrder order={order} />
                          </td>
                          <td className="p-2 border border-gray-300">
                            {order.products.map((product, i) => (
                              <GenerateImgPdf
                                pdfDiv={pdfDiv}
                                order={order}
                                product={product}
                                key={i}
                              />
                            ))}
                          </td>
                          <td className="p-2 border border-gray-300">
                            <span className="flex justify-between items-center">
                              <div className="flex justify-start">
                                <span>
                                  {order.created_at && monthDayYear(order.created_at)}
                                  <small className="ml-2 font-bold text-black">
                                    {order.created_at && hourMinuteSecond(order.created_at)}
                                  </small>
                                </span>
                               
                              </div>
                              

                              <FileArchiver order={order} />
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="block lg:hidden">
                  <DashboardOrderMobile
                    totalPaginate={totalPaginate}
                    handlePerPageChange={handlePerPageChange}
                    perPage={perPage}
                    setDesc={setDesc}
                    desc={desc}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-start py-4">
              <CustomPaginator
                total={totalPages}
                initialPage={currentPage}
                onChange={handlePageChange}
                key={JSON.stringify(orders)}
              />
            </div>
          </>
        )}
      </div>

      <PdfBalancingImg pdfDiv={pdfDiv} />
    </div>
  );
};

export default DashboardOrder;