import React, {useEffect, useState} from 'react'
import OperationListImport from "./OperationListImport.jsx";
import TitleDashboard from "../../../ui/TitleDashboard.jsx";
import {nameReferenceProduct} from "../../../ui/utils.js";

const ShowOderProdOperations = ({orderProOpe}) => {
  const {img_excel,order,products} = orderProOpe

  const [productsResult,setProductsResult] = useState([])

  useEffect(() => {

// Transformar `newArray` en un nuevo array estructurado
    const transformedArray = Object.entries(products.newArray).map(([garment, operations]) => ({
      garment,
      operations: operations.map(operation => ({
        operation: operation.operation,
        sam: operation.sam,
        machine: operation.machine,
        repetitions: operation.repetitions,
        observations: operation.observations,
        guideType: operation.guideType
      }))
    }));


      /*transformedArray.map((obj, i)=> {
        console.log(obj.garment)
        obj.operations.map((operation)=> {
          console.log(operation)
        })

      })*/


    setProductsResult(transformedArray); // Aquí solo para verificar el resultado
    //console.log(transformedArray);
  }, [orderProOpe]);

  return (
    <>
      {
        productsResult.map((obj, i)=> {
          const garment = nameReferenceProduct(obj.garment)
          const { name, reference } = garment || {}; // Maneja el caso en que garment sea null o undefined

          return(
            <>
              <div className="mt-4">
                <h2 className=' mb-4 capitalize text-xl'>
                  <span className="font-bold">{ name }</span>
                </h2>
                <h3 className='text-lg mb-4 capitalize'>
                 Referencia del producto: <span className="font-bold">{ reference }</span>
                </h3>

              </div>


              <OperationListImport
                minimunColumn={true}
                operationsData={obj.operations}
              />

            </>
          )

        })
      }


    </>
  )
}
export default ShowOderProdOperations
