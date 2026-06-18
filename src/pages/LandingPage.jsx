import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./landingpage.css"
import NavBar from "../componets/NavBar/NavBar";
import frutasImg from "../assets/frutas 1.png";
import gramaImg from "../assets/Group 112.png";
import laranja from "../assets/laranja 1 1.png";
import separador1 from "../assets/separador1.png";
import separador2 from "../assets/separador2.png";
import maca1 from "../assets/maça 1.png";
import fundoCTA from "../assets/fundocta.png";

export default function LandingPage() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state?.scrollTo) {
            const elemento = document.querySelector(
                `[data-section="${location.state.scrollTo}"]`
            );
            if (elemento) {
                elemento.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [location.state]);

    return (
        <div>
            <NavBar />

            {/* HERO */}
            <section className="hero-section" data-section="inicio">
                <div className="hero-container">
                    <div className="hero-content">
                        <div className="hero-text">
                            <h1>Nutra</h1>
                            <p>Comer melhor não precisa <br /> ser complicado</p>
                        </div>
                    </div>
                </div>

                {/* Container da grama separado */}
                <div className="hero-grass">
                    {/* Substitua pelo caminho correto da imagem da grama */}
                    <img src={gramaImg} alt="Grama decorativa" className="grass-img" />
                </div>
            </section>

            {/* SOBRE */}
            <section className="sobre" data-section="sobre">
                <div className="sobre-container">
                    <div className="Character">
                        <img src={laranja} alt="laranja" />
                    </div>
                    <div className="sobre-conteudo">
                        <h2>Nutrição simples pra vida real</h2>
                        <p>
                            Nosso app foi feito pra quem quer cuidar da alimentação de um jeito leve, prático e possível. Aqui você encontra receitas acessíveis, dicas simples de nutrição e ainda pode se conectar com profissionais que ajudam de verdade — sem papo difícil e sem dietas malucas.
                        </p>
                    </div>
                </div>
            </section>

            {/* BENEFÍCIOS */}
            <section className="beneficios" data-section="beneficios">
                <img src={separador1} alt="separador 1" className="separador" />
                <div className="beneficios-container">
                    <h2>Por que usar o Nutra?</h2>
                    <div className="beneficios-itens">
                        <div>
                            <div className="beneficios-item">
                                <div className="numero"> <h1>01</h1> </div>
                                <div>
                                    <h3>Receitas fáceis de verdade</h3>
                                    <p>Pratos simples, gostosos e práticos pra fazer no dia a dia, com ingredientes acessíveis e sem complicação.</p>
                                </div>
                            </div>

                            <div className="beneficios-item">
                                <div className="numero"> <h1>02</h1> </div>
                                <div>
                                    <h3>Dicas sem neura</h3>
                                    <p>Aprenda mais sobre alimentação com conteúdos leves, úteis e fáceis de entender. Sem terrorismo nutricional.</p>
                                </div>
                            </div>


                        </div>

                        <div>

                            <div className="beneficios-item">
                                <div className="numero"> <h1>03</h1> </div>
                                <div>
                                    <h3>Nutricionistas por perto</h3>
                                    <p>Encontre profissionais e atendimento especializado de forma rápida, simples e sem dor de cabeça.</p>
                                </div>
                            </div>


                            <div className="beneficios-item">
                                <div className="numero"> <h1>04</h1> </div>
                                <div>
                                    <h3>Feito pra vida real</h3>
                                    <p>A Nutra se adapta à sua rotina, ao seu tempo e ao seu bolso. Sem pressão, sem culpa e do seu jeito.</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <img src={separador2} alt="separador 2" className="separador separador2" />

            </section>

            {/* COMO FUNCIONA */}
            <section data-section="comoFunciona">
                <div className="comoFunciona-container">
                    <div className="comoFunciona-conteudo">
                        <div>
                            <h2>Como o Nutra funciona?</h2>
                            <p>
                                No Nutra você encontra receitas práticas, dicas simples
                                e conteúdos pensados para te ajudar a comer melhor sem
                                complicação. Explore o que faz sentido para sua rotina,
                                salve o que gosta e conecte-se com profissionais quando
                                precisar.
                            </p>
                        </div>
                        <div>
                            <img src={maca1} alt="maça" />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="cta-section">
                <div className="cta-container">
                    <p>Comece a cuidar da alimentação de um jeito mais leve</p>
                    <h2>
                        Venha para o Nutra e descubra como comer melhor pode ser mais simples.
                    </h2>
                    <button className="cta-button" onClick={() => navigate('/escolher-perfil')}>Faça seu cadastro</button>
                </div>

                {/* Imagem com a nova classe */}
                <img src={fundoCTA} alt="fundo cta" className="cta-fundo-img" />
            </section>
        </div>
    );
}