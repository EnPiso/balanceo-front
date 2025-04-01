import {DatePicker, Spinner, Tooltip} from "@nextui-org/react";
import {getLocalTimeZone, today} from "@internationalized/date";
import React, {useState} from "react";
import {FaBarcode, FaCalendarAlt, FaCalendarCheck, FaCalendarTimes, FaReplyAll, FaSearch} from "react-icons/fa";
import SearchOrdersCustom from "./SearchOrdersCustom.jsx";

const SearchDateOrders = ({queryDate, setQueryDate, isLoading, queryString, setQueryString}) => {


  const handleDateChange = (date) => {
    setQueryString("")
    setQueryDate(date);
    console.log("Fecha seleccionada:", date);
  };





  return (
    <div className="flex flex-col md:flex-row md:justify-end items-center   py-2 px-4  gap-4">
      {/* Componente de Búsqueda */}
      <div>
        <button 
          onClick={()=> setQueryString("")}>
          <FaReplyAll size={25} className="text-secondary_two"/>
        </button>
      </div>

      <div className="w-full md:w-auto">
        <SearchOrdersCustom
          setQueryDate={setQueryDate}
          queryString={queryString}
          setQueryString={setQueryString}
        />
      </div>

      {/* Contenedor para DatePicker y FaCalendarTimes */}
      <div className="flex w-full md:w-auto items-center gap-2 mb-2">
        {/* Selector de Fecha */}
        <DatePicker
          color="default"
          className="flex-grow"
          label="Selecciona fecha"
          maxValue={today(getLocalTimeZone())}
          onChange={handleDateChange}
          value={queryDate}
        />

        {/* Botón para limpiar fecha */}

        {
          queryDate && 
            <FaCalendarTimes
              size={24}
              className="cursor-pointer text-gray-500 hover:text-red-500 transition"
              onClick={() => setQueryDate(null)}
        />
        }
       
         
        
      </div>
    </div>
  )
}

export default SearchDateOrders;