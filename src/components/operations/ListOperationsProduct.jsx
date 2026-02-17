import React, {useEffect, useState} from "react";
import {fetchGetData} from "../../infraestructure/call_api/crud.js";
import {urlMain} from "../../infraestructure/data/const.js";
import {useRecoilState} from "recoil";
import {cloneObjData, listOperationsClone, operationsProduct} from "../../infraestructure/states/operation_states.js";
import InputUpdateOperations from "./InputUpdateOperations.jsx";
import FormOperationProduction from "./FormOperationProduction.jsx";
import THeadNewOperation from "./THeadNewOperation.jsx";
import SearchCustom from "../balances/balancing/customProduct/SearchCustom.jsx";
import SearchCustomOperation from "./SearchCustomOperation.jsx";
import CloneCustom from "../balances/balancing/customProduct/CloneCustom.jsx";
import FormNewOperationCustom from "./FormNewOperationCustom.jsx";
import { isOperationClone } from "../../infraestructure/states/states_navigation.js";
import CloneOperationCustom from "./CloneOperationCustom.jsx";


const ListOperationsProduct = ({isNewOperation, setIsNewOperation}) => {
  const [operations, setOperations] = useRecoilState(operationsProduct)

  const [query, setQuery] = useState(""); // Estado para el valor del input

  const [showFormNew, setShowFormNew] = useState(false);

  const [cloneOperations, setCloneOperations] = useRecoilState(listOperationsClone);
  
  const [dataObj, setDataObjClone] = useRecoilState(cloneObjData);

  const [operationCloneIs, setOperationCloneIs] = useRecoilState(isOperationClone);
  

  const addOperation = (newOperation) => {
    setOperations((prevOperations) => {
      const updatedOperations = [...prevOperations, newOperation];
      return updatedOperations.map((op, idx) => ({
        ...op,
        operation_position: idx + 1, // Actualiza las posiciones
      }));
    });
  };
  
  return(
    <>

      <SearchCustomOperation
        showFormNew={showFormNew}
        setShowFormNew={setShowFormNew}
        query={query}
        setQuery={setQuery}
      />
      {
        showFormNew &&
          <FormNewOperationCustom/>
      }

      {
        cloneOperations.length >= 1 && 
          <CloneOperationCustom 
            setShowFormNew={setShowFormNew}
            cloneOperations={cloneOperations}
            setCloneOperations={setCloneOperations}
            addOperation={addOperation} />
      }

      <table className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-lg">

        <thead>
          <tr className="dark:bg-gray-100 text-zinc-800 dark:text-zinc-800 uppercase">
            <th className="p-1 text-left font-medium  flex justify-between items-center">
              <span>Operación</span>
              <span>{ operations && operations.operations && operations.operations.length }</span>
            </th>
            <th className="p-1 text-left font-medium">Máquina</th>
            <th
              className="p-1 text-left font-medium flex justify-between items-center">
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