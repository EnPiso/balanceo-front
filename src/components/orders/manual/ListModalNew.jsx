import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil';
import { newManualObj } from '../../../infraestructure/states/operation_master_state';
import TableInsideManual from './TableInsideManual';
import { FaDeleteLeft } from 'react-icons/fa6';
import DeleteManualProduct from './DeleteManualProduct';

const ListModalNew = () => {
  const [newManual, setNewManual] = useRecoilState(newManualObj);
  
  return (
    <div>
      <table className="min-w-full border border-gray-300 dark:border-gray-600 mt-2">
              
        <thead className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
          <tr>
            <th className="px-4 py-2 border text-left border-gray-300 dark:border-gray-600 text-secondary_two">
            {newManual && newManual.products.length > 1 ? 'Productos' : 'Producto'}  
            </th>
            
            <th className="px-4 py-2 border text-right border-gray-300 dark:border-gray-600 text-secondary_two">
              <span className="font-bold">
                {newManual && newManual.products.length}
              </span>
            </th>
          </tr>
        </thead>  
         
        <tbody>
          { 
            newManual && newManual.products.map((product, i)=> {
              return(
                <tr
                  key={i}
                  className="cursor-pointer odd:bg-white even:bg-gray-100 dark:odd:bg-gray-800 dark:even:bg-gray-900 text-gray-900 dark:text-white">
                  <td className={`px-4 py-2 border border-gray-300 dark:border-gray-600 text-left font-bold`}>
                    <span>
                      {product.product.name}
                      <br />
                      {product.product.reference}
                      <br />
                      <DeleteManualProduct
                        product={product}
                      />
                     
                    </span>
                  </td>
                  <td>
                    <TableInsideManual
                      product={product}
                    />
                  </td>
                </tr> 
              )
            })
          }
          
        </tbody>
      </table>  
    </div>
  )
}

export default ListModalNew