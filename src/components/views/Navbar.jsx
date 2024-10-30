import React, {  } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import {useRecoilState} from "recoil";
import {mainTheme} from "../../infraestructure/states/states_views.js";

const Navbar = () => {
  const [theme, setTheme] = useRecoilState(mainTheme); // Usa el átomo de Recoil

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };


  return (
    <div className='bg-gray-100 text-gray-900 border-b border-gray-300 p-4 flex justify-between items-center dark:border-gray-600 dark:bg-zinc-900 dark:text-white'>
        <h1>Dashboard</h1>
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