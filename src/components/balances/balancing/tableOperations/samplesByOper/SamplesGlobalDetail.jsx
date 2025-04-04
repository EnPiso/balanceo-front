import React from 'react'
import { useRecoilState } from 'recoil';
import { orderObjBalancing } from '../../../../../infraestructure/states/order_states';
import { checkOpersPosition, selectProdPlantOriginal } from '../../../../../infraestructure/states/opers_states';
import { allOperationsProduct } from '../../../../../infraestructure/states/operation_states';

const SamplesGlobalDetail = () => {
  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);
  const [prodPlantOriginal, setProdPlantOriginal] = useRecoilState(selectProdPlantOriginal)
  const [selectedOperDetails, setSelectedOperDetails] = useRecoilState(checkOpersPosition); 
  const [operationsProduct, setOperationsProduct] = useRecoilState(allOperationsProduct)

  return (
    <div>
      <div className="mt-4  flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-1 lg:space-y-0">
            
          <div className="py-1 mb-3">
            <h3 className="font-bold text-xl uppercase text-secondary_two lg:text-md flex justify-between items-center">
              <span className="bg-zinc-100">
                {"  " + objBalancing.product.name}
              </span>
            </h3>
            <h3 className="font-bold text-md capitalize text-secondary_two lg:text-md flex justify-between items-center mt-1">
              <span className="bg-zinc-100">
              Sam total: {objBalancing.total_sam}
              </span>
            </h3>
           <div className=" py-2 px-1 mt-2">
              <h3 className="font-bold uppercase text-secondary_two text-sm lg:text-md">
                Operarios 
              </h3>

              <div className="py-2">
                <p className="font-light text-zinc-800 capitalize">
                  <span className="bg-zinc-100">
                    {selectedOperDetails.map((oper) => oper.name).join(", ")}
                  </span>
                </p>
              </div>
              <h3 className="font-bold uppercase text-secondary_two text-sm lg:text-md">
                Operaciones 
              </h3>
              <div className=" py-2">
                <p className=" lowercase text-zinc-800 ">
                  <span className="bg-zinc-100">
                    {operationsProduct.map((operation) => operation.operation).join(", ")}
                  </span>
                </p>
              </div>
           </div>
          </div>
          
      </div>
    </div>
  )
}

export default SamplesGlobalDetail