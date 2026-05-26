import React from 'react';
// Ajustado: tirei um ponto (de ../ para ./) e usei o nome 'componets' que está na sua foto
import Buttons from './componets/Buttons/Buttons';
import BarraPesquisa from "./componets/BarraPesquisa/BarraPesquisa";
import { ChevronDown, User, Filter } from "lucide-react";
import CardNutricionista from "./componets/Cards/CardNutricionista";
import fotoNutricionista from "./assets/nutri.jpeg";
import PesquisaNutricionistas from "./pages/PesquisaNutricionistas";

function App() {
  const handleClick = () => {
    alert("Botão funcionando!");
  };

  return (
    <PesquisaNutricionistas />
  );

}
export default App;