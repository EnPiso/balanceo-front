import {Input} from "@nextui-org/react";
import React from "react";

const InputTextCategory = ({label, placeholder, name, onChange, isInvalid, handleApi,setIsNew}) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleApi()
    }
    if (e.key === "Escape") {
      console.log("Escape pressed");
      setIsNew(false)
    }
  };
  return(
    <>
      <Input
        onKeyDown={handleKeyDown}
        isInvalid={isInvalid}
        name={name}
        className="max-w-[300px]"
        label={label}
        placeholder={placeholder}
        onChange={onChange} // Pasar el manejador
      />
    </>
  )
}

export default InputTextCategory;