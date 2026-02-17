import React, {useState} from 'react'
import {Input} from "@nextui-org/react";

import {updateData} from "../../../../infraestructure/call_api/crud.js";
import {urlMain} from "../../../../infraestructure/data/const.js";
import {useRecoilState} from "recoil";
import {allOperationsProduct} from "../../../../infraestructure/states/operation_states.js";

const PolyvalenceOperation = ({item}) => {
  const [operationsProduct, setOperationsProduct] = useRecoilState(allOperationsProduct)


  const [changePolyvalence,setChangePolyvalence] = useState(false)
  const [data,setData] = useState(null)
  const [polyvalence,setPolyvalence] = useState(0)

  const [isError,setIsError] = useState(false)
  const handlePolyvalence = (item) => {
    setChangePolyvalence(!changePolyvalence)
    setData(item)
  }

  const handleApi = (data) => {

    const postDataOrder = async (data) => {
      try {
        const result = await updateData(urlMain + "/balancings/update_polyvalence", data)
        // console.log(result)
        const id = result.id


        const updatedItems = operationsProduct.map((item) => ({ ...item })); // Copia profunda
        updatedItems.forEach((item) => {
          if (item.id === id) {
            item.polyvalence = result.polyvalence;
          }
        });
        setOperationsProduct(updatedItems)

      } catch (error) {
        console.error('Error setting data', error);
      }
    };

    postDataOrder(data);
  }

  const handleChangePol = (e) => {
    const value = e.target.value
    const num = parseInt(value)

    if(num){
      const regex = /^(100|[1-9][0-9]?)$/;
      // Validar el valor y actualizar el estado si es válido
      if (num === "" || regex.test(num)) {
        setIsError(false)
        setPolyvalence(value)
      }else{
        setIsError(true)
        setPolyvalence(0)
      }
    }else{
      setIsError(true)
      setPolyvalence(0)
    }



  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {

      if(!isError){
        const dataApi = {
          operationBalancing : {
            operation_balancing_id: data.operation_balancing_id,
            polyvalence: polyvalence
          }
        }
        handleApi(dataApi)
      }


    }
  };



  return (
    <td className="px-4 py-2 border border-gray-300 ">
      {
        changePolyvalence ? (
            <>
              <Input
                isClearable
                type="email"
                label="Polivalencia"
                variant="bordered"
                onChange={handleChangePol}
                onKeyDown={handleKeyDown}
                // placeholder="Enter your email"
                defaultValue={item.polyvalence}
                onClear={() => setChangePolyvalence(false)}
                className="max-w-xs"
              />
              {
                isError &&
                <p className="text-red-600 ml-1 mt-1">
                  <small>
                    Debe ser entre 1 y 100 %
                  </small>
                </p>
              }

            </>
        ) :
          <button onClick={()=> handlePolyvalence(item) }>
            <span className={`${item.polyvalence >= 1 ? 'font-bold':''}`}>
              {item.polyvalence}
              {item.polyvalence >= 1 && "%"}
            </span>

          </button>
      }

    </td>
  )
}
export default PolyvalenceOperation
