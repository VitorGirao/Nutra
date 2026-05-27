import React from 'react';
// Ajustado: tirei um ponto (de ../ para ./) e usei o nome 'componets' que está na sua foto
import Buttons from './componets/Buttons/Buttons';
import BarraPesquisa from "./componets/BarraPesquisa/BarraPesquisa";
import { ChevronDown, User, Filter } from "lucide-react";
import CardNutricionista from "./componets/Cards/CardNutricionista";
import fotoNutricionista from "./assets/nutri.jpeg";
import PesquisaNutricionistas from "./pages/PesquisaNutricionistas";
import EscolhaPerfil from './componets/EscolherPerfil/EscolherPerfil';
import CadastroNutricionista from './componets/CadastroLogin/CadastroNutricionista';
import CadastroPaciente from './componets/CadastroLogin/CadastroPaciente';
import PerfilNutricionista from './componets/PerfilNutricionistas/PerfilNutricionistas';

function App() {
  const handleClick = () => {
    alert("Botão funcionando!");
  };

  return (
    <PerfilNutricionista/>
  );

}
export default App;