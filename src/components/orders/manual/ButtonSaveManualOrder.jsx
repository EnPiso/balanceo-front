import React, { useState, useEffect } from 'react';
import { FaSave } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import { newManualObj } from '../../../infraestructure/states/operation_master_state';
import { postData, postDataToken } from '../../../infraestructure/call_api/crud';
import { urlMain } from '../../../infraestructure/data/const';
import { orderList } from '../../../infraestructure/states/order_states';
import toast from 'react-hot-toast';
import { CircularProgress } from '@nextui-org/react';
import { tokenMemory } from '../../../infraestructure/states/states_views';

const ButtonSaveManualOrder = ({handleClean, image}) => {
  const [newManual] = useRecoilState(newManualObj);
  const [orders, setOrders] = useRecoilState(orderList);
  

  const [isValidate, setIsValidate] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [token, setToken] = useRecoilState(tokenMemory);

  useEffect(() => {
    // Validar que haya algo escrito en order y al menos un producto
    const isValid = newManual.order.trim() !== '' && newManual.products.length > 0;
    setIsValidate(isValid);
  }, [newManual]);

  const handleSave = async () => {
    setIsLoading(true);
  
    const order = newManual.order;
    const products = newManual.products;
  
    const combinedOperations = products.flatMap((product) =>
      product.operations.map((operation) => ({
        ...operation,
        garment: `${product.product.name} [${product.product.reference}] {${product.product.category_product_name}}`,
        reference: product.product.reference,
        sam: parseFloat(operation.sam),
        order: order,
      }))
    );
  
    let imageBase64 = null;
  
    if (image?.startsWith("blob:")) {
      try {
        imageBase64 = await blobUrlToBase64(image); // Aquí se convierte
      } catch (e) {
        console.error("No se pudo convertir la imagen blob:", e);
      }
    } else if (image?.startsWith("data:image")) {
      imageBase64 = image; // Ya es base64, úsala directamente
    }
  
    const data = {
      order: {
        orderProOpe: order,
        operationsData: JSON.stringify(combinedOperations),
        image: imageBase64,
      },
    };
  
    try {
      const result = await postDataToken(urlMain + "/orders/create_order", data, token);
      const order = result.order_products;
  
      setOrders([order, ...orders]);
      toast.success("La orden fue agregada con éxito");
      handleClean();
    } catch (error) {
      console.error("Error al guardar la orden", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  const blobUrlToBase64 = async (blobUrl) => {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
  
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result); // Resultado base64 con encabezado
      reader.onerror = reject;
      reader.readAsDataURL(blob); // Convierte el blob en data:image/...;base64,...
    });
  };

  return (
    <>
      {isValidate && (
        <>
          {
            isLoading ? 
              <CircularProgress 
                className="ml-3"
                size='lg' 
                color='success'/> : 
              <button 
                className="ml-3" 
                onClick={handleSave}>
                <FaSave 
                  className="text-secondary_two" 
                  size={30} />
              </button>
          }
        </>
        
      )}
    </>
  );
};

export default ButtonSaveManualOrder;