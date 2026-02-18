import React, {useState} from 'react'
import {Spinner, Tooltip} from "@nextui-org/react";
import {FaCheckDouble, FaFileArchive} from "react-icons/fa";
import {ConfirmOpen} from "../../balances/balancing/sidebarForm/ConfirmOpers.jsx";
import ConfirmArchive from "./ConfirmArchive.jsx";
import {fetchGetData} from "../../../infraestructure/call_api/crud.js";
import {urlMain} from "../../../infraestructure/data/const.js";
import {useRecoilState} from "recoil";
import {orderList} from "../../../infraestructure/states/order_states.js";
import toast from "react-hot-toast";
import {toastMessageCustom} from "../../../infraestructure/data/toastMessage.js";
import {FaDeleteLeft, FaFile} from "react-icons/fa6";
import { ModalDeleteGlobal } from '../../opers/ModalDeleteGlobal.jsx';

const FileArchiver = ({order,archive}) => {
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [orders, setOrders] = useRecoilState(orderList);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true)
    const getData = async () => {
      try {
        //setLoading(true);
        const result = await fetchGetData(`${urlMain}/orders/${order.id}/archive_order/`);
       

        setOrders((prevItems) => prevItems.filter((item) => item.id !== result.id));
        toast(toastMessageCustom.archiveOrder)
        setIsOpenConfirm(false)
        setIsLoading(false)
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setIsLoading(false)
      } finally {
        setIsLoading(false)
      }
    };

    getData();

  }

  return (
    <>

      <ModalDeleteGlobal
        isLoading={isLoading}
        isOpen={isOpenConfirm}
        setIsOpen={setIsOpenConfirm}
        handleSave={handleSubmit}
        title={`¿Quieres ${archive ? "Activar" : "Eliminar"}?`}
        description={`${order.code}`}
      />
      <Tooltip content={`${archive ? 'Activar':'Eliminar'}`} placement="right-end">
        {
          isLoading ? <Spinner size="lg"/> : <button className="mr-2">
            {
              archive ? <FaCheckDouble
                className="!cursor-pointer text-secondary_two"
                size={20}
                onClick={() => setIsOpenConfirm(true)}
                
              /> : <FaDeleteLeft
                className="!cursor-pointer"
                size={20}
                onClick={() => setIsOpenConfirm(true)}
                color="red"
              />
            }

          </button>
        }

      </Tooltip>
    </>

  )
}
export default FileArchiver
