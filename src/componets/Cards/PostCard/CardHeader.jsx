import React from 'react';
import './CardHeader.css';

const converterUrlGithub = (url) => {
  if (!url) return "";
  if (url.includes("github.com")) {
    return url
      .replace("https://github.com/", "https://raw.githubusercontent.com/")
      .replace("/blob/", "/");
  }
  return url;
};

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
        <img 
          /* 🌟 Tratando a foto do nutri igualzinho ao minicard */
          src={foto ? converterUrlGithub(foto) : "https://cdn-icons-png.flaticon.com/512/1144/1144760.png"} 
          alt={`Foto de ${nome}`} 
          className="card-header-comp__avatar" 
          style={{ objectFit: 'cover' }}
        />
        <div className="card-header-comp__text">
          <span className="card-header-comp__name">{nome}</span>
          <span className="card-header-comp__sub">{sub}</span>
        </div>
      </div>
      
    </header>
  );
}

export default CardHeader;