import {Input} from "@nextui-org/react";
import React from "react";

const InputNewCategory = ({name, setName, setValidate, isError}) => {

  const handleChange = (e) => {
    const value = e.target.value
    setName(value)
    setValidate(typeof value === 'string' && value.length > 2)
  }

  return(
    <>
      <Input
        isInvalid={isError}
        onChange={handleChange}
        value={name}
        label={isError ? "El nombre ya está en uso" : "Escribe la nueva categoría"}
        type="text" />
    </>
  )
}


export default InputNewCategory;