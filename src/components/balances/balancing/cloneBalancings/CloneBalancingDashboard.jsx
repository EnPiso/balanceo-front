import { Button, Tooltip } from '@nextui-org/react'
import React, { useState } from 'react'
import { FaClone } from 'react-icons/fa'
import ModalCloneNew from './ModalCloneNew'
import { orderObjBalancing, showOrderObj } from '../../../../infraestructure/states/order_states'
import { useRecoilState } from 'recoil'
import toast from 'react-hot-toast'
import { postData } from '../../../../infraestructure/call_api/crud'
import { urlMain } from '../../../../infraestructure/data/const'
import { goToBalance } from '../../../../infraestructure/states/operation_master_state'
import { selectProduct } from '../../../../infraestructure/states/states_product'
import { allOperationsProduct, samSumOperation } from '../../../../infraestructure/states/operation_states'
import { detailOperOperations, goToUpdateBalance, isCloneModal } from '../../../../infraestructure/states/states_balancing'
import { checkOperationsBalancing } from '../../../../infraestructure/states/states_videos'
import { checkOpersPosition, selectProdPlantOriginal } from '../../../../infraestructure/states/opers_states'
import { zonesMobile } from '../../../../infraestructure/states/states_mobile'

const CloneBalancingDashboard = () => {

  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);

  const [showOrder, setShowOrder] = useRecoilState(showOrderObj);

  const [isClone, setIsClone] = useRecoilState(isCloneModal)

  const [product, setProduct] = useRecoilState(selectProduct)
  
  const [samSum, setSamSum] = useRecoilState(samSumOperation);

  const [toUpdateBalance, setToUpdateBalance] = useRecoilState(goToUpdateBalance)
  
  const [detailOperOpera, setDetailOperOpera] = useRecoilState(detailOperOperations);
  const [selOpeVideos, setSelOpeVideos] = useRecoilState(checkOperationsBalancing);
  const [operationsProduct, setOperationsProduct] = useRecoilState(allOperationsProduct)
  const [prodPlantOriginal, setProdPlantOriginal] = useRecoilState(selectProdPlantOriginal)
  const [zonesOperUpdate, setZonesOperUpdate] = useRecoilState(zonesMobile)
  const [selectedOperDetails, setSelectedOperDetails] = useRecoilState(checkOpersPosition); // Array con los detalles de cada selección
  

  const backward = (goToBalance) => {
    const showOrderProducts = showOrder.products

    const data = {
      operations: objBalancing.operations,
      product: product,
      total_sam: samSum
    }

    const product_id = product.id

    const productsUpdate = showOrderProducts.map(item => {
      // Compara el `product.id` del objeto actual con `product_id`
      if (item.product.id === product_id) {
        // Reemplaza el objeto completo con `data` si coincide
        return { ...data };
      }
      // Si no coincide, devuelve el objeto original
      return item;
    });

    const dataUpdate = {
      order: showOrder.order,
      products: productsUpdate
    }

    setShowOrder(dataUpdate)
    setObjBalancing(null)
    setSelectedOperDetails([])
    setOperationsProduct([])
    setProduct(null)
    setSamSum(0)
    setDetailOperOpera([])
    setSelOpeVideos(null)
    setZonesOperUpdate([])
    setShowOrder(null)
    setToUpdateBalance(goToBalance)
  }

  

  const handleClone = () => {
    setIsClone(true)
    
    console.log(operationsProduct)
   
    const product_id = objBalancing.product.id
    const formatOperation = (op, item) => ({
      ...op,
      garment: `${item.product.name} [${item.product.reference}] {${item.product.category_product_name}}`,
      reference: parseInt(item.product.reference),
      order: showOrder.order.code,
      name: op.operation ? op.operation : op.name,
      sam: parseFloat(op.sam),
    });
    
    const operations = showOrder.products.flatMap((item) => {
      return product_id === item.product.id
        ? operationsProduct.map((op) => formatOperation(op, item))
        : item.operations.map((op) => formatOperation(op, item));
    });


    const data = {
      order_id: showOrder.order.id,
      operations: JSON.stringify(operations)
    }
    cloneOrder(data)
  }

  const cloneOrder =  (data) => {

    const postDataOrder = async () => {
      try {
        const result = await postData(urlMain + "/orders/create_order_clone", data)
        const product_name = objBalancing.product.name
        const resultFilter = result.products.find(prod => prod.product.name === product_name);
        const updateOperations = resultFilter.operations.map((res)=> res.operation)
        const operationsFormat = updateOperations.map(operation => ({
          ...operation, // Conservar los parámetros existentes
          name: `${operation.operation}` // Agregar el campo `name` con `operation.operation`
        }));
        const updateGoTo = {
          operations: operationsFormat,
          product: resultFilter.product,
          total_sam: samSum,
          orderId: result.order.id
        }
        backward(updateGoTo) /// regresar para con go balancing actualizar el nuevo balancing
        
        toast.success("Se ha clonado la orden y su productos correctamente")
      
      } catch (error) {
        console.error('Error setting data', error);
        
      }
    };

    postDataOrder();

  };



  return (
    <>
      <Tooltip content="Clonar balanceo con su orden" placement="right">
        <Button
          className="ml-5 font-bold uppercase"
          onPress={handleClone}>
          Clonar
          <FaClone className='text-secondary_two'/>
        </Button>
      </Tooltip>
    </>
  )
}

export default CloneBalancingDashboard