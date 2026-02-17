import { Avatar } from '@nextui-org/react';
import React, { useState } from 'react';

const ImageLightboxQuesRes = ({ imageUrl }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Función para abrir y cerrar el lightbox
  const toggleLightbox = () => setIsOpen(!isOpen);

  return (
    <div>
      {/* Imagen en miniatura que abre el lightbox al hacer clic */}
      <Avatar
        src={imageUrl}
        alt={imageUrl}
        onClick={toggleLightbox}
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

export default ImageLightboxQuesRes;
