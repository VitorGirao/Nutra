import React from 'react';
import './CardHeader.css';

function OptionsIcon() {
  return (
    <svg width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  );
}

function CardHeader({ foto, nome, sub, onOpcoes }) {
  return (
    <header className="card-header-comp">
      <div className="card-header-comp__author">
        <img src={foto} alt={`Foto de ${nome}`} className="card-header-comp__avatar" />
        <div className="card-header-comp__text">
          <span className="card-header-comp__name">{nome}</span>
          <span className="card-header-comp__sub">{sub}</span>
        </div>
      </div>
      <button className="card-header-comp__btn" onClick={onOpcoes}>
        <OptionsIcon />
      </button>
    </header>
  );
}

export default CardHeader;