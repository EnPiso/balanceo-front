import React, { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash, FaMoon, FaSun, FaUser, FaUserAltSlash, FaUserCircle } from 'react-icons/fa'
import {useRecoilState} from "recoil";
import {currentUser, isLoadingUser, isShowModalLogIn, mainTheme} from "../../infraestructure/states/states_views.js";
import ModalUserLogin from '../users/ModalUserLogin.jsx';
import IconMain from './IconMain.jsx';
import { fetchGetData, fetchGetUser } from '../../infraestructure/call_api/crud.js';
import { urlMain } from '../../infraestructure/data/const.js';
import toast from 'react-hot-toast';
import { ConfirmOpen } from '../balances/balancing/sidebarForm/ConfirmOpers.jsx';
import { CloseSession } from './CloseSession.jsx';
import { CircularProgress, Tooltip } from '@nextui-org/react';
import ModalCustomUsers from '../users/ModalCustomUsers.jsx';

const Navbar = ({toggleSidebar,isSidebarOpen}) => {
  const [theme, setTheme] = useRecoilState(mainTheme); 
  const [isModalLogIn, setIsModalLogIn] = useRecoilState(isShowModalLogIn); 
  const [user, setUser] = useRecoilState(currentUser);

  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useRecoilState(isLoadingUser)
  
  useEffect(()=> {
    const getData = async () => {
          
          try {
            const result = await fetchGetUser(`${urlMain}current_user`);
            
            if(result && result.data.user){
              setUser(result.data.user)
              toast.success(`¡Bienvenido ${result.data.user.name}!`)
            }
            
          } catch (error) {
            console.error("Error al obtener los datos:", error);
          } finally {
            setIsLoading(false)
          }
        };
        
        getData();  
  }, [])


  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };


  return (
    <div className='z-40 bg-white/30 dark:bg-zinc-900/80 backdrop-blur-lg text-gray-900 dark:text-slate-100 p-4 flex justify-between items-center sticky top-0'>
        <div>
          <div className="block lg:hidden">

      
            <button onClick={toggleSidebar} className='text-2xl flex flex-col items-center'>
              {
                !isSidebarOpen ?
                <>
                  <div className='flex justify-start'>
                    <IconMain/>
                  </div> 
                </> :
                <div className="w-14 h-14 object-contain">

                </div>
              }
            </button>

          </div>
          
        </div>
        
        <div className="flex items-center gap-2">
          <button className="text-2xl text-dark" onClick={toggleTheme}>
            {theme === 'light' ? <FaMoon className="text-secondary_two" size={25}/> : <FaSun className="text-secondary_two" size={25}/>}
          </button>

          {
            isLoading ? 
              <CircularProgress color='default' size='sm'/> :
              <>
                {
                  user ? (
                    <Tooltip content="Iniciar sesión" placement="bottom">
                        <button onClick={() => setIsOpen(true)} className="cursor-pointer text-2xl">
                          <FaUserCircle className="text-secondary_two" size={25}/>
                        </button>                
                    </Tooltip>
                    
                  ) : (
                    <Tooltip content="Detalles de usuario" placement="bottom">
                      <button className="text-2xl text-dark" onClick={() => setIsModalLogIn(!isModalLogIn)}>
                        <FaUser className="text-secondary_two" size={25} />
                      </button>
                    </Tooltip>
                    
                  )
                }
              </>
          }

        
        </div>

        <ModalCustomUsers
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />    
        
        {
          isModalLogIn && 
            <ModalUserLogin/> 
        }
      
        
    </div>
  )
}

export default Navbar