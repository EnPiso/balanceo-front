import { Button, Tooltip } from '@nextui-org/react'
import { useEffect, useRef } from 'react'
import { FaClone } from 'react-icons/fa'
import { orderObjBalancing, showOrderObj } from '../../../../infraestructure/states/order_states'
import { useRecoilState } from 'recoil'
import toast from 'react-hot-toast'
import { fetchGetData, postDataToken } from '../../../../infraestructure/call_api/crud'
import { urlMain } from '../../../../infraestructure/data/const'
import { selectProduct } from '../../../../infraestructure/states/states_product'
import { allOperationsProduct, samSumOperation } from '../../../../infraestructure/states/operation_states'
import { detailOperOperations, goToUpdateBalance, isCloneModal } from '../../../../infraestructure/states/states_balancing'
import { checkOperationsBalancing } from '../../../../infraestructure/states/states_videos'
import { checkOpersPosition } from '../../../../infraestructure/states/opers_states'
import { zonesMobile } from '../../../../infraestructure/states/states_mobile'
import { tokenMemory } from '../../../../infraestructure/states/states_views'

const CloneBalancingDashboard = () => {

  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);
  const [showOrder, setShowOrder] = useRecoilState(showOrderObj);
  const [, setIsClone] = useRecoilState(isCloneModal)
  const [, setProduct] = useRecoilState(selectProduct)
  const [samSum, setSamSum] = useRecoilState(samSumOperation);
  const [, setToUpdateBalance] = useRecoilState(goToUpdateBalance)
  const [, setDetailOperOpera] = useRecoilState(detailOperOperations);
  const [, setSelOpeVideos] = useRecoilState(checkOperationsBalancing);
  const [operationsProduct, setOperationsProduct] = useRecoilState(allOperationsProduct)
  const [, setZonesOperUpdate] = useRecoilState(zonesMobile)
  const [, setSelectedOperDetails] = useRecoilState(checkOpersPosition);
  const [token] = useRecoilState(tokenMemory);

  const handleClone = () => {
    setIsClone(true)

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

    cloneOrder({
      order_id: showOrder.order.id,
      operations: JSON.stringify(operations)
    })
  }

  const cloneOrder = (data) => {
    const postDataOrder = async () => {
      try {
        const result = await postDataToken(urlMain + "/orders/create_order_clone", data, token)
        const product_name = objBalancing.product.name
        const resultFilter = result.products.find(prod => prod.product.name === product_name);
        const operationsFormat = resultFilter.operations.map((res) => ({
          ...res.operation,
          name: `${res.operation.operation}`
        }));
        const updateGoTo = {
          operations: operationsFormat,
          product: resultFilter.product,
          total_sam: samSum,
          orderId: result.order.id
        }

        // Fetch new order details directly — avoids flashing to the order list
        const newOrderData = await fetchGetData(`${urlMain}orders/${result.order.id}/show_order_details/`)

        // Transition directly to the new order's product list
        setShowOrder(newOrderData)
        setObjBalancing(null)
        setSelectedOperDetails([])
        setOperationsProduct([])
        setProduct(null)
        setSamSum(0)
        setDetailOperOpera([])
        setSelOpeVideos(null)
        setZonesOperUpdate([])
        setToUpdateBalance(updateGoTo)  // BalanceProduct auto-opens the matching balancing

        toast.success("Se ha clonado la orden y su productos correctamente")

      } catch (error) {
        console.error('Error setting data', error);
        setIsClone(false)
      }
    };

    postDataOrder();
  };



  const _cloneRef = useRef(null);
  _cloneRef.current = handleClone;

  useEffect(() => {
    const handleKey = (e) => {
      if (!e.ctrlKey || (e.key !== 'v' && e.key !== 'V')) return;
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;
      e.preventDefault();
      _cloneRef.current();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <>
      <Tooltip content={<span className="text-xs">Ctrl + V</span>} placement="right">
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