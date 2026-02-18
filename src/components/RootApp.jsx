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
import SidebarMobile from './views/SidebarMobile.jsx';
import Footer from './views/Footer.jsx';

const RootApp = () => {
  const [showOrder, setShowOrder] = useRecoilState(showOrderObj);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div
        className="flex h-screen"
        style={{ "--sidebar-width": "16rem" }}
      >
        {/* Sidebar grande: Solo visible en lg+ */}
        <div className="hidden lg:block">
          <Sidebar toggleSidebar={toggleSidebar} />
        </div>

        {/* Overlay cuando el sidebar móvil está abierto */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 lg:hidden"
            onClick={toggleSidebar}
          ></div>
        )}

        {/* Sidebar móvil: Aparece solo en pantallas pequeñas */}
        {
          isSidebarOpen && (
            <div
              className={`fixed top-0 left-0 h-screen w-[var(--sidebar-width)] z-50 transition-transform duration-300 transform 
              ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:hidden`}
            >
              <SidebarMobile toggleSidebar={toggleSidebar} />
            </div>
          )
        }
        
        {/* Contenido Principal */}
        <div className="flex-1 flex flex-col bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-white lg:pl-[var(--sidebar-width)]">
          <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <div className="ml-1">
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