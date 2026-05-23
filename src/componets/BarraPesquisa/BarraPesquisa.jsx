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
        value={value}
        onChange={onChange}
      />

      <Search
        size={22}
        className="searchbar-icon"
      />

    </div>
  );
};

export default BarraPesquisa;