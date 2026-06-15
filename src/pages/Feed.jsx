import { useState, useEffect } from "react";
import SideBar from "../componets/NavBar/SideBar";
import PostCard from "../componets/Cards/PostCard/PostCard";
import Button from "../componets/Buttons/Buttons";
import NutritionistCard from "../componets/Cards/AvatarCard/NutritionistCard";
import "./Feed.css";
import { getFeaturedNutritionists, getPosts } from "../services/api";

function Feed() {
  const [listaPostagens, setListaPostagens] = useState([]);
  const [loadingFeed, setLoadingFeed] = useState(true);
  const [nutricionistasAleatorios, setNutricionistasAleatorios] = useState([]);
  const [loadingNutris, setLoadingNutris] = useState(true);

  // Ícone de "Soma/Plus" profissional em SVG para o botão de criar card
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

  // ==========================================================================
  // FETCH DO FEED (Buscando os posts e os respectivos dados dos autores)
  // ==========================================================================
  useEffect(() => {
    const carregarFeedCompleto = async () => {
      try {
        const posts = await getPosts();
        setListaPostagens(Array.isArray(posts) ? posts : []);
      } catch (error) {
        console.error("Erro ao carregar o feed de postagens:", error);
      } finally {
        setLoadingFeed(false);
      }
    };

    carregarFeedCompleto();
  }, []);

  // ==========================================================================
  // FETCH DO WIDGET LATERAL (Busca todos os nutris e sorteia 3 para exibição)
  // ==========================================================================
  useEffect(() => {
    const buscarESortearNutricionistas = async () => {
      try {
        const featured = await getFeaturedNutritionists(3);
        setNutricionistasAleatorios(Array.isArray(featured) ? featured : []);
      } catch (error) {
        console.error(
          "Erro ao buscar nutricionistas para o widget lateral:",
          error,
        );
      } finally {
        setLoadingNutris(false);
      }
    };

    buscarESortearNutricionistas();
  }, []);

  // ==========================================================================
  // HANDLERS DAS AÇÕES DOS CARDS
  // ==========================================================================
  const handleLerMais = (post) => {
    console.log("Abrindo postagem completa:", post);
    // Aqui futuramente você pode colocar o navigate(`/post/${post.id}`, { state: { post } })
  };

  const handleSalvar = (id) => {
    console.log("Salvar post com ID:", id);
  };

  const handleOpcoes = (id) => {
    console.log("Opções do post com ID:", id);
  };

  return (
    <div className="layout-pagina-wrapper">
      <SideBar />

      <main className="pesquisa-conteudo-principal">
        <div className="conteudo-duas-colunas">
          {/* COLUNA ESQUERDA: FEED */}
          <div className="coluna-feed">
            <section>
              <div className="header-flex-title">
                <div>
                  <h1>Bem-vindo de volta, Maria!</h1>
                  <h4>Confira suas leituras para hoje</h4>
                </div>

                <Button
                  variant="primary"
                  size="medium"
                  onClick={() => console.log("Criar publicação")}
                  label={
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
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
                    onLerMais={handleLerMais}
                    onSalvar={handleSalvar}
                    onOpcoes={handleOpcoes}
                  />
                ))
              )}
            </div>
          </div>

          {/* COLUNA DIREITA: WIDGET LATERAL */}
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
