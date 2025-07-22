import React, { useState, useEffect } from 'react';
import { FaSave } from 'react-icons/fa';
import { useRecoilState } from 'recoil';

import toast from 'react-hot-toast';
import { CircularProgress } from '@nextui-org/react';
import { newManualObj } from '../../../infraestructure/states/operation_master_state';
import { orderList } from '../../../infraestructure/states/order_states';
import { postData } from '../../../infraestructure/call_api/crud';
import { urlMain } from '../../../infraestructure/data/const';
import CustomButton from '../../../ui/CustomButton';

const ButtonCreateProdOrder = ({handleClose, handleCloseMaster}) => {
  const [newManual] = useRecoilState(newManualObj);
  const [orders, setOrders] = useRecoilState(orderList);
  

  const [isValidate, setIsValidate] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Validar que haya algo escrito en order y al menos un producto
    const isValid = newManual.order.trim() !== '' && newManual.products.length > 0;
    setIsValidate(isValid);
  }, [newManual]);

  const handleSave = async () => {
    setIsLoading(true);
    
    const order = `${newManual.products[0].product.name}-balanceo`;
    const products = newManual.products;
    debugger
    const combinedOperations = products.flatMap((product) =>
      product.operations.map((operation) => ({
        ...operation,
        garment: `${product.product.name} [${product.product.reference}] {${product.product.category_product_name}}`,
        reference: product.product.reference,
        sam: parseFloat(operation.sam),
        order: order,
      }))
    );
    debugger
    const data = {
      order: {
        orderProOpe: order,
        isOrder: false,
        operationsData: JSON.stringify(combinedOperations)
      },
    };
  
    try {
      const result = await postData(urlMain + "/orders/create_order", data);
      const order = result.order_products;
  
      setOrders([order, ...orders]);
      toast.success("El balanceo fue agregado con éxito");
      handleClose();
      handleCloseMaster()
    } catch (error) {
      console.error("Error al guardar el balanceo", error);
    } finally {
      setIsLoading(false);
    }
  };
  


  return (
    <div className="flex justify-end items-center py-3">
      {
        isLoading ? 
          <CircularProgress 
            className="ml-3"
            size='lg' 
            color='default'/> : 
          
            <CustomButton
              color="default"
              variant="bordered"
              startContent={<FaSave className='text-secondary_two' />}
              onClick={handleSave}
              title="Crear balanceo"
            />
      }
        
    </div>
  );
};

export default ButtonCreateProdOrder;