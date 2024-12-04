import React, { useState } from "react";

const DragExample = () => {
  // Datos iniciales
  const [data, setData] = useState([
    { id: 1, name: "Elemento 1" },
    { id: 2, name: "Elemento 2" },
    { id: 3, name: "Elemento 3" },
    { id: 4, name: "Elemento 4" },
    { id: 5, name: "Elemento 5" },
  ]);

  // Estado para rastrear el elemento que se arrastra
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Necesario para permitir el drop
  };

  const handleDrop = (index) => {
    if (draggedIndex === null) return;

    // Copia del array para reordenar
    const updatedData = [...data];
    const [draggedItem] = updatedData.splice(draggedIndex, 1); // Eliminar el elemento arrastrado
    updatedData.splice(index, 0, draggedItem); // Insertar en la nueva posición

    setData(updatedData); // Actualizar estado
    setDraggedIndex(null); // Reiniciar el índice arrastrado
  };

  return (
    <table className="min-w-full border border-gray-300">
      <thead>
      <tr className="bg-gray-200">
        <th className="border border-gray-300 px-4 py-2">ID</th>
        <th className="border border-gray-300 px-4 py-2">Nombre</th>
      </tr>
      </thead>
      <tbody>
      {data.map((item, index) => (
        <tr
          key={item.id}
          draggable
          onDragStart={() => handleDragStart(index)} // Inicio del drag
          onDragOver={handleDragOver} // Permitir el drop
          onDrop={() => handleDrop(index)} // Acción al soltar
          className="cursor-move bg-white hover:bg-gray-100 transition-all"
        >
          <td className="border border-gray-300 px-4 py-2 text-center">{item.id}</td>
          <td className="border border-gray-300 px-4 py-2">{item.name}</td>
        </tr>
      ))}
      </tbody>
    </table>
  );
};

export default DragExample;
