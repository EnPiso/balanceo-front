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
    <div className='z-40 bg-zinc-800 text-gray-900 border-b border-gray-300 p-4 flex justify-between items-center dark:border-gray-600 dark:bg-zinc-900 dark:text-white sticky top-0'>
        <div>
          <div className="block lg:hidden">

      
            <button onClick={toggleSidebar} className='text-2xl flex flex-col items-center'>
              {
                !isSidebarOpen ?
                <>
                
                <div className='flex justify-start'>
                  <img
                    className="w-14 h-14 object-contain "
                    src="/icon/icon.jpeg"
                    alt="Icono de Balance"
                  />
                  <div className='ml-2 py-1'>
                    <p className="text-primary_two font-black text-xl text-start m-0">
                      <span>
                        <span className="text-secondary_two">En</span>
                        <span className="text-primary_two">Piso</span>
                      </span>
                    </p>
                    <p className="text-secondary_two text-xs text-center m-0">BALANCEOS</p>
                  </div>
                </div>
                  
                </> :
                <div className="w-14 h-14 object-contain">

                </div>
              }
            </button>

          </div>
          
        </div>
       
        <button
          className='text-2xl text-dark'
          onClick={toggleTheme}>
          {
            theme === 'light'  ? <FaMoon  color='white'/> : <FaSun color='white'/>
          }

        </button>
    </div>
  )
}

export default Navbar