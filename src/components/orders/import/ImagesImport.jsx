import React, { useState } from 'react';

const ImagesImport = ({ imageUrl }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Función para abrir y cerrar el lightbox
  const toggleLightbox = () => setIsOpen(!isOpen);

  return (
    <div>
      {/* Imagen en miniatura que abre el lightbox al hacer clic */}

      <img
        src={imageUrl}
        alt={imageUrl}
        onClick={toggleLightbox}
        className="hover:shadow-lg transition-shadow dark:hover:shadow-xl shadow-md rounded-xl  w-1/4"
     
      />

      {/* Lightbox */}
      {isOpen && (
        <div className="lightbox" onClick={toggleLightbox}>
          <span
            className="lightbox-content"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        </div>
      )}
    </div>
  );
}

export default ImagesImport;
