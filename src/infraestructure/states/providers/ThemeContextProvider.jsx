
// ThemeContextProvider.js
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {mainTheme} from "../states_views.js";

const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useRecoilState(mainTheme); // Usa el átomo de Recoil

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

};

export default ThemeContextProvider;
