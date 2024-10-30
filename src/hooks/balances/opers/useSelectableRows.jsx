// hooks/balances/opers/useSelectableRows.jsx
import { useState, useEffect } from 'react';

const useSelectableRows = (initialSelectedItems = new Set()) => {
  const [selectedItems, setSelectedItems] = useState(new Set(initialSelectedItems));
  const [isMousePressed, setIsMousePressed] = useState(false);
  const [selectMode, setSelectMode] = useState(true);

  useEffect(() => {
    // Sincroniza selectedItems cuando initialSelectedItems cambie
    setSelectedItems(new Set(initialSelectedItems));
  }, [initialSelectedItems]);

  // Maneja cuando se presiona el mouse
  const handleMouseDown = (id) => {
    setIsMousePressed(true);
    const isCurrentlySelected = selectedItems.has(id);
    setSelectMode(!isCurrentlySelected);
    handleRowSelection(id);
  };

  // Maneja cuando se suelta el mouse
  const handleMouseUp = () => {
    setIsMousePressed(false);
  };

  // Maneja cuando el mouse pasa por encima mientras está presionado
  const handleMouseEnter = (id) => {
    if (isMousePressed) {
      if (selectMode && !selectedItems.has(id)) {
        handleRowSelection(id);
      } else if (!selectMode && selectedItems.has(id)) {
        handleRowSelection(id);
      }
    }
  };

  // Maneja la selección de cada fila
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
    handleMouseDown,
    handleMouseUp,
    handleMouseEnter,
    isMousePressed,
  };
};

export default useSelectableRows;
