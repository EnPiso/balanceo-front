import React, { memo } from "react";
import { Input } from "@nextui-org/react";

const InputFormCustom = memo(({ name, label, operation, setOperation, validateOperation, setIsValid }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setOperation((prevOperation) => {
      const updatedOperation = {
        ...prevOperation,
        [name]: value,
      };

      const errors = validateOperation(updatedOperation);
      setIsValid(Object.keys(errors).length === 0);

      return updatedOperation;
    });
  };

  return (
    <div className="mr-2 mt-1 w-full">
      <Input
        size="sm"
        value={operation[name] || ""} // Aquí asignamos el valor correspondiente
        onChange={handleChange}
        name={name}
        labelPlacement="outside"
        type="text"
        label={label}
      />
    </div>
  );
});

export default InputFormCustom;
