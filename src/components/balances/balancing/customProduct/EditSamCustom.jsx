import React, {useEffect, useState} from "react";
import {Input, Spinner, Tooltip} from "@nextui-org/react";
import {useRecoilState} from "recoil";
import {orderObjBalancing} from "../../../../infraestructure/states/order_states.js";
import {selectOpers} from "../../../../infraestructure/states/opers_states.js";
import {updateData} from "../../../../infraestructure/call_api/crud.js";
import {urlMain} from "../../../../infraestructure/data/const.js";
import {samSumOperation} from "../../../../infraestructure/states/operation_states.js";
import {detailOperOperations} from "../../../../infraestructure/states/states_balancing.js";
import {assignColorsToArray} from "../../../../ui/utils.js";
import toast from "react-hot-toast";
import {toastMessageCustom} from "../../../../infraestructure/data/toastMessage.js";
import {imageTableBalancing} from "../../../../infraestructure/states/states_product.js";
import {nameImageDateNow} from "../../../../infraestructure/utils/imagesFormat.js";

const EditSamCustom = ({ operation }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [sam, setSam] = useState(operation.sam); // Usa el valor inicial de `operation.sam`
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [operationUpdate, setOperationUpdate] = useState(null);

  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);
  const [opersSelect, setOpersSelect] = useRecoilState(selectOpers)

  const [samSum, setSamSum] = useRecoilState(samSumOperation);
  const [detailOperOpera, setDetailOperOpera] = useRecoilState(detailOperOperations);

  const [imageTable, setImageTable] = useRecoilState(imageTableBalancing)



  useEffect(() => {
    operation && setSam(operation.sam)
  }, [operation]);


  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleChangePol = (e) => {
    e.preventDefault();

    const value = e.target.value;
    setSam(value);

  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
        if(parseFloat(sam) || parseInt(sam)){
          const dataApi = {
            operations : {
              new_sam: sam,
              operation_sam: operation,
              obj_balancing: objBalancing,
              operations: JSON.stringify(objBalancing.operations),
              opers_size: opersSelect.size
            }
          }
          setIsError(false)

          handleData(dataApi, operation, sam);
        }else{
          setIsError(true)
        }

        // closeInput(); // Cierra el modo de edición después de guardar
    } else if (event.key === "Escape") {
      closeInput(); // Cierra el modo de edición si se presiona Escape
    }
  };

  const handleData = (data, operation, sam) => {
    setIsLoading(true)
    const updateSamOperation = async (data) => {
      try {
        const result = await updateData(urlMain + "/operations/operations_sam", data);

        const detail = assignColorsToArray(result.data_detail)
        setDetailOperOpera(detail)
        setSamSum(result.total_sam)
        // console.log(operation)
        const operation_update = {
          ...operation, // Copia todos los valores de "operation"
          sam: sam, // Sobrescribe "sam"
          sam_seg: sam * 60 // Sobrescribe "sam_seg"
        };

        setObjBalancing((prevBalancingObj) => ({
          ...prevBalancingObj, // Copia todas las propiedades de balancingObj
          total_sam: result.total_sam,
          operations: prevBalancingObj.operations.map((item) =>
            item.id === operation_update.id ? operation_update : item // Reemplaza solo el objeto que coincide
          )

        }));

        closeInput()

        toast.success(toastMessageCustom.updateSam)
        setIsLoading(false)
        setTimeout(()=> {
          setImageTable(nameImageDateNow)
        },1000)

      } catch (error) {
        console.error("Error setting data", error);
      }
    };

    updateSamOperation(data);
  }


  const closeInput = () => {
    setIsEdit(false);
    setSam(operation.sam); // Restaura el valor original de `sam`
    setIsError(false);
  };

  return (
    <td className="px-4 py-2 border border-gray-300">
      {isEdit ? (
        <>
          {
            isLoading ? <Spinner/> : <>

              <Input
                autoFocus
                isClearable
                type="text"
                variant="bordered"
                onChange={handleChangePol}
                onKeyDown={handleKeyDown}
                placeholder="Añade sam"
                value={sam} // Usa `value` para el input controlado
                onClear={closeInput}
                className="max-w-xs"
              />
              {
                isError &&
                <p className="text-red-600 font-bold ml-1 mt-1 text-sm">
                  <small>
                    Debe ser número válido
                  </small>
                </p>
              }

            </>
          }


        </>

      ) : (
        <Tooltip content="Click para editar sam" placement="right-end">
          <button onClick={handleEdit} className="cursor-pointer">
            {sam} {/* Muestra el valor actual de `sam` */}
          </button>
        </Tooltip>
      )}
    </td>
  );
};

export default EditSamCustom;
