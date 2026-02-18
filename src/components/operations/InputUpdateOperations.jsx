import { Input } from "@nextui-org/react";
import React from "react";

const InputUpdateOperations = ({
     operation,
     valueDefault,
     handleChange,
     label,
     setClose,
     name,
     handleSubmit}) => {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(operation)
      setClose();
    } else if (event.key === "Escape") {
      setClose();
    }
  };

  return (
    <Input
      name={name}
      defaultValue={valueDefault}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      label={label}
      type="text"
      className="w-full"
    />
  );
};

export default InputUpdateOperations;
