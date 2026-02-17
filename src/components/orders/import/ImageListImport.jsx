import React, { useState } from 'react';

import ImageLightbox from "./ImageLightBox.jsx";
import TitleDashboard from "../../../ui/TitleDashboard.jsx";



const ImageListImport = ({ images }) => {


  return(
    <>
      <div className="mt-9">

        <div>

          <div>
            {images.length > 0 ? (
              images.map((src, index) => (
                <ImageLightbox
                  thumbnailUrl={src}
                  fullSizeUrl={src}
                  alt={`medida ${index + 1}`}
                  key={index}
                />
                // <ImageLightBox src={src} alt={`Imagen ${index + 1}`} key={index}/>
              ))
            ) : (
              <p>No se han extraído imágenes</p>
            )}
          </div>
        </div>


      </div>


    </>
  )
};

export default ImageListImport;
