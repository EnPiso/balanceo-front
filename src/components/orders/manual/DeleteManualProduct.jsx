import React from 'react'
import { FaDeleteLeft } from 'react-icons/fa6'
import { useRecoilState } from 'recoil';
import { newManualObj } from '../../../infraestructure/states/operation_master_state';
import toast from 'react-hot-toast';

const DeleteManualProduct = ({product}) => {
  const [newManual, setNewManual] = useRecoilState(newManualObj);

  const handleDelete = (product) => {
    const name = product.product.name
    setNewManual((prevState) => {
      const updatedProducts = prevState.products.filter(
        (p) => p.product.id !== product.product.id
      );
      return { ...prevState, products: updatedProducts };
    });
  
    toast(`Producto eliminado: ${name}`);
  };

  return (
    <button
      onClick={()=> handleDelete(product)}
    >
      <FaDeleteLeft size={24} color='red'/>
    </button>
  )
}

export default DeleteManualProduct