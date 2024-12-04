import React from 'react'
import {Input} from "@nextui-org/react";

const InputFormCustom = ({name,label,operation,setOperation}) => {

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Actualizar el estado dinámicamente basado en el 'name' del input
    setOperation((prevOperation) => ({
      ...prevOperation,
      [name]: value, // Usar el 'name' como clave para actualizar el valor
    }));
  };

  return (
    <div className="mr-2 mt-1 w-full">
      <Input
        onChange={handleChange}
        name={name}
        labelPlacement="inside"
        type="text"
        label={label} />
    </div>
  )
}
export default InputFormCustom
