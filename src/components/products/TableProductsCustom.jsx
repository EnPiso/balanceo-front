import React, {useState, useEffect} from "react";
import {useRecoilState} from "recoil";
import {newFormProduct, productsAll} from "../../infraestructure/states/states_product.js";
import EditNameProduct from "./EditNameProduct.jsx";
import EditReferenceProduct from "./EditReferenceProduct.jsx";
import EditCateroryProduct from "./EditCategoryProduct.jsx";
import NewTableProduct from "./NewTableProduct.jsx";
import { fetchGetData } from "../../infraestructure/call_api/crud.js";
import { urlMain } from "../../infraestructure/data/const.js";
import { Spinner, Tooltip } from "@nextui-org/react";
import CustomPaginator from "../../ui/CustomPaginator.jsx";
import PerPageSelector from "../../ui/PerPageSelector.jsx";
import SearchOpersMaster from "../opers_master/SearchOpersMaster.jsx";
import { FaPlus, FaTimes } from "react-icons/fa";
import { currentUser } from "../../infraestructure/states/states_views.js";
import ProductTdShow from "./ProductTdShow.jsx";


const TableProductsCustom = ({handleProduct}) => {
    const [products, setProducts] = useRecoilState(productsAll)
    const [isNewProduct, setIsNewProduct] = useRecoilState(newFormProduct);

    const [isLoading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const [totalPages, setTotalPages] = useState(1); // Total de páginas
    const [perPage, setPerPage] = useState(10); // Total de páginas

    const [searchData, setSearchData] = useState("");
    const [queryString, setQueryString] = useState("");

    const [user, setUser] = useRecoilState(currentUser);

    const handlePageChange = (page) => { 
        setCurrentPage(page);
    }  
    

    useEffect(() => {
    

        const getData = async () => {
            try {
                //
                const result = await fetchGetData(`${urlMain}products?page=${currentPage}&per_page=${perPage}&q[name_or_reference_cont]=${encodeURIComponent(queryString)}`);
                
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
                            {
                                user && user.role === 'admin' &&
                                    <Tooltip placement={"right-end"} content={isNewProduct ? "Cancelar" : "Agregar nuevo producto"}>
                                        <button onClick={handleProduct}>
                                            {
                                                isNewProduct ? <FaTimes size={23} className={"ml-3"}/> : <FaPlus className={"ml-3 text-secondary_two"} size={23}/>
                                            }
                                            
                                        </button>
                                    </Tooltip>
                            }
                        </div>
                        <div>
                            <SearchOpersMaster
                                searchData={searchData}
                                setSearchData={setSearchData}
                                setQueryString={setQueryString}
                                tooltipText={"Buscar producto o referencia"}
                            />
                        </div>
                    </div>
                        

                        

                        <table className="w-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-100 rounded-lg">
                            {isNewProduct && <NewTableProduct />}
                            <thead>
                                <tr className="bg-transparent text-zinc-800 dark:text-zinc-400 border-b border-zinc-300 dark:border-zinc-600">
                                    <th className="p-2 text-left font-medium uppercase">Nombre</th>
                                    <th className="p-2 text-left font-medium uppercase">Referencia</th>
                                    <th className="p-2 text-left font-medium uppercase">Categoría</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-600 transition-colors">
                                        {user && user.role === 'admin' ? (
                                            <>
                                                <EditNameProduct product={product} />
                                                <EditReferenceProduct product={product} />
                                                <EditCateroryProduct product={product} />
                                            </>
                                        ) : (
                                            <ProductTdShow product={product} />
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-end items-center gap-3 px-2 py-4">
                            <CustomPaginator
                                total={totalPages}
                                initialPage={currentPage}
                                onChange={handlePageChange}
                            />
                            <PerPageSelector perPage={perPage} onChange={(p) => { setPerPage(p); setCurrentPage(1); }} />
                        </div>
                    </>
            }

        </>
    )
}

export default TableProductsCustom;