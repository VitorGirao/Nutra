import React from "react";
import "./landingpage.css"
import NavBar from "../componets/NavBar/NavBar";
import frutasImg from "../assets/frutas 1.png"; 
import gramaImg from "../assets/Group 112.png";
import laranja from "../assets/laranja 1 1.png"
import separador1 from "../assets/separador1.png"

export default function LandingPage() {

  const benefits = [
    {
      number: "01",
      title: "Receitas fáceis de verdade",
      description: "Pratos simples, gostosos e práticos para o dia a dia.",
    },
    {
      number: "02",
      title: "Dicas sem neura",
      description: "Conteúdos leves, úteis e fáceis de entender.",
    },
    {
      number: "03",
      title: "Nutricionistas por perto",
      description: "Encontre profissionais para atendimento especializado.",
    },
    {
      number: "04",
      title: "Feito pra vida real",
      description: "Sem pressão. Nutrição adaptada à sua rotina.",
    },
  ];

  return (
    <div>
      <NavBar />

      {/* HERO */}
      <section className="hero-section">
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
      <section className="sobre">
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
      <section>
        <img src={separador1} alt="separador 1" className="separador" />
        <div>
          <h2>Por que usar o Nutra?</h2>
          <div>
            {benefits.map((item) => (
              <div key={item.number}>
                <div>{item.number}</div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section>
        <div>
          <div>
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
              <div>Character Placeholder</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div>
          <p>Comece a cuidar da alimentação de um jeito mais leve</p>
          <h2>
            Venha para o Nutra e descubra como comer melhor pode ser mais simples.
          </h2>
          <button>Faça seu cadastro</button>
        </div>
      </section>

    </div>
  );
}