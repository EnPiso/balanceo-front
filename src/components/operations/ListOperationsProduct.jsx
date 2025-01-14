import React, {useEffect, useState} from "react";
import {fetchGetData} from "../../infraestructure/call_api/crud.js";
import {urlMain} from "../../infraestructure/data/const.js";
import {useRecoilState} from "recoil";
import {operationsProduct} from "../../infraestructure/states/operation_states.js";
import InputUpdateOperations from "./InputUpdateOperations.jsx";
import FormOperationProduction from "./FormOperationProduction.jsx";
import THeadNewOperation from "./THeadNewOperation.jsx";


const ListOperationsProduct = ({isNewOperation, setIsNewOperation}) => {
  const [operations, setOperations] = useRecoilState(operationsProduct)


  return(
    <>
      <table className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-lg shadow-md border border-gray-300">

        {isNewOperation && <THeadNewOperation/>}



              <thead>
                <tr className="dark:bg-gray-100 bg-zinc-800 text-zinc-100 dark:text-zinc-800 uppercase">
                  <th className="p-1 text-left font-medium border border-gray-300 flex justify-between items-center">
                    <span>Operación</span>
                    <span>{ operations && operations.operations && operations.operations.length }</span>
                  </th>
                  <th className="p-1 text-left font-medium border border-gray-300">Máquina</th>
                  <th
                    className="p-1 text-left font-medium border border-gray-300  flex justify-between items-center">
                    <span>Sam</span>
                  </th>
                </tr>
              </thead>
              <tbody>
              {
                operations && operations.operations && operations.operations.map((operation, i)=> {
                  return(
                   <FormOperationProduction
                    key={i}
                    operation={operation}
                   />
                  )
                })
              }

              </tbody>
      </table>

    </>
  )
}

export default ListOperationsProduct;