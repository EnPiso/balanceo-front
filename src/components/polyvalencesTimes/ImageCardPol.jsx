
import { Avatar, Tooltip } from '@nextui-org/react';
import React, { useState } from 'react';
import { userAvatarImage } from '../../infraestructure/data/links';


const ImageCardPol = ({ image }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Función para abrir y cerrar el lightbox
  const toggleLightbox = () => setIsOpen(!isOpen);

  return (
    <span>
        <Avatar
          size="md" 
          className="w-24 h-24 rounded-full"
          src={image ? image : `${userAvatarImage}`}
          alt={"operarios-" + image ? image : ''}
          onClick={image ? toggleLightbox : null}
          color={image ? "success" : "default"}
          isBordered 
        />
   
      

      {/* Lightbox */}
      {isOpen && (
        <div className="lightbox" onClick={toggleLightbox}>
          <span
            className="lightbox-content"
            style={{ backgroundImage: `url(${image})` }}
          />
        </div>
      )}
    </span>
  );
}

export default ImageCardPol;
