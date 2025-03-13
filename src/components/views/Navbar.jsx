import React, {  } from 'react'
import { FaEye, FaEyeSlash, FaMoon, FaSun } from 'react-icons/fa'
import {useRecoilState} from "recoil";
import {mainTheme} from "../../infraestructure/states/states_views.js";

const Navbar = ({toggleSidebar,isSidebarOpen}) => {
  const [theme, setTheme] = useRecoilState(mainTheme); // Usa el átomo de Recoil

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };


  return (
    <div className='bg-gray-100 text-gray-900 border-b border-gray-300 p-4 flex justify-between items-center dark:border-gray-600 dark:bg-zinc-900 dark:text-white'>
        <div>
          <div className="block lg:hidden">
            <button onClick={toggleSidebar} className='text-2xl'>
              {
                !isSidebarOpen &&
                <img
                  className="w-12 h-12 object-contain" // Ajusta 'w-8 h-8' al tamaño de ícono deseado
                  src="/icon/icon.jpeg"
                  alt="Icono de Balance" // Añade un texto alternativo descriptivo
                /> 
              }
            </button>

          </div>
          
        </div>
       
        <button
          className='text-2xl text-dark'
          onClick={toggleTheme}>
          {
            theme === 'light'  ? <FaMoon /> : <FaSun/>
          }

        </button>
    </div>
  )
}

export default Navbar