import React from "react";
import { Input } from "@nextui-org/react";

const InputNewTable = ({ handleChange, value, name, label }) => {
  return (
    <Input
      onChange={handleChange}
      value={value}
      name={name}
      label={label}
      type="text"
      clearable
    />
  );
};

export default InputNewTable;
