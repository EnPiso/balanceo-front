import React from 'react'
import TitleDashboard from "../../../ui/TitleDashboard.jsx";
import useOpers from "../../../hooks/balances/opers/useOpers.jsx";
import {ListOpers} from "../opers/ListOpers.jsx";
import ListBalancing from "./ListBalancing.jsx";
import {useRecoilState} from "recoil";
import {selectProduct} from "../../../infraestructure/states/states_product.js";

export const BalancingDashboard = () => {
  const [product, setProduct] = useRecoilState(selectProduct)


  return (
    <>
      {
        product && (
          <TitleDashboard
            title={product.name}
          />
        )
      }

      <ListBalancing/>

    </>
  )
}
