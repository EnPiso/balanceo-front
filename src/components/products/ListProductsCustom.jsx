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
import CustomPaginator from "../../ui/CustomPaginator.jsx";

const totalPaginate = [5, 10, 20, 50];


const ListProductsCustom = ({handleProduct}) => {

    return(
        <>
            <div className="grow p-8 overflow-y-auto bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-100">
                <TableProductsCustom
                    handleProduct={handleProduct}
                />
            </div>      
        </>
    )
}

export default ListProductsCustom;