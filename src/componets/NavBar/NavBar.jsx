import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Star, BookOpen, BookLock, User, Menu, X, Book } from 'lucide-react';
import "./NavBar.css";
import nutraLogo from "../../assets/NutraLogo.png";

const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [menuAberto, setMenuAberto] = useState(false);

    // Faz o scroll suave até a section pelo data-section.
    // Se o usuário não estiver na landing page, navega pra lá primeiro
    // e só depois rola até a section (usando state pra avisar o destino).
    const irPara = (destino) => {
        setMenuAberto(false);

        if (location.pathname !== '/landing') {
            navigate('/landing', { state: { scrollTo: destino } });
            return;
        }

        const elemento = document.querySelector(`[data-section="${destino}"]`);
        if (elemento) {
            elemento.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const irParaLogin = () => {
        setMenuAberto(false);
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <img src={nutraLogo} alt="Logo" className="navbar-logo" />

            {/* Botão hamburguer, só aparece no mobile */}
            <button
                className="navbar-toggle"
                onClick={() => setMenuAberto(!menuAberto)}
                aria-label="Abrir menu"
            >
                {menuAberto ? <X size={26} /> : <Menu size={26} />}
            </button>

            <div className={`navbar-acoes ${menuAberto ? "navbar-acoes-aberto" : ""}`}>
                <div className="navbar-item" onClick={() => irPara('inicio')}>
                    <Home size={20} className="icon" />
                    <p>Início</p>
                </div>

                <div className="navbar-item" onClick={() => irPara('sobre')}>
                    <BookOpen size={20} className="icon" />
                    <p>Sobre</p>
                </div>

                <div className="navbar-item" onClick={() => irPara('beneficios')}>
                    <Star size={20} className="icon" />
                    <p>Benefícios</p>
                </div>

                <div className="navbar-item" onClick={() => irPara('comoFunciona')}>
                    <Book size={20} className="icon" />
                    <p>Como funciona</p>
                </div>

                <div className="navbar-item" onClick={irParaLogin}>
                    <User size={20} className="icon" />
                    <p>Login</p>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;