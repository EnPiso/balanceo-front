import React from 'react'
import Sidebar from "./views/Sidebar.jsx";
import Navbar from "./views/Navbar.jsx";
import Dashboard from "./views/Dashboard.jsx";
import ThemeContextProvider from "../infraestructure/states/providers/ThemeContextProvider.jsx";
import {useRecoilState} from "recoil";
import {showOrderObj} from "../infraestructure/states/order_states.js";
import DashboardOrder from "./orders/orderList/DashboardOrder.jsx";
import {BalancingDashboard} from "./balances/balancing/BalancingDashboard.jsx";
import {Toaster} from "react-hot-toast";
import ButtonNavigationVideos from "./balances/balancing/tableOperations/videoOperations/ButtonNavigationVideos.jsx";


const RootApp = () => {
  const [showOrder, setShowOrder] = useRecoilState(showOrderObj);

  return (
    <>
      <div className="flex">
        <Sidebar/>

        <div className="grow ml-16 md:ml-64 h-full lg:h-screen bg-gray-100 text-gray-900 dark:bg-zinc-900 dark:text-white">
          <Navbar />
          <div>
            <DashboardOrder/>
          </div>
        </div>

      </div>
      <ThemeContextProvider/>
      <Toaster
        position="top-center"
        reverseOrder={true}
      />

    </>
  )
}
export default RootApp
