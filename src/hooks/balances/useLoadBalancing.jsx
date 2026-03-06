import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { orderObjBalancing } from '../../infraestructure/states/order_states.js';
import { detailOperOperations } from '../../infraestructure/states/states_balancing.js';
import { selectProdPlantOriginal } from '../../infraestructure/states/opers_states.js';
import { samplingsCircleObj } from '../../infraestructure/states/states_mobile.js';
import { fetchGetData } from '../../infraestructure/call_api/crud.js';
import { urlMain } from '../../infraestructure/data/const.js';
import { assignColorsToArray } from '../../ui/utils.js';

export const useLoadBalancing = () => {
  const [, setObjBalancing] = useRecoilState(orderObjBalancing);
  const [, setDetailOperOpera] = useRecoilState(detailOperOperations);
  const [, setProdPlantOriginal] = useRecoilState(selectProdPlantOriginal);
  const [, setSamplingsGlobal] = useRecoilState(samplingsCircleObj);
  const [isLoading, setIsLoading] = useState(false);

  const loadBalancing = async (product, order_id) => {
    setIsLoading(true);
    const product_id = product.product.id;

    try {
      const result = await fetchGetData(
        `${urlMain}/balancings/show_balance?order_id=${order_id}&product_id=${product_id}`
      );

      const data = {
        product: product.product,
        total_sam: result.total_sam,
        operations: result.sorted_operations,
        balancing_id: result.balancing_id,
        balancing: result.balancing,
      };

      setDetailOperOpera(assignColorsToArray(result.details_data));
      setObjBalancing(data);

      if (result.data_plant) {
        setProdPlantOriginal({
          plant: {
            name: result.data_plant.production_plant.name,
            id: result.data_plant.production_plant.id,
          },
          module: result.data_plant.production_module,
        });
      }

      setSamplingsGlobal(result.samplings_cycles || null);
    } catch (error) {
      console.error('Error cargando balanceo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { loadBalancing, isLoading };
};
