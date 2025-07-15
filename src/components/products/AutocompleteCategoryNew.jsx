import {Autocomplete, AutocompleteItem, Spinner, Tooltip} from "@nextui-org/react";
import {FaDeleteLeft} from "react-icons/fa6";
import React, {useEffect, useState} from "react";
import {useRecoilState} from "recoil";
import {categoriesAll, categoriesAllCustom} from "../../infraestructure/states/states_product.js";
import {fetchGetData} from "../../infraestructure/call_api/crud.js";
import {urlMain} from "../../infraestructure/data/const.js";
import {FaBackward, FaPlusCircle} from "react-icons/fa";
import ModalCategoryNew from "./ModalCategoryNew.jsx";

const AutocompleteCategoryNew = ({handleCategory }) => {
  const [categories, setCategories] = useRecoilState(categoriesAll);

  const [categoriesUp, setCategoriesUp] = useRecoilState(categoriesAllCustom);
  

  const [isLoad, setIsLoad] = useState(false)



  useEffect(() => {
    const getData = async () => {
      setIsLoad(true)
      try {
        const result = await fetchGetData(`${urlMain}category_products`);

        // Mapea los datos para que sean compatibles con Autocomplete
        const formattedCategories = result.map((cat) => ({
          key: cat.name, // Convierte el ID a string si es necesario
          label: cat.name,
          id: cat.id
        }));

        setCategories(formattedCategories);
        setIsLoad(false)
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    getData()
  }, []);



  const selectObj = (selectedKey) => {
    const selectedCategory = categories.find((cat) => cat.key === selectedKey);
    handleCategory(selectedCategory)
  }

  return (
    <>
      {
        isLoad ? <Spinner size={"lg"} color={"default"}/> : <>
         <span className="row flex items-center space-x-4">  {/* row: flex container */}
           <span className="col flex-1">  {/* col: first column takes available space */}
             <Autocomplete
               // onKeyDown={handleKeyDown}
               classNames="capitalize"
               isRequired
               className="w-full"
               defaultItems={categories}
               // defaultSelectedKey={valueDefault} // Asegúrate de pasar el ID como string
               label="Busca categoría"
               onSelectionChange={(selectedKey) => {
                 selectObj(selectedKey)
               }}

             >
              {(item) => <AutocompleteItem key={item.key} textValue={item.label}> {item.label} </AutocompleteItem>}
            </Autocomplete>
          </span>


        </span>


        </>
      }

    </>
  );
};

export default AutocompleteCategoryNew;
