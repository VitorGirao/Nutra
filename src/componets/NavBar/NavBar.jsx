import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, Users, User } from 'lucide-react';
import "./NavBar.css";

const NavBar = ({ textoVoltar = "nutricionistas" }) => {
    const navigate = useNavigate();

    const handleVoltar = () => {
        // Se não houver histórico, força ir para a tela de pesquisa
        if (window.history.length <= 1) {
            navigate('/PesquisaNutricionistas');
        } else {
            navigate(-1);
        }
    };

    return (
        <nav className="navbar">
            <div id="voltar" onClick={handleVoltar} style={{ cursor: 'pointer' }}>
                <ArrowLeft size={24} className="icon" />
                <p>{textoVoltar}</p>
            </div>
            
            <img src="" alt="Logo" />
            
            <div id="acoes">
                <div id="inicio">
                    <Home size={20} className="icon" />
                    <p>Início</p>
                </div>
                
                <div id="nutricionistas">
                    <Users size={20} className="icon" />
                    <p>nutricionistas</p>
                </div>
                
                <div id="perfil">
                    <User size={20} className="icon" />
                    <p>Perfil</p>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;