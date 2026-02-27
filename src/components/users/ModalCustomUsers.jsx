import React, { useState, useRef, useEffect } from 'react'
import { currentUser } from '../../infraestructure/states/states_views'
import { useRecoilState } from 'recoil'
import TabsUsers from './TabsUsers'

const ModalCustomUsers = ({ setIsOpen }) => {
  const [user] = useRecoilState(currentUser);
  const [activeTab, setActiveTab] = useState("mi-usuario");
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div
      ref={ref}
      className="fixed right-4 top-[64px] w-[480px] max-h-[85vh] overflow-y-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-2xl z-50 p-5"
    >
      <TabsUsers
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setIsOpen={setIsOpen}
      />
    </div>
  );
};

export default ModalCustomUsers
