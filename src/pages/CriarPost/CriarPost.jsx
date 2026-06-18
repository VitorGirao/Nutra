import { useState } from "react";
import Button from "../../componets/Buttons/ButtonCriarPost";
import SideBar from "../../componets/NavBar/SideBar";
import PostForm from "../../componets/PostForm/PostForm";
import PostPreview from "../../componets/PostPreview/PostPreview";
import { publicarPost } from "../../services/postService/postService.js";
import "./CriarPost.css";

const DADOS_INICIAIS = {
  titulo: "",
  subtitulo: "",
  corpo: "",
  imagemUrl: "",
  imagemArquivo: null,
};

export default function CriarPost({ aoPublicar }) {
  const [dados, setDados] = useState(DADOS_INICIAIS);
  const [aba, setAba] = useState("editar");
  const [publicando, setPublicando] = useState(false);
  const [feedback, setFeedback] = useState("");

  async function handlePublicar() {
    if (!dados.titulo.trim()) {
      alert("O post precisa ter um título.");
      return;
    }

    setPublicando(true);
    setFeedback("");

    const resultado = await publicarPost({
      titulo: dados.titulo,
      subtitulo: dados.subtitulo,
      corpo: dados.corpo,
      // imagem: dados.imagemArquivo  ← descomente quando tiver API
    });

    setPublicando(false);

    if (resultado.sucesso) {
      aoPublicar?.({
        post: { ...dados, autor: "Você", dataPublicacao: "Agora" },
        toast: { tipo: "sucesso", texto: resultado.texto },
      });
    } else {
      setFeedback("❌ Erro ao publicar. Tente novamente.");
    }
  }

  return (
    <>
      <SideBar />

      <div className="pagina-criar-post">
        <div className="acoes-bar">
          <Button
            variante="outline"
            onClick={() => setAba(aba === "editar" ? "preview" : "editar")}
          >
            {aba === "editar" ? "Pré-visualização" : "Editar"}
          </Button>
          <Button onClick={handlePublicar} disabled={publicando}>
            {publicando ? "Publicando..." : "Continuar"}
          </Button>
        </div>

        <main className="conteudo">
          {aba === "editar" ? (
            <PostForm dados={dados} aoAtualizar={setDados} />
          ) : (
            <PostPreview dados={dados} />
          )}

          {feedback && <div className="feedback">{feedback}</div>}
        </main>
      </div>
    </>
  );
}