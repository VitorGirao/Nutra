import { ArrowLeft, Home, Users, User } from 'lucide-react';
import "./NavBar.css";

const NavBar = () => {
    return (
        <nav className="navbar">
            <div id="voltar">
                {/* Substituído por ArrowLeft */}
                <ArrowLeft size={24} className="icon" />
                <p>nutricionistas</p>
            </div>
            
            <img src="" alt="Logo" />
            
            <div id="acoes">
                <div id="inicio">
                    {/* Substituído por Home */}
                    <Home size={20} className="icon" />
                    <p>Início</p>
                </div>
                
                <div id="nutricionistas">
                    {/* Substituído por Users */}
                    <Users size={20} className="icon" />
                    <p>nutricionistas</p>
                </div>
                
                <div id="perfil">
                    {/* Substituído por User */}
                    <User size={20} className="icon" />
                    <p>Perfil</p>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;