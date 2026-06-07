import React from 'react';
import './CardBody.css';

function CardBody({ titulo, subtitulo, resumo }) {
  return (
    <div className="card-body-comp">
      <h2 className="card-body-comp__title">{titulo}</h2>
      <h3 className="card-body-comp__subtitle">{subtitulo}</h3>
      <p className="card-body-comp__excerpt">{resumo}</p>
    </div>
  );
}

export default CardBody;