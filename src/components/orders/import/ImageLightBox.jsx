import React, { useState } from 'react';

const ImageLightbox = ({ thumbnailUrl, fullSizeUrl,alt,isOperList }) => {
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
          className="w-36 h-36 object-contain mb-2 "
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
