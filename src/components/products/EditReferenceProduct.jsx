import InputTextEdit from "./InputTextEdit.jsx";
import React, {useState} from "react";
import {Spinner, Tooltip} from "@nextui-org/react";
import {updateData} from "../../infraestructure/call_api/crud.js";
import {urlMain} from "../../infraestructure/data/const.js";
import {useRecoilState} from "recoil";
import {productsAll} from "../../infraestructure/states/states_product.js";
import toast from "react-hot-toast";
import {toastMessageCustom} from "../../infraestructure/data/toastMessage.js";

const EditReferenceProduct = ({product}) => {
    const [isEditReference, setIsEditReference] = useState(false)
    const [isEditNameLoad, setIsEditRefLoad] = useState(false)
    const [products, setProducts] = useRecoilState(productsAll)


    const handleFetchApi = (val, obj) => {
        setIsEditRefLoad(true)
        const data = {
            product: {
                reference: val
            }
        }

        const updateProduct = async (data) => {
            try {
                const result = await updateData(urlMain + "products/" + obj.id, data)
         
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
                setIsEditReference(false)
            } catch (error) {
                console.error('Error setting data', error);
            }  finally {
                setIsEditRefLoad(false)
            }
        };

        updateProduct(data);


    }



    return(
        <>
            <td
                className="p-1 cursor-pointer">
                {
                    isEditReference ?
                        <>
                            {
                                isEditNameLoad ? <Spinner size="lg" color={"default"}/> :  <InputTextEdit
                                    handleFetchApi={handleFetchApi}
                                    obj={product}
                                    valueDefault={ product.reference}
                                    isEdit={isEditReference}
                                    setIsEdit={setIsEditReference}
                                    label={"Editar " +  product.reference + " (ENTER/ESC)"}  />
                            }

                        </>
                        :
                        <>
                            <Tooltip
                                placement={"left"}
                                content="Click para editar la referencia">
                                <span
                                    onClick={() => setIsEditReference(!isEditReference)}
                                > {product.reference} </span>
                            </Tooltip>

                        </>
                }

            </td>
        </>
    )
}

export default EditReferenceProduct;