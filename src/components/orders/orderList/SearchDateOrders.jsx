import {DatePicker, Spinner, Tooltip} from "@nextui-org/react";
import {getLocalTimeZone, today} from "@internationalized/date";
import React, {useState} from "react";
import {FaBarcode, FaCalendarAlt, FaCalendarCheck, FaCalendarTimes, FaSearch} from "react-icons/fa";
import SearchOrdersCustom from "./SearchOrdersCustom.jsx";

const SearchDateOrders = ({queryDate, setQueryDate, isLoading, queryString, setQueryString}) => {


  const handleDateChange = (date) => {
    setQueryString("")
    setQueryDate(date);
    console.log("Fecha seleccionada:", date);
  };





  return (
    <div className="flex justify-end items-center bg-gradient-to-l from-zinc-100 to-zinc-200 py-2 mb-2 ">
    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 ml-2 justify-end">
      
        <SearchOrdersCustom
          setQueryDate={setQueryDate}
          queryString={queryString}
          setQueryString={setQueryString}
        />
      
        <DatePicker
          color={"default"}
          className="max-w-xs mr-5"
          // defaultValue={today(getLocalTimeZone()).add({days: -1})}
          label="Selecciona fecha"
          maxValue={today(getLocalTimeZone())}
          onChange={handleDateChange} // Escucha el cambio
          value={queryDate}
        />
        <div className="mt-3">
          
          <FaCalendarTimes
              color="gray"
              size={24}
              onClick={() => {
                // setIsDateLook(true)
                setQueryDate(null)
              }}/>

        </div>
      
    </div>


      <div className={"flex justify-end items-center"}>
        
      </div>
    </div>
  )
}

export default SearchDateOrders;