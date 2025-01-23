import React,{useState,useEffect} from 'react'
import {DatePicker, Input, Tooltip} from "@nextui-org/react";
import {FaClosedCaptioning, FaMagnifyingGlass} from "react-icons/fa6";


const SearchOrdersCustom = ({queryString, setQueryString, setQueryDate}) => {

  const [searchData, setSearchData] = useState(null); // Estado para la búsqueda retrasada

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
    <div className={"mr-3"}>
        <Tooltip content={"Buscar orden, producto , referencia ó categoría (ENTER)"}>
          <Input
            onKeyDown={handleKeyDown}
            size={"lg"}
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
            variant="bordered"
            placeholder="Buscar"
            endContent={
              <button
                onClick={handleSearch}
                className="focus:outline-none"
                type="button"
                aria-label="toggle password visibility">
                <FaMagnifyingGlass/>
              </button>
            }
            className="max-w-xs mr-5"
         />
        </Tooltip>
        
    </div>
  )
}
export default SearchOrdersCustom
