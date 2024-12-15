import React, {useRef, useState, useEffect} from 'react'
import {Badge, Button, Chip, Input, Tooltip} from "@nextui-org/react";
import {updateData} from "../../../../infraestructure/call_api/crud.js";
import {urlMain} from "../../../../infraestructure/data/const.js";
import toast from "react-hot-toast";
import {toastMessageCustom} from "../../../../infraestructure/data/toastMessage.js";
import {useRecoilState} from "recoil";
import {balancingData, detailOperOperations} from "../../../../infraestructure/states/states_balancing.js";
import {assignColorsToArray} from "../../../../ui/utils.js";
import {FaShirt} from "react-icons/fa6";

const PolyOperOperation = ({selectedOperDetails, operatorTimes, item, i,polyvalenceDetail, color}) => {
  const [changePolyvalence,setChangePolyvalence] = useState(false)
  const [data,setData] = useState(null)
  const [polyvalence,setPolyvalence] = useState(0)

  const [isError,setIsError] = useState(false)

  const [detailOperOpera, setDetailOperOpera] = useRecoilState(detailOperOperations);

  const [balancing, setBalancing] = useRecoilState(balancingData);


  const inputRef = useRef(null)
  const handlePolyvalence = (selectedOperDetails, item) => {
    const itemData = {
      selectedOperDetails: selectedOperDetails,
      item: item
    }
    setChangePolyvalence(!changePolyvalence)
    setData(itemData)
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
            data: data,
            polyvalence: polyvalence
          }
        }
        handlePolyvalenceApi(dataApi)
      }
    }else if ((event.key === "Escape")){
      closeInput()
    }
  };

  const closeInput = () => {
    setChangePolyvalence(false)
    setData(null)
    setPolyvalence(0)
    setIsError(false)
  }


  useEffect(() => {
    changePolyvalence && inputRef.current.focus();
  }, [changePolyvalence]);
  const handlePolyvalenceApi = (data) => {


    const updateDataOrder = async (data) => {
      try {
          const result = await updateData(urlMain + "/detail_oper_operations/update_polyvalence", data)

        // Función para actualizar el array
        const updatedArray = detailOperOpera.map((item) => {
          if (item.detail.id === result.id) {
            // Reemplaza el detail completamente con los datos de result
            return {
              ...item,
              detail: { ...item.detail, ...result },
            };
          }
          return item; // Devuelve el objeto original si no coincide
        });
        const detail = assignColorsToArray(updatedArray)
        setDetailOperOpera(detail)
        toast.success(toastMessageCustom.updatePolyvalence)
        setChangePolyvalence(false)


      } catch (error) {
        console.error('Error setting data', error);
      }
    };

    updateDataOrder(data);
  }



  return (
    <td
      key={`operator-time-${i}`}
      className={`px-4 py-2 border border-gray-300 `}
      style={{backgroundColor: operatorTimes.get(i)?.toFixed(2) ? color: ''}}
    >

      {
        changePolyvalence ? (
          <>
            <Tooltip content="ENTER / ESC" offset={20}>
              <Input
                ref={inputRef}
                isClearable
                type="text"
                label={`Tiempo ${operatorTimes.get(i)?.toFixed(2) || '-'}`}
                variant="bordered"
                onChange={handleChangePol}
                onKeyDown={handleKeyDown}
                placeholder="Añade polivalencia"
                //defaultValue={item.polyvalence}
                onClear={closeInput}
                className="max-w-xs"
              />
            </Tooltip>

            {
              isError &&
              <p className="text-red-600 ml-1 mt-1">
                <small>
                  Debe ser entre 1 y 100 %
                </small>
              </p>
            }

          </>
        ) : (
          <>
            {
              operatorTimes.get(i)?.toFixed(2) &&

              <div
                className="flex justify-around cursor-pointer"
                onClick={()=> {
                  if(!item.redistribution && operatorTimes.get(i)?.toFixed(2)) {
                    handlePolyvalence(selectedOperDetails[i], item)
                    // console.log(selectedOperDetails[i], item)
                  }
                }}>
                <div>

                  <span className={`${item.redistribution && "text-red-600"}`}>
                    {operatorTimes.get(i)?.toFixed(2) || ''}
                  </span>

                </div>
                <div>
                  {
                    !item.redistribution && <Tooltip content="Polivalencia %" offset={20}>
                      <Chip>{polyvalenceDetail} %</Chip>
                    </Tooltip>
                  }



                </div>
                <div>
                  {item.is_repeat &&
                    balancing && (
                      <>
                        <Chip
                          variant="flat"
                          avatar={
                            <FaShirt
                              className="fill-current"
                              size={10} />
                          }
                        >
                          {
                            Math.round(parseFloat((balancing.gol_hour / (item.sam * balancing.gol_hour).toFixed(2)) * operatorTimes.get(i)?.toFixed(2)).toFixed(2))
                          }

                        </Chip>

                      </>
                    )
                  }

                </div>

              </div>

            }

          </>
        )

      }


    </td>
  )
}
export default PolyOperOperation
