import { useEffect } from "react";
import { Input } from "@nextui-org/react";
import { AiOutlineRight } from "react-icons/ai";

const FormUserField = ({
  value,
  setState,
  valueDefault,
  onKeyDown,
  placeholder,
  error = false,
  type
}) => {
  useEffect(() => {
    setState(valueDefault || "");
  }, []);

  return (
    <Input
      isInvalid={error}
      placeholder={placeholder}
      endContent={<AiOutlineRight />}
      onKeyDown={onKeyDown}
      onChange={(e) => setState(e.target.value)}
      value={value}
      type={type}
    />
  );
};

export default FormUserField;
