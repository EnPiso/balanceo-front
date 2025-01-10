import {Autocomplete, AutocompleteItem, Spinner, Tooltip} from "@nextui-org/react";
import {FaDeleteLeft} from "react-icons/fa6";
import React, {useEffect, useState} from "react";
import {useRecoilState} from "recoil";
import {categoriesAll} from "../../infraestructure/states/states_product.js";
import {fetchGetData} from "../../infraestructure/call_api/crud.js";
import {urlMain} from "../../infraestructure/data/const.js";
import {FaBackward, FaPlusCircle} from "react-icons/fa";
import ModalCategoryNew from "./ModalCategoryNew.jsx";

const AutocompleteCategories = ({setIsEdit, obj, valueDefault,handleFetchApi}) => {
  const [categories, setCategories] = useRecoilState(categoriesAll);

  const [isLoad, setIsLoad] = useState(false)


  useEffect(() => {
    const getData = async () => {
      setIsLoad(true)
      try {
        const result = await fetchGetData(`${urlMain}category_products`);
        console.log(result);

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

    if(categories.length < 1){
      getData();
    }
  }, []);


  const handleClick = (selectedKey) => {
    // Busca el elemento seleccionado en las categorías
    const selectedCategory = categories.find((cat) => cat.key === selectedKey);

    if (selectedCategory) {
      handleFetchApi(selectedCategory, obj.id);
      // Aquí puedes realizar las acciones necesarias con la categoría seleccionada
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setIsEdit(false); // Salir de edición si se presiona Esc
    }
  };


  return (
    <>
      {
        isLoad ? <Spinner size={"lg"} color={"default"}/> : <>
         <span className="row flex items-center space-x-4">  {/* row: flex container */}
           <span className="col flex-1">  {/* col: first column takes available space */}
             <Autocomplete
               onKeyDown={handleKeyDown}
               classNames="capitalize"
               isRequired
               className="w-full"
               defaultItems={categories}
               defaultSelectedKey={valueDefault} // Asegúrate de pasar el ID como string
               label="Busca categoría"
               onSelectionChange={(selectedKey) => {
                 handleClick(selectedKey)
               }}

               endContent={
                 <button
                   className="px-4 py-2 rounded text-2xl"
                   onClick={() => setIsEdit(false)} // Restablece el estado y carga todos los datos
                 >
                   <FaDeleteLeft color="red"/>
                 </button>
               }
             >
              {(item) => <AutocompleteItem key={item.key} textValue={item.label}> {item.label} </AutocompleteItem>}
            </Autocomplete>
          </span>

          <spn className="col">  {/* col: second column */}
            <ModalCategoryNew/>
          </spn>

        </span>


        </>
      }

    </>
  );
};

export default AutocompleteCategories;
