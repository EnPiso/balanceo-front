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
import {orderObjBalancing, showOrderObj} from "../../../infraestructure/states/order_states.js";
import SaveBalance from "../../orders/show/SaveBalance.jsx";
import {postData} from "../../../infraestructure/call_api/crud.js";
import {urlMain} from "../../../infraestructure/data/const.js";
import {detailOperOperations} from "../../../infraestructure/states/states_balancing.js";
import {checkOpersPosition} from "../../../infraestructure/states/opers_states.js";
import ImageLightbox from "../../orders/import/ImageLightBox.jsx";

const ListBalancing = () => {
  const [operationsProduct, setOperationsProduct] = useRecoilState(allOperationsProduct)
  const [product, setProduct] = useRecoilState(selectProduct)

  const [samSum, setSamSum] = useRecoilState(samSumOperation);
  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);

  const [detailOperOpera, setDetailOperOpera] = useRecoilState(detailOperOperations);
  const [selectedOperDetails, setSelectedOperDetails] = useRecoilState(checkOpersPosition); // Array con los detalles de cada selección
  const [showOrder, setShowOrder] = useRecoilState(showOrderObj);


  // const { data, loading, error } = useGetList("/products/product_operations");

  // Actualizar el estado global cuando los datos estén disponibles
  useEffect(() => {

    if (objBalancing) {
      setOperationsProduct(objBalancing.operations);
      setProduct(objBalancing.product);
      setSamSum(objBalancing.total_sam);

    }

  }, [ objBalancing ]);


  return (
    <>

      {
        operationsProduct.length >= 1 && (
          <BalancedOperationsTable
            key={`${JSON.stringify(operationsProduct)}-${JSON.stringify(detailOperOpera)}-${JSON.stringify(selectedOperDetails)}-${JSON.stringify(objBalancing)}`}
            data={operationsProduct}
            samSum={samSum}
          />
        )
      }



    </>
  )
}
export default ListBalancing
