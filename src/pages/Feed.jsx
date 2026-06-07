import React from 'react';
import SideBar from '../componets/NavBar/SideBar'; // IMPORTANTE: Puxando a sua barra lateral
import PostCard from '../componets/Cards/PostCard/PostCard';
import './Feed.css';

function Feed() {
    const listaPostagens = [
        {
            id: 1,
            autorNome: "Maria João",
            autorSub: "Nutricionista",
            autorFoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
            postImagem: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&fit=crop",
            titulo: "Segredos da Alimentação",
            subtitulo: "Como realmente seguir sua dieta",
            resumo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
            id: 2,
            autorNome: "Maria João",
            autorSub: "Nutricionista",
            autorFoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
            postImagem: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&fit=crop",
            titulo: "Proteínas Vegetais: aliadas da saúde",
            subtitulo: "Descubra os melhores alimentos e como incluir no seu dia a dia",
            resumo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        }
    ];

    return (
        /* 1. Wrapper principal que alinha a SideBar fixa na esquerda e o conteúdo na direita */
        <div className="layout-pagina-wrapper">

            {/* 2. Renderiza a barra lateral na esquerda */}
            <SideBar />

            {/* 3. Área de conteúdo principal empurrada para a direita (margin-left) para não ser coberta */}
            <main className="pesquisa-conteudo-principal">
                <section className="pesquisa-header">
                    <h1>Bem Vindo de volta, Maria</h1>
                    <h4>Confira o que temos hoje para você</h4>
                </section>
                <div className="feed-page-container">
                    {listaPostagens.map((post) => (
                        <PostCard
                            key={post.id}
                            post={post}
                            onLerMais={() => console.log(`Abrindo a publicação ${post.id}`)}
                            onSalvar={() => console.log(`Salvou a publicação ${post.id}`)}
                            onOpcoes={() => console.log(`Abriu opções da publicação ${post.id}`)}
                        />
                    ))}
                </div>
            </main>

        </div>
    );
}

export default Feed;