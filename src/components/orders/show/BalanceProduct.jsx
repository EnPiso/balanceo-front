import React from 'react'
import {Button} from "@nextui-org/react";
import {FaCalendar} from "react-icons/fa6";
import {useRecoilState} from "recoil";
import {orderObjBalancing, showOrderObj} from "../../../infraestructure/states/order_states.js";
import {fetchGetData, postData} from "../../../infraestructure/call_api/crud.js";
import {urlMain} from "../../../infraestructure/data/const.js";
import {detailOperOperations} from "../../../infraestructure/states/states_balancing.js";
import {assignColorsToArray} from "../../../ui/utils.js";
import {selectProdPlant, selectProdPlantOriginal} from "../../../infraestructure/states/opers_states.js";

const BalanceProduct = ({product}) => {
  const [showOrder, setShowOrder] = useRecoilState(showOrderObj);
  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);
  const [detailOperOpera, setDetailOperOpera] = useRecoilState(detailOperOperations);
  const [prodPlant, setProdPlant] = useRecoilState(selectProdPlant)
  const [prodPlantOriginal, setProdPlantOriginal] = useRecoilState(selectProdPlantOriginal)

  const handleBalancing = (product) => {
    // balancings/show_balance

    const order_id = showOrder.order.id
    const product_id =  product.product.id
    const prod = product
    const getData = async () => {
      try {
        //setLoading(true);
        const result = await fetchGetData(`${urlMain}/balancings/show_balance?order_id=${order_id}&product_id=${product_id}`);

        const data = {
          product: prod.product,
          total_sam: prod.total_sam,
          operations: result.sorted_operations,
          balancing_id: result.balancing_id
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

      } finally {
        //setLoading(false);
      }
    };

    getData();


     //

  }

  return (
    <>
      <Button
        className="mt-2"
        onClick={() => handleBalancing(product)}
        color="default"
        endContent={<FaCalendar />}
      >
        Balancear {product.product.name}
      </Button>
    </>
  )
}
export default BalanceProduct
