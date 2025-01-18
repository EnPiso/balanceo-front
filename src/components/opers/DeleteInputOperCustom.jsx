import {FaDeleteLeft} from "react-icons/fa6";
import React, {useState} from "react";
import {updateData} from "../../infraestructure/call_api/crud.js";
import {urlMain} from "../../infraestructure/data/const.js";
import toast from "react-hot-toast";
import {ConfirmOpen} from "../balances/balancing/sidebarForm/ConfirmOpers.jsx";
import {ConfirmDeleteOper} from "./ConfirmDeleteOper.jsx";

const DeleteInputOperCustom = ({oper, opers, setOpers}) => {

  const [isOpenConfirm,setIsOpenConfirm] = useState(false)

  const [isLoading,setIsLoading] = useState(false)

  const [operTemp,setOperTemp] = useState(null)
  const handleDelete = (operator) => {
    setIsLoading(true)

    const data = {
      oper: {
        active: false
      }
    }

    const updateActive = async (data,operator) => {

      try {
        const result = await updateData(urlMain + `opers/${operator.id}/update_Active`, data);

        const updatedOperarios = opers.filter(opera => opera.id !== operator.id);

        setOpers(updatedOperarios)
        setIsOpenConfirm(false)
        toast("El operario ha sido eliminado")
      } catch (error) {
        console.error("Error setting data", error);
      }finally {
        setIsLoading(false)
      }
    }
    updateActive(data, operator);
  }



  const handleConfirm = (oper) => {
    setOperTemp(oper)
    setIsOpenConfirm(true)
  }


  return(
    <>
      <button onClick={() => handleConfirm(oper)}>
        <FaDeleteLeft color="red" size={23} className="cursor-pointer"/>
      </button>
      {
        operTemp && <ConfirmDeleteOper
          isLoading={isLoading}
          isOpen={isOpenConfirm}
          setIsOpen={setIsOpenConfirm}
          handleSave={() => handleDelete(operTemp)}
          title={`¿Quieres Eliminar el operario?`}
          description={`${operTemp.name}`}
        />
      }

    </>

  )
}

export default DeleteInputOperCustom;