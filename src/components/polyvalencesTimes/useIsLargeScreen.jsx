import React, { useEffect, useState } from 'react';

export const useIsLargeScreen = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    // Limpieza
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isLargeScreen;
};