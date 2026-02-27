import React, { useState, useRef, useEffect } from 'react'
import { isShowModalLogIn, temporalTokenObj } from '../../infraestructure/states/states_views'
import { useRecoilState } from 'recoil'
import LoginForm from './FormLogin'
import ConfirmPassword from './ConfirmPassword'

const ModalUserLogin = () => {
  const [, setIsModalLogIn] = useRecoilState(isShowModalLogIn);
  const [tokenTemporal] = useRecoilState(temporalTokenObj);
  const [isLogin, setIsLogin] = useState(true);
  const [accountDelete, setAccountDelete] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target) && !tokenTemporal) {
        setIsModalLogIn(false);
        setAccountDelete(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [tokenTemporal]);

  return (
    <div
      ref={ref}
      className="fixed right-4 top-[64px] w-80 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-2xl z-50 p-5"
    >
      {!accountDelete && !tokenTemporal && (
        <p className="font-semibold text-zinc-800 dark:text-zinc-100 mb-4">Bienvenido</p>
      )}
      {tokenTemporal ?
        <ConfirmPassword /> :
        <LoginForm
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          setAccountDelete={setAccountDelete}
          accountDelete={accountDelete}
        />
      }
    </div>
  );
};

export default ModalUserLogin
