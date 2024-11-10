import React, {useEffect} from 'react'
import TitleDashboard from "../../../ui/TitleDashboard.jsx";
import useOpers from "../../../hooks/balances/opers/useOpers.jsx";
import {ListOpers} from "../opers/ListOpers.jsx";
import ListBalancing from "./ListBalancing.jsx";
import {useRecoilState} from "recoil";
import {selectProduct} from "../../../infraestructure/states/states_product.js";
import {orderObjBalancing, showOrderObj} from "../../../infraestructure/states/order_states.js";
import InfoBoxBalancing from "./sidebarForm/InfoBoxBalancing.jsx";

export const BalancingDashboard = () => {
  const [product, setProduct] = useRecoilState(selectProduct)
  const [showOrder, setShowOrder] = useRecoilState(showOrderObj);
  const [objBalancing, setObjBalancing] = useRecoilState(orderObjBalancing);


  useEffect(() => {
    console.log(objBalancing)

  }, [objBalancing]);

  return (
      <>
        {
          objBalancing && (
            <>

              <TitleDashboard
               title={objBalancing.product.name}
              />
              <ListBalancing/>
            </>
          )
        }

      </>
  )
}
