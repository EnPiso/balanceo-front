import React, { useEffect, useRef, useState } from "react";
import { Spinner, Tooltip } from "@nextui-org/react";
import PerPageSelector from "../../../ui/PerPageSelector.jsx";

const totalPaginate = [5, 10, 20, 30, 40, 50];
import CustomPaginator from "../../../ui/CustomPaginator.jsx";
import { fetchGetData } from "../../../infraestructure/call_api/crud.js";
import { urlMain } from "../../../infraestructure/data/const.js";
import { useRecoilState } from "recoil";
import { orderList, showOrderObj } from "../../../infraestructure/states/order_states.js";
import FileArchiver from "./FileArchiver.jsx";
import { FaDownLong, FaFolderClosed, FaUpLong } from "react-icons/fa6";
import { FaDoorClosed, FaSearch, FaSearchLocation, FaWindowClose } from "react-icons/fa";
import ShowOrder from "../show/ShowOrder.jsx";
import OrderDetail from "../show/OrderDetail.jsx";
import { AiFillCheckCircle, AiFillDatabase, AiFillStop, AiOutlineSortDescending, AiTwotoneStop } from "react-icons/ai";
import GenerateImgPdf from "./GenerateImgPdf.jsx";
import PdfBalancingImg from "./PdfBalancingImg.jsx";
import { hourMinuteSecond, monthDayYear } from "../../../infraestructure/utils/dateFormat.js";
import SearchDashboardOrders from "./SearchOrdersCustom.jsx";
import SearchDateOrders from "./SearchDateOrders.jsx";
import { allOperationsProduct } from "../../../infraestructure/states/operation_states.js";
import { detailOperOperations, isCloneModal, numberCurrentPage } from "../../../infraestructure/states/states_balancing.js";
import { BsArrow90DegUp, BsArrowDown, BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";
import DashboardOrderMobile from "./responsive/DashboardOrderMobile.jsx";
import ModalCloneNew from "../../balances/balancing/cloneBalancings/ModalCloneNew.jsx";
import OrdersManualCreate from "../manual/OrdersManualCreate.jsx";
import { isModalManual, isModalProdBalancing, isOrderOrProduct, isShowCreateProdBal } from "../../../infraestructure/states/states_manual_order.js";
import ModalProductBalancing from "../isProduct/ModalProductBalancing.jsx";
import { currentUser } from "../../../infraestructure/states/states_views.js";
import TagCreateUserName from "../../../ui/TagCreateUserName.jsx";
import OrdersBreadcrumb from "./OrdersBreadcrumb.jsx";
import ColumnFilter from '../../../ui/ColumnFilter.jsx';


const DashboardOrder = ({ setIsArchive, isArchive, archive }) => {
  const [orders, setOrders] = useRecoilState(orderList);
  const [showOrder, setShowOrder] = useRecoilState(showOrderObj);
  const [detailOperOpera, setDetailOperOpera] = useRecoilState(detailOperOperations);

  const [isClone, setIsClone] = useRecoilState(isCloneModal)

  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useRecoilState(numberCurrentPage);
  const [isModalManualOrder, setIsModalManualOrder] = useRecoilState(isModalManual);
  const [modalProdBalancing, setModalProdBalancing] = useRecoilState(isModalProdBalancing);
  const [isShowCreate, setIsShowCreate] = useRecoilState(isShowCreateProdBal);
  
  // Página actual
  const [totalPages, setTotalPages] = useState(1); // Total de páginas
  const [perPage, setPerPage] = useState(10); // Total de páginas
  const [queryDate, setQueryDate] = useState(null); // Estado para el valor del input
  const [queryString, setQueryString] = useState("");
  const [desc, setDesc] = useState(true);
  const [isSearchVisible, setIsSearchVisible] = useState(false); // Estado para controlar la visibilidad de SearchDateOrders
  const pdfDiv = useRef(null);

  const [isOrderOr, setIsOrderOr] = useRecoilState(isOrderOrProduct);

  const [user, setUser] = useRecoilState(currentUser);
  const [columnFilters, setColumnFilters] = useState({});

  const applyColumnFilter = (key, op, val) => {
    setColumnFilters(prev => ({ ...prev, [key]: { op, val } }));
    setCurrentPage(1);
  };

  const clearColumnFilter = (key) => {
    setColumnFilters(prev => {
      const { [key]: _, ...rest } = prev;
      return rest;
    });
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchOrders(currentPage, perPage, desc, isOrderOr);
  }, [queryDate, queryString, columnFilters]);

  useEffect(() => {
    fetchOrders(currentPage, perPage, desc, isOrderOr);
  }, [desc, isOrderOr]);

  const fetchOrders = async (page, per_page, desc, is_order) => {
    setIsLoading(true);

    try {
      const formattedDate = queryDate ? queryDate.toString() : '';
      const stringSearch = queryString;
      const filterParams = Object.entries(columnFilters)
        .filter(([_, f]) => f?.val)
        .map(([key, { op, val }]) => `&q[${key}_${op}]=${encodeURIComponent(val)}`)
        .join('');

      const result = await fetchGetData(
        `${urlMain}orders?page=${page}&is_order=${is_order}&archive=${false}&per_page=${per_page}&desc=${desc}&q[created_at_eq]=${encodeURIComponent(formattedDate)}&q[code_or_products_name_or_products_category_product_name_or_products_reference_cont]=${encodeURIComponent(stringSearch)}${filterParams}`
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


  // order.products.map((product, i)
  // countTrue = arr.filter(item => item.has_opers_balancing === true).length;

  
  return (
    <div>
      <div className="grow overflow-y-auto bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-100">
        {!isLoading && (
          <>
          <div className="block lg:hidden">
            <div className="flex justify-between items-center">
            {!showOrder && (
              <h1 className="text-xl font-semibold py-6 uppercase text-secondary_one">
              Ordenes de producción
              </h1>
            )}
            {!showOrder && (
              <button
              onClick={toggleSearchVisibility}
              className="text-primary_one font-bold"
              >
              {isSearchVisible ? <FaWindowClose size={28}/> : <FaSearch size={28}/>}
              </button>
            )}
            </div>
          </div>

          {!user ? (
            <h3 className="text-secondary_one text-md font-semibold py-6">
            Ordenes de producción
            </h3>
          ) : (
            !showOrder && (
              <OrdersBreadcrumb
                isArchive={isArchive}
                setIsArchive={setIsArchive}
              />
            )
          )}
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
                    user={user}
                    isOrderOr={isOrderOr}
                    setIsOrderOr={setIsOrderOr}
                    setIsModalManualOrder={setIsModalManualOrder}
                    setIsShowCreate={setIsShowCreate}
                    setModalProdBalancing={setModalProdBalancing}
                  />
                  <table className="w-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-100 rounded-lg mt-2">
                    <thead>
                      <tr className="bg-transparent text-zinc-800 dark:text-zinc-400 border-b border-zinc-300 dark:border-zinc-600">
                        <th className="p-2 text-left font-medium uppercase">
                          <div className="flex items-center gap-1">
                            <Tooltip content={desc ? "Más recientes primero" : "Más antiguos primero"}>
                              <button
                                onClick={() => setDesc(!desc)}
                                className="p-1.5 rounded-md text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-secondary_two transition-colors"
                              >
                                {desc
                                  ? <FaDownLong size={14} className="text-secondary_two" />
                                  : <FaUpLong size={14} className="text-secondary_two" />
                                }
                              </button>
                            </Tooltip>
                            {isOrderOr ? 'Orden de producción' : 'Balanceo por producto'}
                            <ColumnFilter
                              column="Código"
                              filterKey="code"
                              onApply={applyColumnFilter}
                              onClear={clearColumnFilter}
                              active={!!columnFilters.code}
                              currentFilter={columnFilters.code}
                            />
                          </div>
                        </th>
                        <th className="p-2 text-left font-medium uppercase">
                          <div className="flex items-center gap-1">
                            Referencias
                            <ColumnFilter
                              column="Referencias"
                              filterKey="products_name"
                              onApply={applyColumnFilter}
                              onClear={clearColumnFilter}
                              active={!!columnFilters.products_name}
                              currentFilter={columnFilters.products_name}
                            />
                          </div>
                        </th>
                        <th className="p-2 text-left font-medium uppercase"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-600 transition-colors">
                          <td className="p-2 border border-gray-100 dark:border-transparent">
                            <ShowOrder order={order} />
                          </td>
                          <td className="p-2 border border-gray-100 dark:border-transparent">
                            {order.products.map((product, i) => (
                              <GenerateImgPdf
                                pdfDiv={pdfDiv}
                                order={order}
                                product={product}
                                key={i}
                              />
                            ))}
                          </td>
                          <td className="p-2 border border-gray-100 dark:border-transparent">
                            <span className="flex justify-between items-center">
                              <div className="flex justify-start items-center">
                                <span>
                                  {order.created_at && monthDayYear(order.created_at)}
                                  <small className="ml-2 font-bold text-zinc-700 dark:text-zinc-300">
                                    {order.created_at && hourMinuteSecond(order.created_at)}
                                  </small>
                                  
                                </span>
                                <small className="text-secondary_two ml-2">
                                  {
                                    order.user_name && 
                                      <TagCreateUserName
                                        user_name={order.user_name}/>
                                  }
                                
                                </small>
                              </div>
                              <span>
                                
                                {
                                  user && (user.role === 'admin' || user.role === 'supervisor') && 
                                    <FileArchiver order={order} />
                                }
                              </span>
                              
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
            <div className="flex justify-end items-center gap-3 px-2 py-4">
              <CustomPaginator
                total={totalPages}
                initialPage={currentPage}
                onChange={handlePageChange}
                key={currentPage}
              />
              <PerPageSelector perPage={perPage} onChange={handlePerPageChange} />
            </div>
          </>
        )}
      </div>

      <PdfBalancingImg pdfDiv={pdfDiv} />
      
        {
          isClone && 
            <ModalCloneNew
              isOpen={isClone}
              setIsOpen={setIsClone}
            />
        }

        {
          isModalManualOrder && 
            <OrdersManualCreate
              isOpen={isModalManualOrder}
              setIsOpen={setIsModalManualOrder} />
        }
        {
          modalProdBalancing && 
            <ModalProductBalancing
              isOpen={modalProdBalancing}
              setIsOpen={setModalProdBalancing} />
        }
    </div>
  );
};

export default DashboardOrder;