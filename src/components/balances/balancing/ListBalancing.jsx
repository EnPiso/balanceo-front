import React, {useEffect, useState} from 'react'
import DynamicTable from "../../../ui/TableDynamic.jsx";
import useGetList from "../../../hooks/balances/useGetList.jsx";
import {useRecoilState} from "recoil";
import {allOperationsProduct, samSumOperation} from "../../../infraestructure/states/operation_states.js";
import {tableOperations} from "../../../infraestructure/data/tableOperations.js";
import {selectProduct} from "../../../infraestructure/states/states_product.js";
import TableOperations from "./TableOperations.jsx";
import ExampleBalance from "./ExampleBalance.jsx";
import BalancedOperationsTable from "./tableOperations/BalancedOperationsTable.jsx";

const ListBalancing = () => {
  const [operationsProduct, setOperationsProduct] = useRecoilState(allOperationsProduct)
  const [product, setProduct] = useRecoilState(selectProduct)

  const [samSum, setSamSum] = useRecoilState(samSumOperation);

  const { data, loading, error } = useGetList("/products/product_operations");

  // Actualizar el estado global cuando los datos estén disponibles
  useEffect(() => {

    if (data) {
      setOperationsProduct(data.operations);
      setProduct(data.product);
      setSamSum(data.sum_operations);
    }
  }, [data]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>

      {
        operationsProduct.length >= 1 && (
          <BalancedOperationsTable
            data={operationsProduct}
            samSum={samSum}
          />
        )
      }



    </>
  )
}
export default ListBalancing
