import React, { useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import ImageLightbox from "../import/ImageLightBox";

function PasteImageManual({image, setImage}) {

  const handlePaste = (event) => {

    if(!image){
      const items = event.clipboardData?.items;

      if (!items) return;
  
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
  
        if (item.type.indexOf("image") !== -1) {
          const file = item.getAsFile();
          if (file) {
            const url = URL.createObjectURL(file);
            setImage(url);
          } else {
            console.warn("El item de imagen no devolvió un archivo válido.");
          }
        }
      }
    }

    
  };

  return (
    <div
      onPaste={handlePaste}
      tabIndex={0}
      style={{
        border: "2px dashed gray",
        padding: "30px",
        textAlign: "center",
        marginTop: "20px",
        cursor: "pointer",
      }}
    >
      {
        image ? 
          <button onClick={()=> setImage(null)} className="text-red-500 font-bold">
            Borrar imagen 
          </button> : 
          <p>
            <strong>
              Pega una imagen desde Excel aquí (Ctrl + V)
            </strong>
          </p>
      }
      
      {
        image && 
          <ImageLightbox
            thumbnailUrl={image}
            fullSizeUrl={image}
            alt={`medida medidas`}
            key={'98'}
          />
      
      }
      
    </div>
  );
}



export default PasteImageManual;
