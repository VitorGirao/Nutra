import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../componets/NavBar/SideBar";
import PostCard from "../componets/Cards/PostCard/PostCard";
import {
  getNutricionistaLogado,
  getPacienteLogado,
  getPosts,
  toggleSalvarPost,
} from "../services/api/index";
import "./MeusSalvos.css";

export default function MeusSalvos() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const carregarPostsSalvos = async () => {
      try {
        setLoading(true);
        setErro("");

        const dadosSalvos = localStorage.getItem("usuarioLogado");
        const usuarioLogado = dadosSalvos ? JSON.parse(dadosSalvos) : null;
        const tipoUsuario = String(
          usuarioLogado?.tipo_usuario || usuarioLogado?.tipoUsuario || ""
        ).toLowerCase();
        const userId = usuarioLogado?.id || usuarioLogado?._id || usuarioLogado?.uid;

        const [todosPosts, dadosUsuario] = await Promise.all([
          getPosts(),
          userId && (tipoUsuario === "paciente" || tipoUsuario === "nutricionista")
            ? tipoUsuario === "paciente"
              ? getPacienteLogado(userId)
              : getNutricionistaLogado(userId)
            : Promise.resolve(null),
        ]);

        const postsDaApi = Array.isArray(todosPosts) ? todosPosts : [];
        const idsSalvos = Array.isArray(
          dadosUsuario?.["id posts salvos"] ||
            dadosUsuario?.id_posts_salvos ||
            dadosUsuario?.postsSalvos ||
            []
        )
          ? dadosUsuario["id posts salvos"] || dadosUsuario.id_posts_salvos || dadosUsuario.postsSalvos || []
          : [];

        const postsFiltrados = postsDaApi.filter((post) =>
          idsSalvos.some((idSalvo) => String(post.id) === String(idSalvo))
        );

        setPosts(postsFiltrados);
      } catch (error) {
        console.error("Erro ao carregar os posts salvos:", error);
        setErro("Não foi possível carregar seus posts salvos no momento.");
      } finally {
        setLoading(false);
      }
    };

    carregarPostsSalvos();
  }, []);

  async function handleSalvar(id) {
    const confirmar = window.confirm("Deseja remover este post dos salvos?");
    if (!confirmar) return;

    try {
      const dadosSalvos = localStorage.getItem("usuarioLogado");
      const usuarioLogado = dadosSalvos ? JSON.parse(dadosSalvos) : null;
      const tipoUsuario = String(
        usuarioLogado?.tipo_usuario || usuarioLogado?.tipoUsuario || ""
      ).toLowerCase();
      const userId = usuarioLogado?.id || usuarioLogado?._id || usuarioLogado?.uid;

      if (!userId || (tipoUsuario !== "paciente" && tipoUsuario !== "nutricionista")) {
        alert("Não foi possível identificar o usuário logado.");
        return;
      }

      const resultado = await toggleSalvarPost(tipoUsuario, userId, id);
      if (resultado?.status === "removido") {
        setPosts((prev) => prev.filter((post) => String(post.id) !== String(id)));
      }
    } catch (error) {
      console.error("Erro ao remover post dos salvos:", error);
      alert("Não foi possível remover este post dos salvos.");
    }
  }

  function handleLerMais(post) {
    if (post?.id) {
      navigate(`/ver-post/${post.id}`);
    }
  }

  return (
    <div className="layout-pagina-wrapper">
      <SideBar />

      <main className="pesquisa-conteudo-principal">
        <section className="salvos-header">
          <h1>Meus Salvos</h1>
          <h4>Confira os posts que você salvou</h4>
        </section>

        {loading ? (
          <p className="salvos-vazio">Carregando seus posts salvos...</p>
        ) : erro ? (
          <p className="salvos-vazio">{erro}</p>
        ) : posts.length === 0 ? (
          <p className="salvos-vazio">Você ainda não salvou nenhum post.</p>
        ) : (
          <div className="salvos-grid">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                isSalvo={true}
                canSavePost={true}
                canManagePost={false}
                canDeletePost={false}
                onSalvar={handleSalvar}
                onLerMais={handleLerMais}
                onOpcoes={() => {}}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
