import React, { useState } from 'react';

const ImageLightbox = ({ thumbnailUrl, fullSizeUrl,alt }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Función para abrir y cerrar el lightbox
  const toggleLightbox = () => setIsOpen(!isOpen);

  return (
    <div>
      {/* Imagen en miniatura que abre el lightbox al hacer clic */}
      <img
        src={thumbnailUrl}
        alt={alt}
        onClick={toggleLightbox}
        className="hover:shadow-lg transition-shadow dark:hover:shadow-xl shadow-md rounded-xl"
        style={{ cursor: 'pointer', maxHeight: '15vh' }}
      />

      {/* Lightbox */}
      {isOpen && (
        <div className="lightbox" onClick={toggleLightbox}>
          <span
            className="lightbox-content"
            style={{ backgroundImage: `url(${fullSizeUrl})` }}
          />
        </div>
      )}
    </div>
  );
}

export default ImageLightbox;
