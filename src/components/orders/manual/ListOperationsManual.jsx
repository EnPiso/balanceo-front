import React, { useEffect, useState } from 'react';

import ObjManualProduct from './ObjManualProduct';
import { useRecoilState } from 'recoil';
import { operationsProductManual } from '../../../infraestructure/states/operation_master_state';

const ListOperationsManual = () => {
  const [operations, setOperations] = useRecoilState(operationsProductManual)



  return <div>
    <table className="min-w-full border border-gray-300 dark:border-gray-600 mt-2">
                {/* Encabezados */}
      {
        operations.length >= 1 && (
          <thead className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
            <tr>
              <th className="px-4 py-2 border text-left border-gray-300 dark:border-gray-600 text-secondary_two">
                Operación
              </th>
             
            </tr>
          </thead>  
        )
      }
                
                
      
      <tbody>
      
          {
            operations.map((operation, i)=> {
              return(
                <tr
                  className=" uppercase odd:bg-white even:bg-gray-100 dark:odd:bg-gray-800 dark:even:bg-gray-900 text-gray-900 dark:text-white">
                  <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-left font-bold">
                    {operation.operation}
                  </td>
                  
                </tr>
              )
            })
          }
        

        
          
      </tbody>
    </table>
  </div>;
};

export default ListOperationsManual;