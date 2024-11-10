import React from 'react';

const FileDropZone = ({ onFileUpload }) => {
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    onFileUpload(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-5"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <span className="block font-medium mb-2">Arrastra el archivo de excel aquí</span>
      <p className="mb-2">o</p>
      <input
        id="excel-file"
        type="file"
        accept=".xlsx"
        onChange={(e) => onFileUpload(e.target.files[0])}
        className="hidden"
      />
      <label
        htmlFor="excel-file"
        className="inline-block px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition-colors"
      >
        Seleccionar archivo
      </label>
    </div>
  );
};


export default FileDropZone