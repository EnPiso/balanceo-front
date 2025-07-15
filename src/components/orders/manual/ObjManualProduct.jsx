import React, { useState } from 'react'
import { fetchGetData } from '../../../infraestructure/call_api/crud';
import { urlMain } from '../../../infraestructure/data/const';
import { useRecoilState } from 'recoil';
import { newManualObj, operationsProductManual, selectManualObj } from '../../../infraestructure/states/operation_master_state';
import { formatDateRails } from '../../../ui/utils';
import { FaArrowCircleRight, FaMinus, FaPlus, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { FaCheck } from 'react-icons/fa6';
import { CircularProgress } from '@nextui-org/react';

const ObjManualProduct = ({product, dataSearchList}) => {
  const [operations, setOperations] = useRecoilState(operationsProductManual)
  const [selectObj, setSelectObj] = useRecoilState(selectManualObj)
  const [newManual, setNewManual] = useRecoilState(newManualObj)

  const [isLoading,setIsLoading] = useState(false)
  const [canContinue,setCanContinue] = useState(true)
  
  const handleProduct = (product) => {
    setIsLoading(true)
    const product_id = product.id
    
    setSelectObj(product)
    const getData = async () => {
      try {
        const result = await fetchGetData(`${urlMain}products/${product_id}/product_operations`);
        console.log(result);
        
        if(result.length === 0) {
          setCanContinue(false);
          toast.error("No se encontraron operaciones para este producto, para agregarlo debes crearlas primero.");
        }else {
          setCanContinue(true);
        }
        setOperations(result)
        
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setIsLoading(false)
      }
    };

    getData();

  }

  const handleSelectProduct = (e, product) => {
    e.stopPropagation(); // Detener la propagación del evento
    
    if(canContinue){
      // Actualizar el estado de newManual agregando el producto al array products si no existe
      const objUpdate = { product: product, operations: operations };
      setNewManual((prevState) => {
        const products = Array.isArray(prevState.products) ? prevState.products : [];
    
        // Verificar si el producto ya existe en el array
        const exists = products.some((p) => p.product.id === product.id);
        if (exists) {
          toast.error("El producto ya existe en la lista.");
          return prevState; // No agregar duplicados
        }
    
        // Agregar el producto si no existe
        const updatedProducts = [...products, objUpdate];
        toast.success("El producto se ha agregado correctamente.")
        return { ...prevState, products: updatedProducts };
      });
    } else{
      toast.error(`No se puede agregar ${product.name}, porque no tiene operaciones asociadas.`);
    }
  
    
  };

  return (
    <tr
      onClick={()=> handleProduct(product)}
      className="cursor-pointer odd:bg-white even:bg-gray-100 dark:odd:bg-gray-800 dark:even:bg-gray-900 text-gray-900 dark:text-white">
      <td className={`flex justify-between items-center uppercase ${selectObj && (selectObj.id === product.id) ? 'text-secondary_two' : ''} px-4 py-2 border border-gray-300 dark:border-gray-600 text-left font-bold`}>
        {
          isLoading ? <CircularProgress size='24' color='default'/> : product.name
        }  <span className="text-secondary_two">{product.reference}</span>
      </td> 
      {
        dataSearchList && !dataSearchList.original &&
        <>
          <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-left font-bold">
            {product.plant_module_name}
          </td>
          <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-left font-bold">
            {formatDateRails(product.created_at)}
          </td>
        </>
      }
      <td className="px-4  py-2 border border-gray-300 dark:border-gray-600 text-left font-bold">
        <span className="flex justify-center">
          
          {
            selectObj && (selectObj.id === product.id) ? 
              <button onClick={(e) => handleSelectProduct(e, product)}>
                {
                  canContinue ?
                    <FaPlus 
                      size={24}
                      className={`text-secondary_two`}/> :
                    <FaTimes 
                      size={24}
                      className={`text-zinc-400`}/>
                }
                
              </button> :
              <button>
                <FaCheck 
                  size={24}
                  className={`text-zinc-200`}/>
              </button>
          }
          
        </span>
        
      </td>
    </tr>
  )
}

export default ObjManualProduct