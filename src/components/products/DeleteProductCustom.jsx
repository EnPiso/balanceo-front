import {FaDeleteLeft} from "react-icons/fa6";
import React, {useState} from "react";
import {useRecoilState} from "recoil";
import {productsAll} from "../../infraestructure/states/states_product.js";
import {updateData} from "../../infraestructure/call_api/crud.js";
import {urlMain} from "../../infraestructure/data/const.js";
import toast from "react-hot-toast";
import {toastMessageCustom} from "../../infraestructure/data/toastMessage.js";
import ConfirmArchive from "../orders/orderList/ConfirmArchive.jsx";
import {Tooltip} from "@nextui-org/react";

const DeleteProductCustom = ({product}) => {
  const [products, setProducts] = useRecoilState(productsAll)

  const [isOpenConfirm,setIsOpenConfirm] = useState(false)
  const [isLoading,setIsLoading] = useState(false)
  const [selectProduct,setSelectProduct] = useState(null)


  const handleConfirm = (product) => {
  
    setSelectProduct(product)
    setIsOpenConfirm(true)
  }


  const handleSubmit = () => {
    setIsLoading(true)

    const data = {
      product: {
        id: selectProduct.id,
        activate: false,
        name: `${selectProduct.name} [${selectProduct.id}]`
      }
    }

    const id = selectProduct.id
    fetchApi(data,id)
  }

  const fetchApi = (data, id) => {

    const updateProduct = async (data,id) => {

      try {
        const result = await updateData(urlMain + `products/${id}/update_activate`, data)
        const updatedProducts = products.filter(product => product.id !== result.id);
        setProducts(updatedProducts)

        toast("El producto ha sido eliminado")
      } catch (error) {
        console.error('Error setting data', error);
      } finally {
        setIsLoading(false)
        setIsOpenConfirm(false)
      }
    };
    updateProduct(data, id)
  }

  return(
    <>
      <Tooltip content={"Eliminar producto"} placement={"top-start"}>
        <button
          className="px-4 py-2 rounded text-2xl "
          onClick={() => handleConfirm(product)} // Restablece el estado y carga todos los datos
        >
          <FaDeleteLeft color="red"/>
        </button>
      </Tooltip>


      <ConfirmArchive
        isOpen={isOpenConfirm}
        setIsOpen={setIsOpenConfirm}
        handleSubmit={handleSubmit}
        title={`¿Quieres eliminar?`}
        description={`${product.name}`}
        isLoading={isLoading}
      />
    </>
  )
}

export default DeleteProductCustom