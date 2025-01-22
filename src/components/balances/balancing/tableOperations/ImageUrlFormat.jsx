import React, { useEffect, useState } from 'react';

const ImageUrlFormat = ({ image_url }) => {


  return (
    <img src={image_url} alt="Imagen convertida" className="w-full py-2" />
  );
};

export default ImageUrlFormat;
