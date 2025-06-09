import { Avatar } from '@nextui-org/react';
import React, { useState } from 'react';

const ImagesImport = ({ imageUrl }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Función para abrir y cerrar el lightbox
  const toggleLightbox = () => setIsOpen(!isOpen);

  return (
    <div>
      {/* Imagen en miniatura */}
      
      <Avatar
        size='lg' 
        alt="avatar"
        onClick={toggleLightbox}
        isBordered 
        color="success" 
        src={imageUrl} />


      {/* Lightbox */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={toggleLightbox}
        >
          <img
            src={imageUrl}
            alt="avatar"
            className="max-w-full max-h-[80vh] rounded-xl shadow-2xl border-4 border-white"
          />
        </div>
      )}
    </div>
  );
};

export default ImagesImport;