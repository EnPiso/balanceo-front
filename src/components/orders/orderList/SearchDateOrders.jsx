import {DatePicker, Switch, Tooltip} from "@nextui-org/react";
import {getLocalTimeZone, today} from "@internationalized/date";
import React from "react";
import {FaCalendarTimes, FaPlus, FaReplyAll} from "react-icons/fa";
import SearchOrdersCustom from "./SearchOrdersCustom.jsx";

const IconBtn = ({ onClick, tooltip, children }) => (
  <Tooltip content={tooltip}>
    <button
      onClick={onClick}
      className="p-1.5 rounded-md text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-secondary_two transition-colors"
    >
      {children}
    </button>
  </Tooltip>
);

const SearchDateOrders = ({
  queryDate, setQueryDate,
  queryString, setQueryString,
  user, isOrderOr, setIsOrderOr,
  setIsModalManualOrder, setIsShowCreate,
  setModalProdBalancing
}) => {

  const isAdmin = user && (user.role === 'admin' || user.role === 'supervisor');

  return (
    <div className="flex flex-col md:flex-row md:justify-between items-center py-2 px-4 gap-3">

      {/* Izquierda: toggle + botones de acción */}
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-2">
          <small className="text-zinc-500 dark:text-zinc-400 text-sm">
            {!isOrderOr ? "Ordenes de producción" : "Balanceos por producto"}
          </small>
          <Switch
            isSelected={isOrderOr}
            onValueChange={setIsOrderOr}
            color="default"
            size="sm"
          />
        </span>

        {!isOrderOr && isAdmin && (
          <IconBtn
            tooltip="Crear nuevo balanceo"
            onClick={() => { setModalProdBalancing(true); setIsShowCreate(true); }}
          >
            <FaPlus size={16} />
          </IconBtn>
        )}
      </div>

      {/* Derecha: filtros */}
      <div className="flex items-center gap-2">
        <IconBtn tooltip="Limpiar búsqueda" onClick={() => setQueryString("")}>
          <FaReplyAll size={16} />
        </IconBtn>

        <SearchOrdersCustom
          setQueryDate={setQueryDate}
          queryString={queryString}
          setQueryString={setQueryString}
        />

        <div className="flex items-center gap-1">
          <DatePicker
            color="default"
            size="sm"
            label="Fecha"
            maxValue={today(getLocalTimeZone())}
            onChange={(date) => { setQueryString(""); setQueryDate(date); }}
            value={queryDate}
          />
          {queryDate && (
            <IconBtn tooltip="Limpiar fecha" onClick={() => setQueryDate(null)}>
              <FaCalendarTimes size={16} className="text-red-400" />
            </IconBtn>
          )}
          {isAdmin && (
            <IconBtn
              tooltip="Crear nueva orden de producción"
              onClick={() => { setIsModalManualOrder(true); setIsShowCreate(false); }}
            >
              <FaPlus size={20} />
            </IconBtn>
          )}
        </div>
      </div>

    </div>
  )
}

export default SearchDateOrders;
