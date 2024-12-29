
import {Input} from "@nextui-org/react";
import {useEffect} from "react";
import {FaAdjust} from "react-icons/fa";
import {AiOutlineRight} from "react-icons/ai";

const FormEditInput = ({ value, setState, valueDefault, onKeyDown}) => {

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
                endContent={<AiOutlineRight/>}
                onKeyDown={onKeyDown}
                onChange={(e)=> handleChange(e)}
                value={value}
                type="text" />
        </>
    )
}

export default FormEditInput;