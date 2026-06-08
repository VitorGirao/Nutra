import React from 'react';
import { useLocation } from 'react-router-dom';
import Buttons from '../Buttons/Buttons';
import SideBar from '../NavBar/SideBar';
import "./PerfilNutricionistas.css";

const converterUrlGithub = (url) => {
  if (!url) return "";
  return url
    .replace("https://github.com/", "https://raw.githubusercontent.com/")
    .replace("/blob/", "/");
};

const formatarWhatsapp = (numero) => {
  if (!numero) return "#";
  const apenasDigitos = numero.replace(/\D/g, "");
  return `https://wa.me/55${apenasDigitos}`;
};

const PerfilNutricionista = () => {
  const location = useLocation();
  const nutricionista = location.state?.nutricionista;

  if (!nutricionista) {
    return <p>Nutricionista não encontrado.</p>;
  }

  const {
    nome,
    especialidade,
    meu_resumo,
    numero,
    email,
    crn,
    foto_do_nutricionista,
  } = nutricionista;

  return (
    <div className="layout-pagina-wrapper">
      <SideBar />

      <div className="perfil-conteudo-principal">
        <div className="container">
          <div className="img-nutricionista">
            <img
              src={converterUrlGithub(foto_do_nutricionista)}
              alt={`Foto de ${nome}`}
            />
          </div>

          <div className="infos-nutricionista">
            <h2>{nome}</h2>
            <h4>{especialidade}</h4>
            <h3>Sobre</h3>
            <p>{meu_resumo}</p>
            <h3>Contato</h3>
            <p>Telefone: {numero}</p>
            <p>Email: {email}</p>
            <p>CRN: {crn}</p>
            <a href={formatarWhatsapp(numero)} target="_blank" rel="noopener noreferrer">
              <Buttons label="Agendar Consulta" variant="primary" size="medium" />
            </a>
          </div>
        </div>
      </div>

      <img className="forma-fundo" src="/src/assets/images/rectangle 49.png" alt="" />
    </div>
  );
};

export default PerfilNutricionista;