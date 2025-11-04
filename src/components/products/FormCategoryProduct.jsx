import {Input, Spinner, Tooltip} from "@nextui-org/react";
import CustomButton from "../../ui/CustomButton.jsx";
import {FaSave} from "react-icons/fa";
import React, {useState} from "react";
import InputTextCategory from "./InputTextCategory.jsx";
import {FaDeleteLeft} from "react-icons/fa6";
import {postData} from "../../infraestructure/call_api/crud.js";
import {urlMain} from "../../infraestructure/data/const.js";
import toast from "react-hot-toast";
import {toastMessageCustom} from "../../infraestructure/data/toastMessage.js";
import {useRecoilState} from "recoil";
import {categoriesAll, categoriesAllCustom} from "../../infraestructure/states/states_product.js";

const FormCategoryProduct = ({setIsNew}) => {
  const [categoryProduct,setCategoryProduct] = useState({
    name: ""
  })

  const [isLoad,setIsLoad] = useState(false)

  const [isError,setIsError] = useState(false)

  const [categories, setCategories] = useRecoilState(categoriesAllCustom);
  //const [categories, setCategories] = useRecoilState(categoriesAll);

  const [categoriesUp, setCategoriesUp] = useRecoilState(categoriesAll);
  
  

  const handleInputChange = (e) => {
    const { name, value } = e.target; // Extraer el nombre y el valor del input
    setCategoryProduct((prev) => ({
      ...prev,
      [name]: value, // Actualizar la propiedad correspondiente
    }));
  };

  const handleClick = () => {
    handleApi()
  }

  const toLowerCase = (str) => {
    if (typeof str !== 'string') return '';
    return str.toLowerCase(); // Convierte toda la cadena a minúsculas
  };

  const handleApi = () => {

    if(categoryProduct && categoryProduct.name){

      setIsLoad(true)
      const nameLower = toLowerCase(categoryProduct.name)

      const data = {
        category_product: {
          name: nameLower
        }
      }
      const createCatProd = async (data) => {
        try {
          const result = await postData(urlMain + "category_products", data);

          if(result) {
            // Hacemos una copia del array 'categories' para evitar mutarlo directamente

            // Mostrar mensaje de éxito
            const updateAarray = [...categories, result]
            
            setCategories(updateAarray)
            console.log(categoriesUp)

            const data = {
              key: result.name,
              label: result.name,
              id: result.id
            }
            const updateArrayUp = [...categoriesUp, data]
            setCategoriesUp(updateArrayUp)
            
            toast.success(toastMessageCustom.operationsNew);
            setIsNew(false)

          } else {
            setIsError(true)

            setTimeout(()=> {
              setIsError(false)
            }, 2500)
            toast.error("El nombre ya está en uso. Por favor elige otro.");
          }

        } catch (error) {
          console.error('Error setting data', error);
          toast.error(`Error: ${error.message}`); // Muestra un mensaje de error al usuario
        } finally {
          setIsLoad(false)
        }
      };

      createCatProd(data);

    }else{
      toast.error("Es necesario agregar una categoría");
    }

  }

  return(
    <>
      <div className="flex justify-between items-center">

        <InputTextCategory
          setIsNew={setIsNew}
          handleApi={handleApi}
          isInvalid={isError}
          label="Nombre"
          name="name"
          placeholder="Nombre de la categoría"
          onChange={handleInputChange} // Pasar el manejador
        />

        <div className="max-w-[40px] mt-1 ml-4">
          <Tooltip placement={"top-start"} content={"Guardar categoría"}>
              <span className="cursor-pointer" onClick={handleClick}>
                <FaSave className="text-secondary_two" size={30}/>
              </span>
          </Tooltip>
        </div>
        <div className="max-w-[40px] mt-1 ml-4">
          <Tooltip placement={"bottom-end"} content={"cancelar categoría"}>
              <span
                className="cursor-pointer"
                onClick={()=> setIsNew(false)}>
                 <FaDeleteLeft color="red" size={30}/>
              </span>
          </Tooltip>
        </div>


      </div>
    </>
  )
}

export default FormCategoryProduct;