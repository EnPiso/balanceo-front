import React from 'react';
import Sidebar from "./views/Sidebar.jsx";
import Navbar from "./views/Navbar.jsx";
import ThemeContextProvider from "../infraestructure/states/providers/ThemeContextProvider.jsx";
import { useRecoilState } from "recoil";
import { showOrderObj } from "../infraestructure/states/order_states.js";
import OrdersTab from "./orders/orderList/OrdersTab.jsx";
import { Toaster } from "react-hot-toast";
import { useState } from 'react';
import { FaEyeSlash } from 'react-icons/fa6';

const RootApp = () => {
  const [showOrder, setShowOrder] = useRecoilState(showOrderObj);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    console.log(!isSidebarOpen);
  };

  return (
    <>
      <div className="flex">
        {/* Sidebar */}

       
        <div
          className={`bg-zinc-800 text-white h-full w-64 fixed lg:static transition-all duration-300 ease-in-out
           z-40 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
            lg:translate-x-0`}
        >
          <Sidebar toggleSidebar={toggleSidebar} />
        </div>
       
        {/* Contenido principal */}
        <div
          className={`flex-1 h-full bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-white transition-all duration-300`}
        >
          <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <div className="px-2 py-2">
            <OrdersTab />
          </div>
        </div>
      </div>
      <ThemeContextProvider />
      <Toaster position="top-center" reverseOrder={true} />


    </>
  );
};

export default RootApp;