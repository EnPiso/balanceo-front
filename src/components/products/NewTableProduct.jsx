import React, {useEffect, useState} from "react";
import InputNewTable from "./InputNewTable";
import {FaPlusCircle} from "react-icons/fa";
import AutocompleteCategoryNew from "./AutocompleteCategoryNew.jsx";
import {validateProduct} from "../../infraestructure/utils/validate.js";
import {postData} from "../../infraestructure/call_api/crud.js";
import {urlMain} from "../../infraestructure/data/const.js";
import {useRecoilState} from "recoil";
import {newFormProduct, productsAll} from "../../infraestructure/states/states_product.js";
import toast from "react-hot-toast";

const NewTableProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    reference: "",
    category: "",
    original: true
  });

  const [isRight, setIsRight] = useState(false)

  const [products, setProducts] = useRecoilState(productsAll)
  const [isNewProduct, setIsNewProduct] = useRecoilState(newFormProduct);


  useEffect(() => {
    const isValid = validateProduct(product)
    setIsRight(isValid.valid)
    console.log(isValid)

  }, [product]);


  // Manejar los cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategory = (category) => {
    setProduct((prev) => ({
      ...prev,
      ["category_product_id"]: category.id,
      ["category_product_name"]: category.name,
    }));
  };


  const handleSubmit = () => {

    const data = {
      product: product
    }

    handleApi(data)
  }


  const handleApi = (data) => {
    console.log(data)

    const postDataOrder = async (data) => {
      try {
        const result = await postData(urlMain + "/products", data)
        console.log(result)
        const updateObj = [...products, result]

        setProducts(updateObj)
        setIsNewProduct(false)
        toast.success("El producto ha sido creado con éxito")
        

      } catch (error) {
        console.error('Error setting data', error);
      }
    };

    postDataOrder(data);
  }

  return (

      <thead>
        <tr className="dark:bg-gray-100 bg-zinc-200 text-zinc-100 dark:text-zinc-800">
          <th className="p-4 text-left font-medium border border-gray-300">
            <InputNewTable
              handleChange={handleChange}
              value={product.name}
              name="name"
              label="Nombre"
            />
          </th>
          <th className="p-4 text-left font-medium border border-gray-300">
            <InputNewTable
              handleChange={handleChange}
              value={product.reference}
              name="reference"
              label="Referencia"
            />
          </th>
          <th className="p-4 text-left font-medium border border-gray-300 flex justify-between items-center">
            <AutocompleteCategoryNew
              handleCategory={handleCategory}
            />
            {
              isRight &&
                <button onClick={handleSubmit}>
                  <FaPlusCircle size={23} color={"green"} className={"ml-3"}/>
                </button>
            }

          </th>
        </tr>
      </thead>

  );
};

export default NewTableProduct;
