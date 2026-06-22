import { useState } from "react";
import Button from "../../componets/Buttons/ButtonCriarPost";
import SideBar from "../../componets/NavBar/SideBar";
import PostForm from "../../componets/PostForm/PostForm";
import PostPreview from "../../componets/PostPreview/PostPreview";
import { publicarPost } from "../../services/postService/postService.js";
import "./CriarPost.css";

const DADOS_INICIAIS = {
  imagemUrl: "",
  titulo: "",
  subtitulo: "",
  resumo_do_post: "",
  corpo: "",
};

export default function CriarPost({ aoPublicar }) {
  const [dados, setDados] = useState(DADOS_INICIAIS);
  const [aba, setAba] = useState("editar");
  const [publicando, setPublicando] = useState(false);
  const [feedback, setFeedback] = useState("");
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado")) || {};
  const idNutricionista = usuarioLogado.id || usuarioLogado._id || usuarioLogado.uid || "";

  async function handlePublicar() {
    if (!idNutricionista) {
      setFeedback("Não foi possível identificar o nutricionista logado.");
      return;
    }

    if (!dados.titulo.trim()) {
      alert("O post precisa ter um título.");
      return;
    }

    if (
      !dados.subtitulo.trim() ||
      !dados.resumo_do_post.trim() ||
      !dados.corpo.trim() ||
      !dados.imagemUrl.trim()
    ) {
      alert("Preencha título, subtítulo, resumo, conteúdo e URL da imagem.");
      return;
    }

    setPublicando(true);
    setFeedback("");

    try {
      const postPublicado = await publicarPost({
        titulo: dados.titulo.trim(),
        subtitulo: dados.subtitulo.trim(),
        resumo_do_post: dados.resumo_do_post.trim(),
        conteudo: dados.corpo.trim(),
        imagem_post: dados.imagemUrl.trim(),
        id_nutricionista: idNutricionista,
      });

      aoPublicar?.({
        post: postPublicado,
        toast: { tipo: "sucesso", texto: "Post publicado com sucesso!" },
      });
    } catch (error) {
      setFeedback(error.message || "Erro ao publicar. Tente novamente.");
    } finally {
      setPublicando(false);
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
            {publicando ? "Publicando..." : "Postar"}
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
