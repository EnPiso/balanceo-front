import {DatePicker, Spinner, Tooltip} from "@nextui-org/react";
import {getLocalTimeZone, today} from "@internationalized/date";
import React, {useState} from "react";
import {FaCalendarAlt, FaCalendarCheck, FaSearch} from "react-icons/fa";
import SearchOrdersCustom from "./SearchOrdersCustom.jsx";

const SearchDateOrders = ({queryDate, setQueryDate, isLoading, queryString, setQueryString}) => {

  const  [isDateLook, setIsDateLook] = useState(true)



  const handleDateChange = (date) => {
    setQueryString("")
    setQueryDate(date);
    console.log("Fecha seleccionada:", date);
  };


  return (
    <div className="flex justify-end items-center bg-gradient-to-l from-zinc-100 to-zinc-200 py-2 mb-2 ">
      <div className={"flex justify-end items-center"}>
        {
          isLoading ? <Spinner size={"lg"} color={"default"}/> : (
            <>
              {
                isDateLook ? <DatePicker
                  color={"default"}
                  className="max-w-xs mr-5"
                  // defaultValue={today(getLocalTimeZone()).add({days: -1})}
                  label="Selecciona fecha"
                  maxValue={today(getLocalTimeZone())}
                  onChange={handleDateChange} // Escucha el cambio
                  value={queryDate}
                /> : <SearchOrdersCustom
                       setQueryDate={setQueryDate}
                       queryString={queryString}
                       setQueryString={setQueryString}
                />

              }



              <div>

                <div className="mr-3">
                  {
                    isDateLook && <FaCalendarAlt size={17} onClick={() => setQueryDate(null)}/>
                  }

                </div>
                <div className="mt-2">
                  {
                    isDateLook ?
                      <FaSearch
                        color="green"
                        size={17}
                        onClick={() => {
                          setIsDateLook(false)
                        }}/> :
                      <FaCalendarCheck
                        color="green"
                        size={20}
                        onClick={() => {
                          setIsDateLook(true)
                          setQueryDate(null)
                        }}/>
                  }

                </div>

              </div>


            </>
          )
        }

      </div>
    </div>
  )
}

export default SearchDateOrders;