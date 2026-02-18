
import {Input} from "@nextui-org/react";
import {useEffect} from "react";
import {FaAdjust} from "react-icons/fa";
import {AiOutlineRight} from "react-icons/ai";

const InputFieldModule = ({ value, setState, valueDefault, onKeyDown}) => {

  useEffect(() => {
    setState(valueDefault)
  }, []);
  const handleChange = (e) => {
    const val = e.target.value
    setState(val)
  }

  return(
    <>
      <input
        onKeyDown={onKeyDown}
        onChange={(e)=> handleChange(e)}
        value={value}
        type="text"/>

    </>
  )
}

export default InputFieldModule;