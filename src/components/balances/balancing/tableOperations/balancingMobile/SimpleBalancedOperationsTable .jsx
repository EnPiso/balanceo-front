
// components/SimpleBalancedOperationsTable.jsx
import React from 'react';

import { useRecoilState } from 'recoil';
import { allOperationsProduct } from '../../../../../infraestructure/states/operation_states';
import { balancingData, detailOperOperations } from '../../../../../infraestructure/states/states_balancing';
import { selectOpers } from '../../../../../infraestructure/states/opers_states';

const SimpleBalancedOperationsTable = ({ operationMap }) => {
  
  const [operationsProduct, setOperationsProduct] = useRecoilState(allOperationsProduct)
  const [balancing] = useRecoilState(balancingData);
  const [opersSelect] = useRecoilState(selectOpers);
  const [detailOperOpera] = useRecoilState(detailOperOperations);
  // Sample data structure that would typically come from Recoil states


  return (
    <div>
      {
        operationsProduct.map((item, i)=> {
          return(
            <>
              <div key={i}>
                <h1>
                  {item.operation}
                </h1>

                {
                  opersSelect.size >= 1 && balancing && (
                    <>
                      {
                        [...opersSelect].map((operatorId, index)=> {

                          const operatorDetail = detailOperOpera?.find(
                            (detail) =>
                              detail.oper_id === operatorId && // Coincidencia con `opers_balancing_id`
                              detail.detail.operations_balancing_id === item.operation_balancing_id // Coincidencia con `operations_balancing_id`
                          );
                          // Extrae `polyvalence`, o usa un valor predeterminado si no existe
                          const polyvalence = operatorDetail?.detail?.polyvalence || 100;
            
                          const color = operatorDetail?.detail?.color || "";
            
                          const samplingsCount = operatorDetail?.detail?.samplings_count || 0;

                          const operMap = operationMap.get(item.operation) || new Map()
                          return(
                            <>
                              {operMap.get(i)?.toFixed(2) || ''} 
                            </>
                          )
                        })
                      }
                    </>
                  )
                }
                
              </div>
            </>
          )
        })
      }
    </div>
  );
};

export default SimpleBalancedOperationsTable;