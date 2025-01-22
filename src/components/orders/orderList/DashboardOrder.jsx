import React, { useEffect, useRef, useState } from "react";
import {Card, CardHeader, CardBody, Image, Spinner, Tooltip} from "@nextui-org/react";
import CustomPaginator from "../../../ui/CustomPaginator.jsx";
import { fetchGetData } from "../../../infraestructure/call_api/crud.js";
import { urlMain } from "../../../infraestructure/data/const.js";
import { useRecoilState } from "recoil";
import {orderList, showOrderObj} from "../../../infraestructure/states/order_states.js";
import FileArchiver from "./FileArchiver.jsx";
import {FaFile} from "react-icons/fa6";
import {FaFileArchive} from "react-icons/fa";
import ShowOrder from "../show/ShowOrder.jsx";
import OrderDetail from "../show/OrderDetail.jsx";
import {AiFillCheckCircle, AiFillDatabase, AiFillStop, AiTwotoneStop} from "react-icons/ai";
import GenerateImgPdf from "./GenerateImgPdf.jsx";
import PdfBalancingImg from "./PdfBalancingImg.jsx";
import {hourMinuteSecond, monthDayYear} from "../../../infraestructure/utils/dateFormat.js";
import SearchDashboardOrders from "./SearchOrdersCustom.jsx";
import SearchDateOrders from "./SearchDateOrders.jsx";




const totalPaginate = [10,20,30,40,50]


const DashboardOrder = ({setIsArchive, isArchive, archive}) => {
  const [orders, setOrders] = useRecoilState(orderList);
  const [showOrder, setShowOrder] = useRecoilState(showOrderObj);

  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [totalPages, setTotalPages] = useState(1); // Total de páginas
  const [perPage, setPerPage] = useState(10); // Total de páginas

  const [queryDate, setQueryDate] = useState(null); // Estado para el valor del input

  const [queryString, setQueryString] = useState("");



  const pdfDiv = useRef(null)



  useEffect(() => {
    fetchOrders(currentPage, perPage)
  }, [queryDate,queryString]);

  const fetchOrders = async (page, per_page) => {
    setIsLoading(true);
    try {
      const formattedDate = queryDate ? queryDate.toString() : '';
      const stringSearch = queryString

      const result = await fetchGetData(`${urlMain}orders?page=${page}&archive=${false}&per_page=${per_page}&q[created_at_eq]=${encodeURIComponent(formattedDate)}&q[code_cont]=${encodeURIComponent(stringSearch)}`);
      setOrders(result.orders);
      setTotalPages(result.total_pages);
      setCurrentPage(result.current_page);
      // setQueryString("")
      // setQueryDate(null)
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    } finally {
      setIsLoading(false);
    }
  };


  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchOrders(page, perPage);
  };

  const handlePerPageChange = (page) => {

    setPerPage(page)
    fetchOrders(1,page);
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

                  <SearchDateOrders
                    queryString={queryString}
                    setQueryString={setQueryString}
                    queryDate={queryDate}
                    setQueryDate={setQueryDate}
                    isLoading={isLoading}
                  />
                  <span className="flex justify-start items-center">


                    <button
                      onClick={()=> setIsArchive(false)}>
                      <h3
                        className="text-md font-semibold mb-4 hover:text-zinc-500 flex justify-between hover:underline uppercase">
                        Ordenes
                        <FaFile
                            color="green"
                            className="mt-1 ml-1"/>
                      </h3>
                    </button>
                    <button
                      onClick={()=> setIsArchive(true)}
                      className="ml-4">
                      <h3
                        className="text-md  mb-4 hover:text-zinc-500 flex justify-between hover:underline  ">
                        Archivadas
                        <FaFileArchive
                            color="red"
                            className="mt-1 ml-1"/>
                      </h3>
                    </button>
                  </span>

                  <table className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-lg shadow-md border border-gray-300">
                    <thead>
                    <tr className="dark:bg-gray-100 bg-zinc-800 text-zinc-100 dark:text-zinc-800">
                      <th className="p-4 text-left font-medium border border-gray-300">Orden de producción</th>
                      <th className="p-4 text-left font-medium border border-gray-300">Referencias</th>
                      <th className="p-4 text-left font-medium border border-gray-300  flex justify-between items-center">
                        <span>Creación</span>
                        <Tooltip content="Cantidad de balanceos">
                          <span className="flex space-x-2">

                            {
                              totalPaginate.map((page, i) => {
                                return (
                                    <>
                                        <span
                                            onClick={() => handlePerPageChange(page)}
                                            className={`cursor-pointer ${perPage === page && 'text-green-600'}`}
                                            key={i}>
                                          {page}
                                        </span>
                                    </>
                                )
                              })
                            }

                          </span>
                        </Tooltip>

                      </th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                          <td className="p-4 border border-gray-300">
                            <ShowOrder order={order}/>

                          </td>
                          <td className="p-4 border border-gray-300">
                            {order.products.map((product, i) => (
                                <>
                                  <GenerateImgPdf
                                      pdfDiv={pdfDiv}
                                      order={order}
                                      product={product}
                                      key={i}
                              />

                            </>
                          ))}
                        </td>
                        <td className="p-4 border border-gray-300">

                          <span className="flex justify-between items-center">
                            <span>

                              {
                                order.created_at && monthDayYear(order.created_at)
                              }


                              <small className="ml-2 font-bold text-black">
                                 {
                                     order.created_at && hourMinuteSecond(order.created_at)
                                 }

                              </small>
                            </span>



                            <FileArchiver
                                order={order}
                            />
                          </span>
                        </td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
              )}


              <div className="flex justify-start py-4">
                <CustomPaginator
                  total={totalPages}
                  initialPage={currentPage}
                  onChange={handlePageChange}
                />
              </div>
            </>
          )
        }



      </div>


    <PdfBalancingImg
        pdfDiv={pdfDiv}
    />

    </div>
  );
};

export default DashboardOrder;
