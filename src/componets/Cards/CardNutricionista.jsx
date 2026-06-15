import React from 'react';
import { Link } from 'react-router-dom';
import FotoNutriCard from "../Imagens/FotoNutriCard/FotoNutriCard";
import NomeNutricionista from "../Textos/NomeNutricionista";
import TipoNutricionista from "../Textos/TipoNutricionista";
import ResumoNutricionista from "../Textos/ResumoNutricionista";
import Buttons from '../Buttons/Buttons';
import { ChevronRight } from "lucide-react";
import "./CardNutricionista.css";

function CardNutricionista({ foto, nome, tipo, resumo, nutricionista }) {
  return (
    <div className="card-nutri">
      <FotoNutriCard foto={foto} nome={nome} />

      <div className="conteudo-card">
        <NomeNutricionista nome={nome} />
        <TipoNutricionista tipo={tipo} />
        <ResumoNutricionista resumo={resumo} />

        <Link to={`/PerfilNutricionistas?id=${nutricionista?.id || ""}`} state={{ nutricionista }}>
          <Buttons
            label="Ver Perfil"
            variant="primary"
            size="small"
            icon={<ChevronRight size={18} />}
          />
        </Link>
      </div>
    </div>
  );
}

export default CardNutricionista;