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
      item: "w-8 h-8 text-small rounded-none bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300", // Personaliza el color de los números
      cursor:
        "bg-primary_one text-white font-bold shadow-lg", // Color del número seleccionado
      next: "text-primary_one hover:bg-blue-100 dark:hover:bg-blue-800", // Flecha de siguiente página
      prev: "text-primary_one hover:bg-blue-100 dark:hover:bg-blue-800", // Flecha de página anterior
    }}
      total={total}
      page={currentPage} // Convertido en controlado
      onChange={handlePageChange} // Controlar el cambio de página
    />
  );
};

export default CustomPaginator;
