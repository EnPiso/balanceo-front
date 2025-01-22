import React,{useState,useEffect} from 'react'
import {DatePicker, Input} from "@nextui-org/react";
import {FaClosedCaptioning, FaMagnifyingGlass} from "react-icons/fa6";


const SearchOrdersCustom = ({queryString, setQueryString, setQueryDate}) => {

  const [searchData, setSearchData] = useState(""); // Estado para la búsqueda retrasada

const handleSearch = () => {
  // console.log(searchData)
  setQueryString(searchData)
  setQueryDate(null)
}


  return (
    <div className={"mr-3"}>

        <Input
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
    </div>
  )
}
export default SearchOrdersCustom
