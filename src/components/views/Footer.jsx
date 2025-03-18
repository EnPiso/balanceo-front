import React from 'react';
import { FaBackward, FaMoon, FaSave, FaSun } from 'react-icons/fa';
import { useRecoilState } from "recoil";
import { mainTheme } from "../../infraestructure/states/states_views.js";
import CustomButton from '../../ui/CustomButton.jsx';
import { Button } from '@nextui-org/react';

const Footer = () => {
  const [theme, setTheme] = useRecoilState(mainTheme); // Usa el átomo de Recoil

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <footer className='p-2 flex justify-end fixed bottom-0 w-full bg-zinc-800' style={{ marginTop: '2rem' }}>
      <Button
        size="lg"
        className="mx-1 bg-zinc-100"
        variant="bordered"
        onClick={() => console.log("Regresar")}>
        <span className="font-bold uppercase text-zinc-800 flex justify-between items-center">
          <FaBackward className="text-secondary_two mr-2" /> Regresar
        </span>
      </Button>
    </footer>
  );
};

export default Footer;
