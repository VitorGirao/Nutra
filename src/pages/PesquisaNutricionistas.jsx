import React, { useState } from "react";
import "./PesquisaNutricionistas.css";

import NavBar from "../componets/NavBar/Navbar";
import BarraPesquisa from "../componets/BarraPesquisa/BarraPesquisa";
import Button from "../componets/Buttons/Buttons";
import CardNutricionista from "../componets/Cards/CardNutricionista";

// Importando o JSON direto
import dadosJson from "../../public/data/nutricionistas.json"; 

import { ArrowLeft, Home, Users, User } from 'lucide-react';
import { ChevronDown, Filter } from "lucide-react";

function PesquisaNutricionistas() {
  const nutricionistas = dadosJson.nutricionistas || [];

  // Estados controladores de ordenação e pesquisa por nome
  const [ordem, setOrdem] = useState("asc"); // 'asc' = A-Z, 'desc' = Z-A
  const [termoPesquisa, setTermoPesquisa] = useState("");

  // Estados do menu dropdown de filtro por especialidade
  const [tipoSelecionado, setTipoSelecionado] = useState("Todos");
  const [menuFiltroAberto, setMenuFiltroAberto] = useState(false);

  // Função para inverter a ordem (A-Z / Z-A)
  const alternarOrdem = () => {
    setOrdem((ordemAtual) => (ordemAtual === "asc" ? "desc" : "asc"));
  };

  // Abre e fecha o menu de categorias
  const toggleMenuFiltro = () => {
    setMenuFiltroAberto(!menuFiltroAberto);
  };

  // Seleciona a especialidade e fecha o menu automaticamente
  const selecionarTipo = (tipo) => {
    setTipoSelecionado(tipo);
    setMenuFiltroAberto(false);
  };

  // 1. FILTRAGEM COMBINADA: Nome + Especialidade selecionada
  const nutricionistasFiltrados = nutricionistas.filter((nutri) => {
    const bateNoNome = nutri.nome.toLowerCase().includes(termoPesquisa.toLowerCase());
    const bateNoTipo = tipoSelecionado === "Todos" || nutri.tipoNutricionista === tipoSelecionado;
    
    return bateNoNome && bateNoTipo;
  });

  // 2. ORDENAÇÃO: Organiza alfabeticamente o resultado dos filtros
  const nutricionistasOrdenados = [...nutricionistasFiltrados].sort((a, b) => {
    if (ordem === "asc") {
      return a.nome.localeCompare(b.nome, "pt-BR");
    } else {
      return b.nome.localeCompare(a.nome, "pt-BR");
    }
  });

  // Lista de especialidades correspondentes ao seu banco de dados
  const especialidades = [
    "Todos",
    "Nutricionista Clínico",
    "Nutricionista Esportivo",
    "Nutricionista Infantil",
    "Nutricionista Vegano",
    "Nutricionista Materno Infantil",
    "Nutricionista Funcional",
    "Nutricionista Hospitalar",
    "Nutricionista Estético"
  ];

  return (
    <div className="pesquisa-container">
      <NavBar />

      <section className="pesquisa-header">
        <h1>Encontre o nutricionista Ideal para você</h1>
        <h4>Encontre aqui o seu estilo de vida!</h4>
      </section>

      <section className="pesquisa-filtros">
        <div className="barra-area">
          <BarraPesquisa 
            placeholder="Pesquisar por nome..."
            value={termoPesquisa}
            onChange={(e) => setTermoPesquisa(e.target.value)}
          />
          
          {/* O SEU BOTÃO VERDE ORIGINAL COM O DROPDOWN LIMPO */}
          <div className="filtro-botao-wrapper">
            <div onClick={toggleMenuFiltro}>
              <Button
                variant="primary"
                icon={<Filter size={20} />}
                iconOnly={true}
              />
            </div>

            {/* Menu Dropdown gerenciado inteiramente pelo arquivo CSS da página */}
            {menuFiltroAberto && (
              <div className="dropdown-filtro-menu">
                {especialidades.map((tipo) => (
                  <button
                    key={tipo}
                    onClick={() => selecionarTipo(tipo)}
                    className={`dropdown-filtro-item ${tipoSelecionado === tipo ? "ativo" : ""}`}
                  >
                    {tipo === "Todos" ? "Todas as Especialidades" : tipo}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="pesquisa-info">
        <h6>
          {/* Informa dinamicamente a quantidade e onde está filtrando */}
          {nutricionistasOrdenados.length} Nutricionistas encontrados 
          {tipoSelecionado !== "Todos" && ` em ${tipoSelecionado}`}
        </h6>

        <button className="ordenar-btn" onClick={alternarOrdem}>
          {ordem === "asc" ? "Ordem Alfabética (A-Z)" : "Ordem Alfabética (Z-A)"}
          <ChevronDown 
            size={16} 
            style={{ 
              transform: ordem === "desc" ? "rotate(180deg)" : "none", 
              transition: "transform 0.2s" 
            }} 
          />
        </button>
      </section>

      <section className="cards-grid">
        {/* Renderização final limpa e dinâmica */}
        {nutricionistasOrdenados.map((nutri) => (
          <CardNutricionista
            key={nutri.id}
            nome={nutri.nome}
            tipo={nutri.tipoNutricionista}
            resumo={nutri.resumo}
            foto={nutri.foto} 
          />
        ))}
      </section>
    </div>
  );
}

export default PesquisaNutricionistas;