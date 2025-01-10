import InputTextEdit from "./InputTextEdit.jsx";
import React, {useState} from "react";
import {Spinner, Tooltip} from "@nextui-org/react";
import {updateData} from "../../infraestructure/call_api/crud.js";
import {urlMain} from "../../infraestructure/data/const.js";
import {useRecoilState} from "recoil";
import {categoriesAll, productsAll} from "../../infraestructure/states/states_product.js";
import toast from "react-hot-toast";
import {toastMessageCustom} from "../../infraestructure/data/toastMessage.js";
import AutocompleteCategories from "./AutocompleteCategories.jsx";
import {FaDeleteLeft} from "react-icons/fa6";
import DeleteProductCustom from "./DeleteProductCustom.jsx";

const EditCateroryProduct = ({product}) => {
  const [isEditCategory, setIsEditCategory] = useState(false)
  const [isEditCatLoad, setIsEditCatLoad] = useState(false)
  const [products, setProducts] = useRecoilState(productsAll)



  const handleFetchApi = (category_product, product_id) => {
    setIsEditCatLoad(true)
    const data = {
      product: {
        category_product_id: category_product.id,
        category_product_name: category_product.label,
      }
    }
    debugger
    const updateProduct = async (data) => {
      try {
        const result = await updateData(urlMain + "products/" + product_id, data)

        ///  console.log(result)
        setProducts((prevProducts) => {
          // Verifica si el producto ya existe en el array
          const existingIndex = prevProducts.findIndex((product) => product.id === result.id);

          if (existingIndex !== -1) {
            // Si existe, reemplaza el producto en esa posición
            const updatedProducts = [...prevProducts];
            updatedProducts[existingIndex] = result;
            return updatedProducts;
          } else {
            // Si no existe, agrega el nuevo producto al array
            return [...prevProducts, result];
          }
        });

        toast.success(toastMessageCustom.updateProductName)
        setIsEditCategory(false)
      } catch (error) {
        console.error('Error setting data', error);
      }  finally {
        setIsEditCatLoad(false)
      }
    };

    updateProduct(data);


  }



  return(
    <>
      <td
        className="p-4 border border-gray-300 cursor-pointer">
        {
          isEditCategory ?
            <>
              {
                isEditCatLoad ? <Spinner size="lg" color={"default"}/> : <>

                  <AutocompleteCategories

                    handleFetchApi={handleFetchApi}
                    obj={product}
                    valueDefault={product.category_product_name.toString()}
                    isEdit={isEditCategory}
                    setIsEdit={setIsEditCategory}
                    label={"Editar " +  product.category_product_name + " (ENTER/ESC)"}
                  />

                </>
              }

            </>
            :
            <span className="flex justify-between items-center">
             <span>
                <Tooltip
                  placement={"left"}
                  content="Click para editar la categoría">
                    <span
                      onClick={() => {
                        setIsEditCategory(!isEditCategory)
                      }}>
                      {product.category_product_name}
                    </span>
              </Tooltip>
             </span>

              <DeleteProductCustom
                product={product}
              />

            </span>
        }

      </td>
    </>
  )
}

export default EditCateroryProduct;