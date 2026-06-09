import React from 'react';
import SideBar from '../componets/NavBar/SideBar'; 
import PostCard from '../componets/Cards/PostCard/PostCard';
import Button from '../componets/Buttons/Buttons';
import { NutritionistCard } from '../componets/Cards/AvatarCard/NutritionistCard'; 
import './Feed.css';

function Feed() {
    // Ícone de "Soma/Plus" profissional em SVG
    const PlusIcon = (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
    );

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
        <div className="layout-pagina-wrapper">
            <SideBar />

            <main className="pesquisa-conteudo-principal">
                <div className="conteudo-duas-colunas">
                    
                    <div className="coluna-feed">
                        <section className="pesquisa-header">
                            <div className="header-flex-title">
                                <div>
                                    <h1>Bem-vindo de volta, Maria!</h1>
                                    <h4>Confira suas leituras para hoje</h4>
                                </div>
                                
                                {/* USANDO O SEU COMPONENTE BUTTON AQUI */}
                                <Button 
                                    variant="primary" 
                                    size="medium"
                                    onClick={() => console.log("Criar publicação")}
                                    label={
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            {PlusIcon}
                                            Criar card
                                        </div>
                                    }
                                />
                            </div>
                        </section>

                        <div className="feed-page-container">
                            {listaPostagens.map((post) => (
                                <PostCard
                                    key={post.id}
                                    post={post}
                                />
                            ))}
                        </div>
                    </div>

                    <aside className="coluna-widgets">
                        <NutritionistCard />
                    </aside>

                </div>
            </main>
        </div>
    );
}

export default Feed;