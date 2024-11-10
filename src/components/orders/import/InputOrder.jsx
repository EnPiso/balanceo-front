import React from 'react'
import {Input} from "@nextui-org/react";
import {FaPencil} from "react-icons/fa6";

const InputOrder = () => {
  return (
    <>
      <h3 className=" md:text-base font-semibold mb-4 capitalize mt-2">Código de orden</h3>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4 py-2">
        <Input
          type="text"
          //label="Código de orden"
          placeholder="Ordén"
          labelPlacement="outside"
          startContent={<FaPencil/>}
        />
      </div>
    </>
  )
}
export default InputOrder
