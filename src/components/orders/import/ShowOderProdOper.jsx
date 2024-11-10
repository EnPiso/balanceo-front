import React, {useEffect, useState} from 'react'
import OperationListImport from "./OperationListImport.jsx";
import TitleDashboard from "../../../ui/TitleDashboard.jsx";

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
          return(
            <>
              <div className="mt-2">
                <h2 className='text-xl mb-4 font-bold capitalize'>
                  {obj.garment}
                </h2>

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
