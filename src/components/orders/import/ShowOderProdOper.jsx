import React, {useEffect, useState} from 'react'
import OperationListImport from "./OperationListImport.jsx";
import TitleDashboard from "../../../ui/TitleDashboard.jsx";
import {nameReferenceProduct} from "../../../ui/utils.js";
import {fetchGetData} from "../../../infraestructure/call_api/crud.js";
import {urlMain} from "../../../infraestructure/data/const.js";
import SelectCategoryProducts from "./SelectCategoryProducts.jsx";

const ShowOderProdOperations = ({orderProOpe}) => {
  const {img_excel,order,products} = orderProOpe

  const [productsResult,setProductsResult] = useState([])

  const [categories,setCategories] = useState([])


  useEffect(() => {

// Transformar `newArray` en un nuevo array estructurado

    const transformedArray = Object.entries(products.newArray).map(([garment, operations]) => ({

      garment,
      operations: operations.map(operation => ({
        operation: operation.operation,
        sam: operation.sam,
        machine_name: operation.machine_name,
        repetitions: operation.repetitions,
        observations: operation.observations,
        guideType: operation.guideType
      }))
    }));

    setProductsResult(transformedArray); // Aquí solo para verificar el resultado
  }, [orderProOpe]);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchGetData(`${urlMain}category_products`);
        setCategories(result)

      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    getData()
  }, []);



  return (
    <>
      {
        productsResult.map((obj, i)=> {


          const garment = nameReferenceProduct(obj.garment)
          const { name, reference, categoryProduct } = garment || {}; // Maneja el caso en que garment sea null o undefined

          return(
            <>
              <div className="mt-3">
                <div className="bg-zinc-200 rounded flex justify-between items-center pl-2 pt-4 pr-2">
                  <h2 className=' mb-4 capitalize text-xl'>
                    <span className="font-bold">{name}</span>
                  </h2>
                  <h3 className='text-lg mb-4 capitalize'>
                    Referencia: <span className="font-bold">{reference}</span>
                  </h3>
                  <h4 className='text-lg mb-4 capitalize'>
                    Categoría: <span className="font-bold">{categoryProduct}</span>
                  </h4>
                </div>

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
