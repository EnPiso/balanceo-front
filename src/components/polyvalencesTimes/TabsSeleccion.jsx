import React from "react";

const TabsSeleccion = () => (
  <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-md border border-gray-200">
    <div className="mt-6">
      <svg
        className="w-12 h-12 animate-bounce"
        fill="none"
        stroke="#80B7AE"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 7l4-4m0 0l4 4m-4-4v18"
        />
      </svg>
    </div>
    
    <h1 className="text-2xl font-semibold text-gray-700 mb-2 text-center">
      Seleccionar para ver los detalles de los operarios
    </h1>
    <p className="text-gray-500 text-center">
      Por favor, selecciona un los tabs superiores para mostrar la información.
    </p>
    
  </div>
);

export default TabsSeleccion;