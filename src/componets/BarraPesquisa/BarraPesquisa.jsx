import React from "react";
import "./BarraPesquisa.css";

import { Search } from "lucide-react";

const BarraPesquisa = ({
  placeholder = "Pesquisar",
  value,
  onChange,
}) => {
  return (
    <div className="searchbar-container">
      <input
        type="text"
        className="searchbar-input"
        placeholder={placeholder}
        value={value}      // Recebe o termoPesquisa vindo da página
        onChange={onChange}  // Avisa a página quando você digita
      />

      <Search
        size={22}
        className="searchbar-icon"
      />
    </div>
  );
};

export default BarraPesquisa;