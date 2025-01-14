import React, {useState} from "react";
import {useRecoilState} from "recoil";
import {newFormProduct, productsAll} from "../../infraestructure/states/states_product.js";
import InputTextEdit from "./InputTextEdit.jsx";
import EditNameProduct from "./EditNameProduct.jsx";
import EditReferenceProduct from "./EditReferenceProduct.jsx";
import EditCateroryProduct from "./EditCategoryProduct.jsx";
import NewTableProduct from "./NewTableProduct.jsx";

const TableProductsCustom = () => {
    const [products, setProducts] = useRecoilState(productsAll)
    const [isNewProduct, setIsNewProduct] = useRecoilState(newFormProduct);


    return(
        <>
            <table className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-lg shadow-md border border-gray-300">

                {
                    isNewProduct ? (
                        <NewTableProduct/>
                    ) : (
                      <>
                          <thead>
                          <tr className="dark:bg-gray-100 bg-zinc-800 text-zinc-100 dark:text-zinc-800">
                              <th className="p-1 text-left font-medium border border-gray-300">Nombre</th>
                              <th className="p-1 text-left font-medium border border-gray-300">Referencia</th>
                              <th
                                className="p-1 text-left font-medium border border-gray-300  flex justify-between items-center">
                                  <span>Categoría</span>
                              </th>
                          </tr>
                          </thead>
                          <tbody>
                          {
                              products.map((product) => {
                                  return (
                                    <>
                                        <tr key={product.id}>
                                            <EditNameProduct
                                              product={product}
                                            />
                                            <EditReferenceProduct
                                              product={product}
                                            />
                                            <EditCateroryProduct
                                              product={product}
                                            />
                                        </tr>
                                    </>
                                  )
                              })
                          }

                          </tbody>
                      </>
                    )
                }


            </table>

        </>
    )
}

export default TableProductsCustom;