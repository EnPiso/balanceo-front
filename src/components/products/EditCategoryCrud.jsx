import InputTextEdit from "./InputTextEdit.jsx";
import React, {useEffect, useState} from "react";
import {Input, Spinner, Tooltip} from "@nextui-org/react";
import {updateData} from "../../infraestructure/call_api/crud.js";
import {urlMain} from "../../infraestructure/data/const.js";
import {useRecoilState} from "recoil";
import {categoriesAll, categoriesAllCustom, productsAll} from "../../infraestructure/states/states_product.js";
import toast from "react-hot-toast";
import {toastMessageCustom} from "../../infraestructure/data/toastMessage.js";
import AutocompleteCategories from "./AutocompleteCategories.jsx";
import {FaDeleteLeft} from "react-icons/fa6";

const EditCategoryCrud = ({category}) => {
  const [isEditCategory, setIsEditCategory] = useState(false)

  const [categoryUpdate, setCategoryUpdate] = useState('')
  const [categoriesCustom, setCategoriesCustom] = useRecoilState(categoriesAllCustom);
  const [categories, setCategories] = useRecoilState(categoriesAll);
  const [products, setProducts] = useRecoilState(productsAll)


  useEffect(() => {
    category && setCategoryUpdate(category.name)
  }, []);


  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleFetchApi()
    }
    if (e.key === "Escape") {
     // handleClear(); // Limpia el campo de entrada al presionar Escape
      setIsEditCategory(false)
    }
  };


  const handleFetchApi = () => {

    const data = {
      category_product: {
        name: categoryUpdate
      }
    }

    const id = category.id

    const updatePlant = async (data) => {
      try {
        const result = await updateData(urlMain + `category_products/${id}`, data)

        const updatedItems = categoriesCustom.map((item) =>
          item.id === result.id ? result : item
        );

        if(categories.length >= 1) {
          const formatValue = {
            key: result.name,
            label: result.name,
            id: result.id,
          }
          const updatedCategories = categories.map((item) =>
            item.id === result.id
              ? { ...item, ...formatValue } // Actualiza solo el objeto coincidente
              : item // Mantén los demás objetos iguales
          );
          setCategories(updatedCategories)
        }

        const updatedProducts = products.map((item) =>
          item.category_product_id === result.id
            ? { ...item, category_product_name: result.name } // Actualiza el campo
            : item // Mantén los demás objetos iguales
        );


        setProducts(updatedProducts)
        
        setCategoriesCustom(updatedItems)

        setIsEditCategory(false)
        toast.success(toastMessageCustom.updateCategory)
      } catch (error) {
        console.error('Error setting data', error);
      }
    };

    updatePlant(data);

  }


  return(
    <>

        {
          isEditCategory ?
            <>
              <Input
                className="max-w-xs"
                // ref={inputRef} // Asigna la referencia al input
                value={categoryUpdate}
                onChange={(e) => {
                  setCategoryUpdate(e.target.value)
                }} // Actualiza la entrada del usuario
                onKeyDown={handleKeyDown} // Detección de teclas
                label={"Editar categoría ENTER/ESC"}
                type="text"

              />

            </>
            :
            <>

                    <span
                      onClick={() => {
                        setIsEditCategory(!isEditCategory)
                      }}>
                     <Tooltip
                       placement={"left"}
                       content="Click para editar la categoría">
                        {category.name}
                     </Tooltip>
                    </span>

            </>
        }


    </>
  )
}

export default EditCategoryCrud;