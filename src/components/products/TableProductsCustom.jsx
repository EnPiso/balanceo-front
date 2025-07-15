import React, {useState, useEffect} from "react";
import {useRecoilState} from "recoil";
import {newFormProduct, productsAll} from "../../infraestructure/states/states_product.js";
import InputTextEdit from "./InputTextEdit.jsx";
import EditNameProduct from "./EditNameProduct.jsx";
import EditReferenceProduct from "./EditReferenceProduct.jsx";
import EditCateroryProduct from "./EditCategoryProduct.jsx";
import NewTableProduct from "./NewTableProduct.jsx";
import { fetchGetData } from "../../infraestructure/call_api/crud.js";
import { urlMain } from "../../infraestructure/data/const.js";
import { Spinner, Tooltip } from "@nextui-org/react";
import CustomPaginator from "../../ui/CustomPaginator.jsx";
import SearchOpersMaster from "../opers_master/SearchOpersMaster.jsx";
import { FaPlus, FaTimes } from "react-icons/fa";

const totalPaginate = [5, 10, 20, 50];


const TableProductsCustom = ({handleProduct}) => {
    const [products, setProducts] = useRecoilState(productsAll)
    const [isNewProduct, setIsNewProduct] = useRecoilState(newFormProduct);

    const [isLoading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const [totalPages, setTotalPages] = useState(1); // Total de páginas
    const [perPage, setPerPage] = useState(10); // Total de páginas

    const [searchData, setSearchData] = useState("");
    const [queryString, setQueryString] = useState("");

    const handlePageChange = (page) => { 
        setCurrentPage(page);
    }  
    

    useEffect(() => {
    

        const getData = async () => {
            try {
                //
                const result = await fetchGetData(`${urlMain}products?page=${currentPage}&per_page=${perPage}&q[name_cont]=${encodeURIComponent(queryString)}`);
                
                setProducts(result.products)
                setTotalPages(result.total_pages)
                setCurrentPage(result.current_page)
                
                //setOrders(result)
                //setError(null);
            } catch (error) {
                console.error('Error al obtener los datos:', error);

            } finally {
                setIsLoading(false);
            }
        };

        getData();
    }, [currentPage,perPage,queryString]);

    return(
        <>
            {
                isLoading ? 
                    <div className={"flex justify-center"}>
                        <Spinner size={"lg"} color={"default"}/>
                    </div> : 
                    <>
                    <div className="flex justify-between items-center py-2">
                        <div>
                            <Tooltip placement={"right-end"} content={isNewProduct ? "Cancelar" : "Agregar nuevo producto"}>
                                <button onClick={handleProduct}>
                                    {
                                        isNewProduct ? <FaTimes size={23} className={"ml-3"}/> : <FaPlus className={"ml-3 text-secondary_two"} size={23}/>
                                    }
                                    
                                </button>
                            </Tooltip>
                        </div>
                        <div>
                            <SearchOpersMaster
                                searchData={searchData}
                                setSearchData={setSearchData}
                                setQueryString={setQueryString}
                            />
                        </div>
                    </div>
                        

                        

                        <table className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-lg shadow-md border border-gray-300">
                            {
                                isNewProduct && 
                                    <NewTableProduct/> 
                            }
                            <thead>
                                <tr className="dark:bg-gray-100 bg-zinc-800 text-zinc-100 dark:text-zinc-800">
                                    <th className="p-1 text-left font-medium border border-gray-300">Nombre</th>
                                    <th className="p-1 text-left font-medium border border-gray-300">Referencia</th>
                                    <th
                                        className="p-1 text-left font-medium border border-gray-300  flex justify-between items-center">
                                        <span>Categoría</span>
                                        <div className="flex justify-end space-x-4 mr-2"> {/* Alinea los elementos horizontalmente y agrega espacio */}
                                            {totalPaginate.map((page, i) => (
                                            <span
                                                onClick={() => setPerPage(page)}
                                                className={`cursor-pointer ${perPage === page && 'text-secondary_two'}`}
                                                key={i}
                                            >
                                                {page}
                                            </span>
                                            ))}
                                        </div>
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


                        </table>
                        <div className="flex justify-start py-4">
                            <CustomPaginator
                                total={totalPages}
                                initialPage={currentPage}
                                onChange={handlePageChange}
                                />
                        </div> 
                    </>
            }

        </>
    )
}

export default TableProductsCustom;