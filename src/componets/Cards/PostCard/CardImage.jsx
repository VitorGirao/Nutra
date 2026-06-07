import React from 'react';
import './CardImage.css';

function CardImage({ src, alt }) {
  return (
    <div className="card-image-comp">
      <img src={src} alt={alt} className="card-image-comp__img" />
    </div>
  );
}

export default CardImage;