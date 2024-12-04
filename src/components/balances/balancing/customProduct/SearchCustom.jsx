import React from 'react'
import {Input} from "@nextui-org/react";
import {FaMagnifyingGlass} from "react-icons/fa6";

const SearchCustom = () => {

  return (
    <div>
      <Input
        variant="bordered"
        placeholder="Buscar operación"
        endContent={
          <button className="focus:outline-none" type="button" aria-label="toggle password visibility">
            <FaMagnifyingGlass/>
          </button>
        }
        className="max-w-xs"
      />
    </div>
  )
}
export default SearchCustom
