import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../componets/NavBar/SideBar";
import PostCard from "../componets/Cards/PostCard/PostCard";
import Button from "../componets/Buttons/Buttons";
import NutritionistCard from "../componets/Cards/AvatarCard/NutritionistCard";
import "./Feed.css";
import { getFeaturedNutritionists, getPosts, getNutricionistaLogado, toggleSalvarPost } from "../services/api/index";

function Feed() {
  const [listaPostagens, setListaPostagens] = useState([]);
  const [loadingFeed, setLoadingFeed] = useState(true);
  const [nutricionistasAleatorios, setNutricionistasAleatorios] = useState([]);
  const [loadingNutris, setLoadingNutris] = useState(true);
  const [postsSalvos, setPostsSalvos] = useState([]);
  const navigate = useNavigate();

  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado")) || {};
  const nutriId = usuarioLogado.id || usuarioLogado._id || usuarioLogado.uid;

  const PlusIcon = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );

  useEffect(() => {
    const carregarFeedCompleto = async () => {
      try {
        const posts = await getPosts();
        setListaPostagens(Array.isArray(posts) ? posts : []);

        if (nutriId) {
          console.log("Buscando posts salvos atualizados para o Nutri:", nutriId);
          const dadosNutri = await getNutricionistaLogado(nutriId);
          
          // Verifica todas as variações possíveis de nome de campo que vêm do banco
          if (dadosNutri) {
            const postsSalvosNoBanco = dadosNutri["id posts salvos"] || dadosNutri.id_posts_salvos || dadosNutri.postsSalvos || [];
            setPostsSalvos(postsSalvosNoBanco);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar o feed de postagens:", error);
      } finally {
        setLoadingFeed(false);
      }
    };

    carregarFeedCompleto();
  }, [nutriId]);

  useEffect(() => {
    const buscarESortearNutricionistas = async () => {
      try {
        const featured = await getFeaturedNutritionists(3);
        setNutricionistasAleatorios(Array.isArray(featured) ? featured : []);
      } catch (error) {
        console.error("Erro ao buscar nutricionistas para o widget lateral:", error);
      } finally {
        setLoadingNutris(false);
      }
    };

    buscarESortearNutricionistas();
  }, []);

  const handleLerMais = (post) => {
    console.log("Abrindo postagem completa:", post);
  };

  const handleSalvar = async (id) => {
    if (!nutriId) {
      alert("Erro: ID do nutricionista não encontrado no localStorage! Faça login novamente.");
      return;
    }

    try {
      const resultado = await toggleSalvarPost(nutriId, id);
      if (resultado.status === "salvo") {
        setPostsSalvos((prev) => [...prev, id]);
      } else {
        setPostsSalvos((prev) => prev.filter((postId) => postId !== id));
      }
    } catch (error) {
      console.error("Erro ao alternar o estado de salvo da postagem:", error);
    }
  };

  const handleOpcoes = (id) => {
    console.log("Opções do post com ID:", id);
  };

  return (
    <div className="layout-pagina-wrapper">
      <SideBar />

      <main className="pesquisa-conteudo-principal">
        <div className="conteudo-duas-colunas">
          <div className="coluna-feed">
            <section>
              <div className="header-flex-title">
                <div>
                  <h1>Bem-vindo de volta, {usuarioLogado.nome || "Maria"}!</h1>
                  <h4>Confira suas leituras para hoje</h4>
                </div>

                <Button
                  variant="primary"
                  size="medium"
                  onClick={() => navigate('/criar-post')}
                  label={
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      {PlusIcon}
                      Criar card
                    </div>
                  }
                />
              </div>
            </section>

            <div className="feed-page-container">
              {loadingFeed ? (
                <p>Carregando postagens...</p>
              ) : listaPostagens.length === 0 ? (
                <p>Nenhuma publicação encontrada no momento.</p>
              ) : (
                listaPostagens.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    isSalvo={postsSalvos.includes(post.id)}
                    onLerMais={handleLerMais}
                    onSalvar={handleSalvar}
                    onOpcoes={handleOpcoes}
                  />
                ))
              )}
            </div>
          </div>

          <aside className="coluna-widgets">
            <NutritionistCard
              nutricionistas={nutricionistasAleatorios}
              loading={loadingNutris}
            />
          </aside>
        </div>
      </main>
    </div>
  );
}

export default Feed;