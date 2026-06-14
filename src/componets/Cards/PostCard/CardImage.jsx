import React from 'react';
import './CardImage.css';

const converterUrlDrive = (url) => {
  if (!url) return "";

  // 1. Se o link já for do GitHub, trata igualzinho nos nutris
  if (url.includes("github.com")) {
    return url
      .replace("https://github.com/", "https://raw.githubusercontent.com/")
      .replace("/blob/", "/");
  }

  // 2. Se o link for do Google Drive, usa o truque da Thumbnail em alta definição (sz=w1000)
  if (url.includes("drive.google.com")) {
    try {
      let id = "";
      if (url.includes("/d/")) {
        id = url.split("/d/")[1].split("/")[0].split("?")[0];
      } else if (url.includes("id=")) {
        id = url.split("id=")[1].split("&")[0];
      }
      
      if (id) {
        // Essa URL de thumbnail burla o bloqueio de segurança do Google Drive
        return `https://drive.google.com/thumbnail?authuser=0&sz=w1000&id=${id}`;
      }
    } catch (error) {
      console.error("Erro ao converter link do Drive:", error);
    }
  }

  return url;
};

function CardImage({ src, alt }) {
  const urlFinal = converterUrlDrive(src);

  return (
    <div className="card-image-comp">
      <img 
        src={urlFinal} 
        alt={alt} 
        className="card-image-comp__img" 
        style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
        onError={(e) => {
          console.error("Erro crítico ao renderizar imagem:", urlFinal);
        }}
      />
    </div>
  );
}

export default CardImage;