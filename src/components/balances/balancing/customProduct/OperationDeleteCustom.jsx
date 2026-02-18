import React, {useState} from 'react'
import {FaDeleteLeft} from "react-icons/fa6";
import {ConfirmOpen} from "../sidebarForm/ConfirmOpers.jsx";
import {Spinner, Tooltip} from "@nextui-org/react";
import {postData} from "../../../../infraestructure/call_api/crud.js";
import {urlMain} from "../../../../infraestructure/data/const.js";

import {useRecoilState} from "recoil";
import {orderObjBalancing, showOrderObj} from "../../../../infraestructure/states/order_states.js";
import {selectOpers} from "../../../../infraestructure/states/opers_states.js";
import {assignColorsToArray} from "../../../../ui/utils.js";
import toast from "react-hot-toast";
import {toastMessageCustom} from "../../../../infraestructure/data/toastMessage.js";
import {detailOperOperations} from "../../../../infraestructure/states/states_balancing.js";
import {samSumOperation} from "../../../../infraestructure/states/operation_states.js";
import {imageTableBalancing} from "../../../../infraestructure/states/states_product.js";
import {nameImageDateNow} from "../../../../infraestructure/utils/imagesFormat.js";

const OperationDeleteCustom = ({operation}) => {
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [objDelete, setObjDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);
  const [showOrder, setShowOrder] = useRecoilState(showOrderObj);
  const [opersSelect, setOpersSelect] = useRecoilState(selectOpers)

  const [detailOperOpera, setDetailOperOpera] = useRecoilState(detailOperOperations);
  const [samSum, setSamSum] = useRecoilState(samSumOperation);

  const [imageTable, setImageTable] = useRecoilState(imageTableBalancing)


  const handleDelete = (e, operation) => {
    e.preventDefault()
    setObjDelete(operation)
    setIsOpenConfirm(true)
  }

  const handleSave = () => {

    const data = {
      operations_balancings: {
        obj_balancing: objBalancing,
        obj_delete: objDelete,
        operations: JSON.stringify(objBalancing.operations),
        opers_size: opersSelect.size,
        redistribution: false
      }
    }

    // delete_operation_balancing
    const deleteOperation = async (data) => {
      setIsLoading(true)

      try {
        const result = await postData(urlMain + "/operations_balancings/delete_operation_balancing", data)

        const detail = assignColorsToArray(result.details)

        setDetailOperOpera(detail)
        toast.error(toastMessageCustom.operationsDragDelete)
      

        setObjBalancing((prevState) => ({
          ...prevState, // Copia el objeto actual
          operations: result.updated_operations, // Copia el array actual y agrega el nuevo elemento
          total_sam: result.total_sam
        }));

        setIsLoading(false)

        setTimeout(()=> {
          setImageTable(nameImageDateNow)
        },1000)

      } catch (error) {
        console.error('Error setting data', error);
      }
    };

    deleteOperation(data);
  }


  return (
    <>

      <Tooltip content="Eliminar operación" placement='left'>
        <button className="mr-2">
          {
            isLoading ? <Spinner size="sm" /> : <FaDeleteLeft
              className="!cursor-pointer text-red-500"
              size={20}
              onClick={(e) => handleDelete(e,operation)}
             
            />
          }

        </button>
     </Tooltip>

      <ConfirmOpen
        isOpen={isOpenConfirm}
        setIsOpen={setIsOpenConfirm}
        handleSave={() => handleSave()}
        title="¿Quieres eliminar la operación?"
        description={objDelete.operation}
      />
    </>

  )
}
export default OperationDeleteCustom
