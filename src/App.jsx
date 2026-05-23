import React from 'react';
// Ajustado: tirei um ponto (de ../ para ./) e usei o nome 'componets' que está na sua foto
import Buttons from './componets/Buttons/Buttons';
import BarraPesquisa from "./componets/BarraPesquisa/BarraPesquisa";
import { ChevronDown, User, Filter } from "lucide-react";
import CardNutricionista from "./componets/Cards/CardNutricionista";
import fotoNutricionista from "./assets/nutri.jpeg";

function App() {
  const handleClick = () => {
    alert("Botão funcionando!");
  };

  return (

    <div
      style={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >

      {/* BARRA DE PESQUISA */}
      <BarraPesquisa
        placeholder="Procurar nutricionistas"
      />

      {/* BOTÕES */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >

        <Buttons
          label="Ver Perfil"
          variant="primary"
          size="medium"
        />

        <Buttons
          label="Ordem Alfabética"
          variant="primary"
          size="medium"
          icon={<ChevronDown size={18} />}
        />

        <Buttons
          label="Meu Perfil"
          variant="secondary"
          size="large"
          icon={<User size={18} />}
        />

        <Buttons
          variant="primary"
          icon={<Filter size={20} />}
          iconOnly={true}
        />

      </div>

      {/* CARD */}
      <CardNutricionista
        foto={fotoNutricionista}
        nome="Naty Natille Lorrane"
        tipo="Nutrição Clínica"
        resumo="Focado no tratamento de doenças e na recuperação da saúde através de dietas hospitalares e ambulatoriais."
      />
    </div>
  );

}
export default App;