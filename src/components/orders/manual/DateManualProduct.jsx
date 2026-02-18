import { DatePicker } from '@nextui-org/react'
import React, { useState } from 'react'
import {getLocalTimeZone, today} from "@internationalized/date";
import { FaCalendarTimes } from 'react-icons/fa';


export const DateManualProduct = ({queryDate, setQueryDate, isOriginal}) => {

  const handleDateChange = (date) => {
    setQueryDate(date);
  };

 
  return (
    
      <div className="flex w-full md:w-auto items-center gap-2 mb-2">
        {/* Selector de Fecha */}
        <DatePicker
          isDisabled={isOriginal}
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
              onClick={() => !isOriginal && setQueryDate(null)}
        />
        }
        
      </div>

  )
}
