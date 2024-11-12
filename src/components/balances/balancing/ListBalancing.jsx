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
import ExcelImageLoader from "../../orders/import/ExcelImageLoader.jsx";
import {orderObjBalancing} from "../../../infraestructure/states/order_states.js";
import SaveBalance from "../../orders/show/SaveBalance.jsx";

const ListBalancing = () => {
  const [operationsProduct, setOperationsProduct] = useRecoilState(allOperationsProduct)
  const [product, setProduct] = useRecoilState(selectProduct)

  const [samSum, setSamSum] = useRecoilState(samSumOperation);
  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);


 // const { data, loading, error } = useGetList("/products/product_operations");

  // Actualizar el estado global cuando los datos estén disponibles
  useEffect(() => {

    if (objBalancing) {
      setOperationsProduct(objBalancing.operations);
      setProduct(objBalancing.product);
      setSamSum(objBalancing.total_sam);
    }

  }, [ objBalancing]);

  // if (loading) return <div>Cargando...</div>;
  // if (error) return <div>Error: {error}</div>;

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

    <SaveBalance/>

    </>
  )
}
export default ListBalancing
