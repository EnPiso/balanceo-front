import React, { useState, useEffect } from "react";
import { Pagination } from "@nextui-org/react";

const CustomPaginator = ({ total, initialPage, onChange }) => {
  // Estado local para manejar la página actual
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Sincroniza `currentPage` con `initialPage` cuando este cambia
  useEffect(() => {
    if (initialPage !== currentPage) {
      setCurrentPage(initialPage);
    }
  }, [initialPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page); // Actualizar el estado local
    if (onChange) {
      onChange(page); // Notificar al padre sobre el cambio
    }
  };

  return (
    <Pagination
      classNames={{
        wrapper: "gap-0 overflow-visible h-8 rounded border border-divider",
        item: "w-8 h-8 text-small rounded-none bg-transparent",
        cursor:
          "bg-gradient-to-b shadow-lg from-default-500 to-default-800 dark:from-default-300 dark:to-default-100 text-white font-bold",
      }}
      total={total}
      page={currentPage} // Convertido en controlado
      onChange={handlePageChange} // Controlar el cambio de página
    />
  );
};

export default CustomPaginator;
