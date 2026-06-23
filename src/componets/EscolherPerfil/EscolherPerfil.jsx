import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EscolherPerfil.css";

export default function EscolhaPerfil({ aoContinuar }) {
  const [perfilSelecionado, setPerfilSelecionado] = useState("");
  const navigate = useNavigate();

  const nutricionistaSelecionado = perfilSelecionado === "nutricionista";
  const pacienteSelecionado = perfilSelecionado === "paciente";

  function continuarCadastro() {
    if (nutricionistaSelecionado) {
      aoContinuar?.();
      navigate("/CadastroNutricionista");
    } else if (pacienteSelecionado) {
      aoContinuar?.();
      navigate("/CadastroPaciente");
    }
  }

  return (
    <main className="pagina-escolha-perfil">
      <section className="tela-escolha-perfil">
        <h1 className="titulo-escolha-perfil">Antes de tudo...</h1>
        <h2 className="subtitulo-escolha-perfil">Quem você é?</h2>

        <div className="opcoes-perfil">
          <button
            type="button"
            className={`opcao-perfil ${nutricionistaSelecionado ? "selecionado" : ""}`}
            onClick={() => setPerfilSelecionado("nutricionista")}
          >
            <span className="icone-selecionado">✓</span>
            <div className="imagem-perfil nutri-img"></div>
            <span className="nome-perfil">Nutricionista</span>
          </button>

          <button
            type="button"
            className={`opcao-perfil ${pacienteSelecionado ? "selecionado" : ""}`}
            onClick={() => setPerfilSelecionado("paciente")}
          >
            <span className="icone-selecionado">✓</span>
            <div className="imagem-perfil paciente-img"></div>
            <span className="nome-perfil">Paciente</span>
          </button>
        </div>

        <button
          type="button"
          className="botao-continuar"
          disabled={!perfilSelecionado}
          onClick={continuarCadastro}
        >
          Continuar
        </button>
      </section>
    </main>
  );
}