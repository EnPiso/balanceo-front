import {useEffect} from "react";
import {Input} from "@nextui-org/react";
import {AiOutlineRight} from "react-icons/ai";

const FormDynamicField = ({ value, setState, valueDefault, onKeyDown, placeholder, error= false}) => {

  useEffect(() => {
    setState(valueDefault)
  }, []);
  const handleChange = (e) => {
    const val = e.target.value
    console.log(val)
    setState(val)
  }

  return(
    <>
      <Input
        isInvalid={error}
        placeholder={placeholder}
        endContent={<AiOutlineRight/>}
        onKeyDown={onKeyDown}
        onChange={(e)=> handleChange(e)}
        value={value}
        type="text" />
    </>
  )
}

export default FormDynamicField;