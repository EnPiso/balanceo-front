import React, {useState} from 'react'
import {FaStop} from "react-icons/fa";
import {Spinner, Tooltip} from "@nextui-org/react";
import {ConfirmOpen} from "../sidebarForm/ConfirmOpers.jsx";
import {postData} from "../../../../infraestructure/call_api/crud.js";
import {urlMain} from "../../../../infraestructure/data/const.js";
import {useRecoilState} from "recoil";
import {orderObjBalancing, showOrderObj} from "../../../../infraestructure/states/order_states.js";
import {selectOpers} from "../../../../infraestructure/states/opers_states.js";
import {detailOperOperations, listRedistributions} from "../../../../infraestructure/states/states_balancing.js";
import {samSumOperation} from "../../../../infraestructure/states/operation_states.js";
import {assignColorsToArray} from "../../../../ui/utils.js";
import toast from "react-hot-toast";
import {toastMessageCustom} from "../../../../infraestructure/data/toastMessage.js";

const OperationRedistribution = ({operation}) => {
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [objRed, setObjRed] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);
  const [showOrder, setShowOrder] = useRecoilState(showOrderObj);
  const [opersSelect, setOpersSelect] = useRecoilState(selectOpers)

  const [detailOperOpera, setDetailOperOpera] = useRecoilState(detailOperOperations);

  const [redistributions, setRedistributions] = useRecoilState(listRedistributions)



  const handleRedistribution = (e,operation) => {
    e.preventDefault()
    setObjRed(operation)
    setIsOpenConfirm(true)
  }

  const handleSave = () => {

    const data = {
      operations_balancings: {
        obj_balancing: objBalancing,
        obj_delete: objRed,
        operations: JSON.stringify(objBalancing.operations),
        opers_size: opersSelect.size,
        redistribution: true
      }
    }
    // delete_operation_balancing
    const deleteOperation = async (data) => {
      setIsLoading(true)

      try {
        const result = await postData(urlMain + "/operations_balancings/delete_operation_balancing", data)

        const detail = assignColorsToArray(result.details)
        setDetailOperOpera(detail)
        debugger
        // console.log(detailOperOpera)
        setObjBalancing((prevState) => ({
          ...prevState, // Copia el objeto actual
          operations: result.updated_operations, // Copia el array actual y agrega el nuevo elemento
          total_sam: result.total_sam
        }));
        setIsLoading(false)
        setRedistributions([...redistributions, result.redistribution_obj])
        toast.success(toastMessageCustom.operationsRedistri)
      } catch (error) {
        console.error('Error setting data', error);
      }
    };

    deleteOperation(data);
  }

  return (
    <>
      <Tooltip content="Redistribuir">
        <button className="mr-2">
          {
            isLoading ? <Spinner size="sm" /> :  <FaStop
              className="!cursor-pointer"
              size={20}
              onClick={(e) => handleRedistribution(e,operation)}
              color="#3b82f6"
            />
          }


        </button>
      </Tooltip>
      <ConfirmOpen
        isOpen={isOpenConfirm}
        setIsOpen={setIsOpenConfirm}
        handleSave={() => handleSave()}
        title={`¿Quieres redistribuir?`}
        description={`El sam de ${operation.operation} se redistribuye entre el % de participación en C/U de las operaciones`}
      />
    </>

  )
}
export default OperationRedistribution
