import React,{useState,useEffect} from 'react'
import {DatePicker, Input, Tooltip} from "@nextui-org/react";
import {FaClosedCaptioning, FaMagnifyingGlass} from "react-icons/fa6";


const SearchOrdersCustom = ({queryString, setQueryString, setQueryDate}) => {

  const [searchData, setSearchData] = useState(""); // Estado para la búsqueda retrasada

  useEffect(()=> {
    if(searchData === ''){
      setQueryString(searchData)
      setQueryDate(null)
    }
  }, [searchData])
  

  const handleSearch = () => {
    setQueryString(searchData)
    setQueryDate(null)
  }


  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setQueryString(searchData)
      setQueryDate(null)
    }
  };

  return ( 
    <div className="w-full md:w-auto  px-1 py-1  rounded-lg">
      <Tooltip content="Buscar orden, producto, referencia o categoría (ENTER)">
        <Input
          size="sm"
          value={searchData}
          onKeyDown={handleKeyDown}
          onChange={(e) => setSearchData(e.target.value || "")}
          variant="bordered"
          placeholder="Buscar"
          className="w-full md:w-56"
          endContent={
            <button onClick={handleSearch} className="focus:outline-none">
              <FaMagnifyingGlass />
            </button>
          }
        />
      </Tooltip>
    </div>
  )
}
export default SearchOrdersCustom
