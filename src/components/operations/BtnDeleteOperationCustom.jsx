import {Spinner, Tooltip} from "@nextui-org/react";
import {FaDeleteLeft} from "react-icons/fa6";
import React, {useState} from "react";
import {useRecoilState} from "recoil";
import {operationsProduct} from "../../infraestructure/states/operation_states.js";
import ConfirmArchive from "../orders/orderList/ConfirmArchive.jsx";
import {deleteData, postData, updateData} from "../../infraestructure/call_api/crud.js";
import {urlMain} from "../../infraestructure/data/const.js";
import toast from "react-hot-toast";

const BtnDeleteOperationCustom = ({operation}) => {
  const [isLoading, setIsloading] = useState(false)
  const [isOpenConfirm, setIsOpenConfirm] = useState(false)
  const [operations, setOperations] = useRecoilState(operationsProduct)

  const {product} = operations


  const handleDelete = () => {
    setIsOpenConfirm(true)
    handleApi(operation.id, product.id)
  }

  const handleApi = (operation_id, product_id) => {
    setIsloading(true)
    const data = {
      operation:{
        product_id: product_id,
        operation_id: operation_id
      }
    }
    const updatePlant = async () => {
      try {
        const result = await updateData(urlMain + `operations/delete_custom`, data)


        // Filtrar las operaciones eliminando la operación con el ID dado
        const updatedOperations = operations.operations.filter(
          (operation) => operation.id !== result.id
        );

        console.log(operations)

        // Actualizar el estado de las operaciones
        setOperations((prevOperations) => ({
          ...prevOperations,
          operations: updatedOperations,
        }));

        // Mostrar un mensaje de éxito
        setIsOpenConfirm(false)
        setIsloading(false)
        toast("La operación ha sido eliminada");
        // guardar imagen de la tabla del balanceo en product
      } catch (error) {
        console.error('Error setting data', error);
      }
    };

    updatePlant()
  }


  return(
    <>
      <Tooltip content="Eliminar operación">
        <button className="mr-2">
          {
            isLoading ? <Spinner size="sm" /> : <FaDeleteLeft
              className="!cursor-pointer"
              size={20}
              onClick={(e) => setIsOpenConfirm(true)}
              color="#e11d48"
            />
          }

        </button>
      </Tooltip>

      <ConfirmArchive
        isOpen={isOpenConfirm}
        setIsOpen={setIsOpenConfirm}
        handleSubmit={handleDelete}
        title={`¿ Quieres eliminar operación?`}
        description={`${operation.operation}`}
        isLoading={isLoading}
      />
    </>
  )
}


export default BtnDeleteOperationCustom;