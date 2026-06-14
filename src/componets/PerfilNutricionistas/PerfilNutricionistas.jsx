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
          
          {/* Lado esquerdo: Imagem */}
          <div className="img-nutricionista">
            <img
              src={converterUrlGithub(foto_do_nutricionista)}
              alt={`Foto de ${nome}`}
            />
          </div>

          {/* Lado direito: Informações Blocadas */}
          <div className="infos-nutricionista">
            
            {/* Bloco 1: Nome e Especialidade */}
            <div className="box-perfil">
              <h2>Nome: {nome}</h2>
              <h4>Especialidade: {especialidade}</h4>
            </div>

            {/* Bloco 2: Sobre */}
            <div className="box-perfil">
              <h3>SOBRE:</h3>
              <p>{meu_resumo}</p>
            </div>

            {/* Bloco 3: Contatos e CRN */}
            <div className="box-perfil">
              <h3>CONTATO:</h3>
              <div className="contato-linhas">
                <p><strong>Telefone:</strong> {numero}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>CRN:</strong> {crn}</p>
              </div>
            </div>

            {/* Botão original alinhado conforme o padrão do site */}
            <a href={formatarWhatsapp(numero)} target="_blank" rel="noopener noreferrer" className="link-agendamento">
              <Buttons label="Agendar Consulta" variant="primary" size="large" />
            </a>

          </div>
        </div>
      </div>

      <img className="forma-fundo" src="/src/assets/images/rectangle 49.png" alt="" />
    </div>
  );
};

export default PerfilNutricionista;