import React, { useState, useEffect } from "react";
import "./PesquisaNutricionistas.css";

import SideBar from "../componets/NavBar/SideBar";
import BarraPesquisa from "../componets/BarraPesquisa/BarraPesquisa";
import Button from "../componets/Buttons/Buttons";
import CardNutricionista from "../componets/Cards/CardNutricionista";

import db from "../services/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

import { ChevronDown, Filter } from "lucide-react";

const converterUrlGithub = (url) => {
  if (!url) return "";
  return url
    .replace("https://github.com/", "https://raw.githubusercontent.com/")
    .replace("/blob/", "/");
};

function PesquisaNutricionistas() {
  const [nutricionistas, setNutricionistas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const buscarNutricionistas = async () => {
      try {
        const snapshot = await getDocs(collection(db, "nutricionistas"));
        const lista = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNutricionistas(lista);
      } catch (error) {
        console.error("Erro ao buscar nutricionistas:", error);
        setErro(error.message);
      } finally {
        setLoading(false);
      }
    };

    buscarNutricionistas();
  }, []);

  const [ordem, setOrdem] = useState("asc");
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [tipoSelecionado, setTipoSelecionado] = useState("Todos");
  const [menuFiltroAberto, setMenuFiltroAberto] = useState(false);

  const alternarOrdem = () => {
    setOrdem((ordemAtual) => (ordemAtual === "asc" ? "desc" : "asc"));
  };

  const toggleMenuFiltro = () => {
    setMenuFiltroAberto(!menuFiltroAberto);
  };

  const selecionarTipo = (tipo) => {
    setTipoSelecionado(tipo);
    setMenuFiltroAberto(false);
  };

  const nutricionistasFiltrados = Array.isArray(nutricionistas)
    ? nutricionistas.filter((nutri) => {
        const bateNoNome = nutri.nome?.toLowerCase().includes(termoPesquisa.toLowerCase()) || false;
        const bateNoTipo = tipoSelecionado === "Todos" || nutri.especialidade === tipoSelecionado;
        return bateNoNome && bateNoTipo;
      })
    : [];

  const nutricionistasOrdenados = [...nutricionistasFiltrados].sort((a, b) => {
    if (ordem === "asc") return (a.nome || "").localeCompare(b.nome || "", "pt-BR");
    else return (b.nome || "").localeCompare(a.nome || "", "pt-BR");
  });

  const sampleEspecialidades = [
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
    <div className="layout-pagina-wrapper">
      <SideBar />

      <main className="pesquisa-conteudo-principal">
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

            <div className="filtro-botao-wrapper">
              <div onClick={toggleMenuFiltro}>
                <Button variant="primary" icon={<Filter size={20} />} iconOnly={true} />
              </div>

              {menuFiltroAberto && (
                <div className="dropdown-filtro-menu">
                  {sampleEspecialidades.map((tipo) => (
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
          {loading && <p>Carregando...</p>}
          {erro && <p style={{ color: "red" }}>Erro: {erro}</p>}

          <h6>
            {nutricionistasOrdenados.length} Nutricionistas encontrados
            {tipoSelecionado !== "Todos" && ` em ${tipoSelecionado}`}
          </h6>

          <button className="ordenar-btn" onClick={alternarOrdem}>
            {ordem === "asc" ? "Ordem Alfabética (A-Z)" : "Ordem Alfabética (Z-A)"}
            <ChevronDown
              size={16}
              style={{
                transform: ordem === "desc" ? "rotate(180deg)" : "none",
                transition: "transform 0.2s",
              }}
            />
          </button>
        </section>

        <section className="cards-grid">
          {nutricionistasOrdenados.map((nutri) => (
            <CardNutricionista
              key={nutri.id}
              nutricionista={nutri}
              nome={nutri.nome}
              tipo={nutri.especialidade}
              resumo={nutri.meu_resumo}
              foto={converterUrlGithub(nutri.foto_do_nutricionista)}
            />
          ))}
        </section>
      </main>
    </div>
  );
}

export default PesquisaNutricionistas;