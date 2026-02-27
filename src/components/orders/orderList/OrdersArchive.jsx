import React, { useEffect, useState } from "react";
import { Spinner, Tooltip } from "@nextui-org/react";
import CustomPaginator from "../../../ui/CustomPaginator.jsx";
import PerPageSelector from "../../../ui/PerPageSelector.jsx";
import { fetchGetData } from "../../../infraestructure/call_api/crud.js";
import { urlMain } from "../../../infraestructure/data/const.js";
import { useRecoilState } from "recoil";
import { orderList, showOrderObj } from "../../../infraestructure/states/order_states.js";
import FileArchiver from "./FileArchiver.jsx";
import { FaDownLong, FaUpLong } from "react-icons/fa6";
import OrdersBreadcrumb from "./OrdersBreadcrumb.jsx";
import SearchArchive from "./SearchArchive.jsx";
import { AiFillDatabase, AiTwotoneStop } from "react-icons/ai";
import ColumnFilter from '../../../ui/ColumnFilter.jsx';


const OrdersArchive = ({ setIsArchive, isArchive }) => {
  const [orders, setOrders] = useRecoilState(orderList);
  const [showOrder, setShowOrder] = useRecoilState(showOrderObj);

  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [desc, setDesc] = useState(true);
  const [queryString, setQueryString] = useState("");
  const [queryDate, setQueryDate] = useState("");
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

  const fetchOrders = async (page, per_page, desc, is_order = true) => {
    setIsLoading(true);

    try {
      const formattedDate = queryDate ? queryDate.toString() : '';
      const filterParams = Object.entries(columnFilters)
        .filter(([_, f]) => f?.val)
        .map(([key, { op, val }]) => `&q[${key}_${op}]=${encodeURIComponent(val)}`)
        .join('');
      const result = await fetchGetData(
        `${urlMain}orders?page=${page}&is_order=${is_order}&archive=${true}&per_page=${per_page}&desc=${desc}&q[created_at_eq]=${encodeURIComponent(formattedDate)}&q[code_or_products_name_or_products_category_product_name_or_products_reference_cont]=${encodeURIComponent(queryString)}${filterParams}`
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

  useEffect(() => {
    fetchOrders(currentPage, perPage, desc);
  }, [queryDate, queryString, desc, currentPage, columnFilters]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (page) => {
    setPerPage(page);
    fetchOrders(1, page, desc);
  };

  return (
    <div>
      <div className="grow overflow-y-auto bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-100">
        {isLoading ? (
          <div className="flex items-center justify-center h-screen">
            <Spinner color="default" size="lg" />
          </div>
        ) : (
          <div>
            <OrdersBreadcrumb isArchive={isArchive} setIsArchive={setIsArchive} />

            <div className="flex justify-end items-center gap-4 px-4 pb-2">
              {Object.keys(columnFilters).length > 0 && (
                <button
                  onClick={() => { setColumnFilters({}); setCurrentPage(1); }}
                  className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1 transition-colors"
                >
                  ✕ Limpiar filtros de columna
                </button>
              )}
              <SearchArchive setQueryString={setQueryString} />
            </div>

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
                      Orden de producción
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
                  <th className="p-2 text-left font-medium uppercase">Creación</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-600 transition-colors">
                    <td className="p-2 border border-gray-100 dark:border-transparent">
                      <h4 className="font-bold text-lg uppercase">
                        {order.code}
                      </h4>
                    </td>
                    <td className="p-2 border border-gray-100 dark:border-transparent">
                      {order.products.map((product) => (
                        <span
                          key={product.id}
                          className="flex justify-between items-center hover:bg-zinc-200 dark:hover:bg-zinc-700 py-1 px-1"
                        >
                          <span>
                            {product.name}{" "}
                            <span className="font-bold">{product.reference}</span>
                          </span>
                          <span>
                            {product.has_opers_balancing
                              ? <AiFillDatabase className="text-secondary_two" />
                              : <AiTwotoneStop className="text-zinc-400" />
                            }
                          </span>
                        </span>
                      ))}
                    </td>
                    <td className="p-2 border border-gray-100 dark:border-transparent">
                      <span className="flex justify-between items-center">
                        <span className="text-zinc-700 dark:text-zinc-300">
                          {new Intl.DateTimeFormat("es-ES").format(new Date(order.created_at))}
                        </span>
                        <FileArchiver archive={true} order={order} />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end items-center gap-3 px-2 py-4">
              <CustomPaginator
                total={totalPages}
                initialPage={currentPage}
                onChange={handlePageChange}
              />
              <PerPageSelector perPage={perPage} onChange={handlePerPageChange} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersArchive;
