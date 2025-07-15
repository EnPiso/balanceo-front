import {FaBoxOpen, FaPlus} from "react-icons/fa";
import {Tooltip} from "@nextui-org/react";
import React, {useState} from "react";
import ModalOperationProduct from "./ModalOperationProduct.jsx";
import {isOpenModalProd, operationsProduct} from "../../infraestructure/states/operation_states.js";
import {useRecoilState} from "recoil";
import {fetchGetData} from "../../infraestructure/call_api/crud.js";
import {urlMain} from "../../infraestructure/data/const.js";
import { AiFillExperiment } from "react-icons/ai";

const ButtonOperProdCustom = ({product}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [operation, setOperation] = useState(null)

  const [operations, setOperations] = useRecoilState(operationsProduct)

  const handleOperations = (product) => {
    setIsOpen(true)
    setOperation(product)


    const product_id = product.id

    const getData = async () => {
      try {
        const result = await fetchGetData(`${urlMain}operations/operations_product?product_id=${product_id}`);

        const data = {
          product: product,
          operations: result
        }
        setOperations(data);

      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setIsLoading(false)
      }
    };

    getData();

  }





  return(
    <>
      <Tooltip content={"Agregar Operaciones"} placement={"top-start"}>
        <button
          className="px-4 py-2 rounded text-2xl "
          onClick={() => handleOperations(product)} // Restablece el estado y carga todos los datos
        >
          <FaPlus className="text-secondary_two"/>
        </button>
      </Tooltip>

      {
        isOpen && <ModalOperationProduct
          product={product}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          isLoading={isLoading}
        />
      }

    </>
  )
}

export default ButtonOperProdCustom;