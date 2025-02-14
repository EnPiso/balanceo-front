
import { Avatar, Tooltip } from '@nextui-org/react';
import React, { useState } from 'react';

const ImageAvatarMaster = ({ image }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Función para abrir y cerrar el lightbox
  const toggleLightbox = () => setIsOpen(!isOpen);

  return (
    <span className='py-1 px-1'>
      <Tooltip content="Ver operario">
        <Avatar
          src={image}
          alt={"operarios-" + image}
          onClick={toggleLightbox}
          color="success"
          isBordered 
          
        />
      </Tooltip>
      

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

export default ImageAvatarMaster;
