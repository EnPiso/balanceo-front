import { useState, useEffect } from "react";

const useSelectableRows = (initialSelectedItems = new Set()) => {
  const [selectedItems, setSelectedItems] = useState(new Set(initialSelectedItems));

  useEffect(() => {
    // Sincroniza selectedItems cuando initialSelectedItems cambie
    setSelectedItems(new Set(initialSelectedItems));
  }, [initialSelectedItems]);

  // Maneja la selección de una fila con clic
  const handleRowSelection = (id) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = new Set(prevSelectedItems);
      if (updatedSelectedItems.has(id)) {
        updatedSelectedItems.delete(id);
      } else {
        updatedSelectedItems.add(id);
      }
      return updatedSelectedItems;
    });
  };

  return {
    selectedItems,
    handleRowSelection,
  };
};

export default useSelectableRows;
