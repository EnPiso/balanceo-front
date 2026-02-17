import React,{useState,useEffect} from 'react'
import {DatePicker, Input, Tooltip} from "@nextui-org/react";
import {FaClosedCaptioning, FaMagnifyingGlass} from "react-icons/fa6";
import { FaReplyAll } from 'react-icons/fa';


const SearchArchive = ({setQueryString}) => {

  const [searchData, setSearchData] = useState(null); // Estado para la búsqueda retrasada

  useEffect(()=> {
    if(searchData === ''){
      setQueryString(searchData)
    }
  }, [searchData])
  

  const handleSearch = () => {
    setQueryString(searchData)
  }


  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setQueryString(searchData)
    }
  };

  return ( 
    <>
      

      <div className="flex flex-col md:flex-row md:justify-end items-center   py-2 px-4  gap-4">
        {/* Componente de Búsqueda */}
        <div>
          <Tooltip content="mostrar todas las ordenes">
            <button 
              onClick={()=> setQueryString("")}>
              <FaReplyAll size={25} className="text-secondary_two"/>
            </button>
          </Tooltip>
          
        </div>
  
        <div className="w-full md:w-auto">
          <div className="w-full md:w-auto  px-1 py-1  rounded-lg">
            <Tooltip content="Buscar orden, producto, referencia o categoría (ENTER)">
              <Input
                size="lg"
                value={searchData}
                onKeyDown={handleKeyDown}
                onChange={(e) => setSearchData(e.target.value)}
                variant="bordered"
                placeholder="Buscar"
                className="w-full md:w-64 bg-white rounded-full"
                endContent={
                  <button onClick={handleSearch} className="focus:outline-none">
                    <FaMagnifyingGlass />
                  </button>
                }
              />
            </Tooltip>
          </div>
        </div>
      </div>

    
    </>
    
  )
}
export default SearchArchive
