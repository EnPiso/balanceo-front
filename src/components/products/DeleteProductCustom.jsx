import {FaDeleteLeft} from "react-icons/fa6";
import React from "react";
import {useRecoilState} from "recoil";
import {productsAll} from "../../infraestructure/states/states_product.js";
import {updateData} from "../../infraestructure/call_api/crud.js";
import {urlMain} from "../../infraestructure/data/const.js";
import toast from "react-hot-toast";
import {toastMessageCustom} from "../../infraestructure/data/toastMessage.js";

const DeleteProductCustom = ({product}) => {
  const [products, setProducts] = useRecoilState(productsAll)


  const handleClick = (product) => {

    const data = {
      product: {
        activate: false,
        name: `${product.name} [${product.id}]`
      }
    }

    const id = product.id

    fetchApi(data,id)
  }

  const fetchApi = (data, id) => {

    const updateProduct = async (data) => {
      try {
        const result = await updateData(urlMain + `products/${id}`, data)

        toast("El producto ha sido eliminado")
      } catch (error) {
        console.error('Error setting data', error);
      }
    };
    updateProduct()
  }

  return(
    <>
      <button
        className="px-4 py-2 rounded text-2xl"
        onClick={() => handleClick(product)} // Restablece el estado y carga todos los datos
      >
        <FaDeleteLeft color="red"/>
      </button>
    </>
  )
}

export default DeleteProductCustom