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
      size="sm"
      classNames={{
        wrapper: "gap-0 overflow-visible h-7 rounded border border-zinc-300 dark:border-zinc-600",
        item: "w-7 h-7 text-xs rounded-none bg-transparent text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700",
        cursor: "bg-primary_one text-white font-semibold",
        next: "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700",
        prev: "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700",
      }}
      total={total}
      page={currentPage}
      onChange={handlePageChange}
    />
  );
};

export default CustomPaginator;
