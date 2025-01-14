import { Input } from "@nextui-org/react";
import React from "react";

const InputNewOperation = ({value, handleChange, label, name, errorSam}) => {

  return (
   <span>
     <Input
       value={value}
       name={name}
       onChange={handleChange}
       label={label}
       type="text"
       className="w-full"
     />

     {errorSam && (
       <span className="text-red-500 text-xs ml-2">{errorSam}</span>
     )}

   </span>
  );
};

export default InputNewOperation;
