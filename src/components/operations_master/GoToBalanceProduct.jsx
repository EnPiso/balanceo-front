import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil';
import { orderObjBalancing, showOrderObj } from '../../infraestructure/states/order_states';
import { detailOperOperations } from '../../infraestructure/states/states_balancing';
import { selectProdPlant, selectProdPlantOriginal } from '../../infraestructure/states/opers_states';
import { goToBalance } from '../../infraestructure/states/operation_master_state';
import { fetchGetData } from '../../infraestructure/call_api/crud';
import { urlMain } from '../../infraestructure/data/const';
import { assignColorsToArray } from '../../ui/utils';

const GoToBalanceProduct = () => {

  const [showOrder, setShowOrder] = useRecoilState(showOrderObj);
  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);
  const [detailOperOpera, setDetailOperOpera] = useRecoilState(detailOperOperations);
  const [prodPlant, setProdPlant] = useRecoilState(selectProdPlant)
  const [prodPlantOriginal, setProdPlantOriginal] = useRecoilState(selectProdPlantOriginal)

  const [goToBalanceObj, setBoToBalanceObj] = useRecoilState(goToBalance)


  useEffect(()=> {
    if(goToBalanceObj){
      const product = goToBalanceObj.product
      handleBalancing(product)
    }
     
  }, [goToBalanceObj])
    

  const handleBalancing = (product) => {
      // setIsLoading(true)
      // balancings/show_balance
  
      const order_id = showOrder.order.id
      const product_id =  product.id
      const prod = product

      
      const getData = async () => {
        try {
          //setLoading(true);
          const result = await fetchGetData(`${urlMain}/balancings/show_balance?order_id=${order_id}&product_id=${product_id}`);
  
          const data = {
            product: prod.product,
            total_sam: prod.total_sam,
            operations: result.sorted_operations,
            balancing_id: result.balancing_id,
            balancing: result.balancing
          }
  
          const detail = assignColorsToArray(result.details_data)
  
          setDetailOperOpera(detail)
          setObjBalancing(data)
  
          if(result.data_plant){
            const dataPlant = {
              plant: {
                name: result.data_plant.production_plant.name,
                id: result.data_plant.production_plant.id
              },
              module: result.data_plant.production_module
            }
            setProdPlantOriginal(dataPlant)
          }
  
  
        } catch (error) {
          console.error('Error al obtener los datos:', error);
  
        } 
      };
  
      getData();
  
  
       //
  
    }


}

export default GoToBalanceProduct