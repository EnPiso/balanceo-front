import React from 'react';
import Sidebar from "./views/Sidebar.jsx";
import Navbar from "./views/Navbar.jsx";
import ThemeContextProvider from "../infraestructure/states/providers/ThemeContextProvider.jsx";
import { useRecoilState } from "recoil";
import { showOrderObj } from "../infraestructure/states/order_states.js";
import OrdersTab from "./orders/orderList/OrdersTab.jsx";
import { Toaster } from "react-hot-toast";
import { useState } from 'react';

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
        {/* Botón para togglear el Sidebar */}
       

        {/* Sidebar */}
        <div
          className={`bg-zinc-800 text-white transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out fixed h-full`}
        >
          {isSidebarOpen && <Sidebar toggleSidebar={toggleSidebar} />}
          
        </div>

        {/* Contenido principal */}
        <div
          className={`flex-grow h-full lg:h-screen bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-white transition-all duration-300 ${
            isSidebarOpen ? 'ml-64' : 'ml-0'
          }`}
        >
          <Navbar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
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