import React, {useEffect,useState} from "react";
import {fetchGetData} from "../../infraestructure/call_api/crud.js";
import {urlMain} from "../../infraestructure/data/const.js";
import {useRecoilState} from "recoil";
import {productsAll} from "../../infraestructure/states/states_product.js";
import {Spinner, Tooltip} from "@nextui-org/react";
import ShowOrder from "../orders/show/ShowOrder.jsx";
import GenerateImgPdf from "../orders/orderList/GenerateImgPdf.jsx";
import {hourMinuteSecond, monthDayYear} from "../../infraestructure/utils/dateFormat.js";
import FileArchiver from "../orders/orderList/FileArchiver.jsx";
import TableProductsCustom from "./TableProductsCustom.jsx";

const ListProductsCustom = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [products, setProducts] = useRecoilState(productsAll)

    useEffect(() => {

        const getData = async () => {
            try {
                //setLoading(true);
                const result = await fetchGetData(`${urlMain}products`);
                setProducts(result)

                //setOrders(result)
                //setError(null);
            } catch (error) {
                console.error('Error al obtener los datos:', error);

            } finally {
                setIsLoading(false);
            }
        };

        getData();
    }, []);


    return(
        <>
            <div className="grow p-8 overflow-y-auto bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-100">
                {
                    isLoading ? <Spinner size={"lg"} color={"default"}/> : <TableProductsCustom/>
                }
            </div>

        </>
    )
}

export default ListProductsCustom;