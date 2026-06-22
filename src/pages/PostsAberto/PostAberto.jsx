import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SideBar from "../../componets/NavBar/SideBar";
import PostPreview from "../../componets/PostPreview/PostPreview";
import { getPostById } from "../../services/api/index";
import "./PostAberto.css";

export default function PostAberto({ aoVoltar, toastInicial = null }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(toastInicial);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    const buscarPost = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const dadosPost = await getPostById(id);
        
        let urlOriginal = dadosPost.imagem_post || dadosPost.imagem_posta || dadosPost.imagemUrl || "";
        let urlConvertida = urlOriginal;

        if (urlOriginal.includes("drive.google.com")) {
          const match = urlOriginal.match(/\/d\/([^/]+)/);
          if (match && match[1]) {
            urlConvertida = `https://lh3.googleusercontent.com/u/0/d/${match[1]}`;
          }
        }

        const postFormatado = {
          titulo: dadosPost.titulo,
          subtitulo: dadosPost.subtitulo,
          resumo_do_post: dadosPost.resumo_do_post,
          corpo: dadosPost.conteudo || dadosPost.corpo || dadosPost.resumo_do_post,
          imagemUrl: urlConvertida,
          autor: dadosPost.autor?.nome || "Nutricionista",
          dataPublicacao: dadosPost.data_de_criacao || dadosPost.data_criacao || "Recentemente",
        };

        setPost(postFormatado);
      } catch (error) {
        console.error(error);
        setToast({ tipo: "erro", texto: "Não foi possível carregar a postagem." });
      } finally {
        setLoading(false);
      }
    };

    buscarPost();
  }, [id]);

  return (
    <div className="post-aberto-page">
      <SideBar />

      <main className="post-aberto-conteudo">
        {loading ? (
          <p className="loading-texto">Carregando conteúdo do post...</p>
        ) : post ? (
          <PostPreview dados={post} modoCompleto={true} />
        ) : (
          <div style={{ padding: "20px", textAlign: "center" }}>
            <p>Postagem não encontrada.</p>
            <button onClick={() => navigate("/feed")} style={{ marginTop: "10px", cursor: "pointer" }}>
              Voltar para o Feed
            </button>
          </div>
        )}
      </main>

      {toast && (
        <div className={`post-aberto-toast ${toast.tipo}`}>
          {toast.tipo === "sucesso" ? "✅" : "❌"} {toast.texto}
        </div>
      )}
    </div>
  );
}
