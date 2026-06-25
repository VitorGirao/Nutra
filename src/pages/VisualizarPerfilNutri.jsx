import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../componets/NavBar/SideBar';
import { buildProfileViewModel, logoutUser } from '../services/profileService';
import "./visualizar-perfil.css";

export default function VisualizarPerfilNutri() {
  const navigate = useNavigate();
  const perfil = useMemo(() => buildProfileViewModel(), []);

  const handleLogout = () => {
    logoutUser(navigate);
  };

  return (
    <div className="layout-app">
      <SideBar />

      <main className="main-content">
        <header className="page-header">
          <h1>Meu Perfil</h1>
        </header>

        <div className="view-profile-container">
          
          {/* Coluna da Esquerda: Apenas Avatar */}
          <aside className="view-profile-sidebar">
            <div className="view-avatar-card">
              {perfil.fotoUrl ? (
                <img src={perfil.fotoUrl} alt="Foto de perfil" className="avatar-circle large avatar-img" />
              ) : (
                <div className="avatar-circle large">{perfil.nome ? perfil.nome.charAt(0) : 'N'}</div>
              )}
            </div>
          </aside>

          {/* Coluna da Direita: Dados e Botões */}
          <section className="view-profile-data">
            
            <div className="data-card">
              <h2><span className="material-symbols-outlined">person</span> Informações pessoais</h2>
              
              <div className="data-grid">
                <div className="data-item">
                  <span className="data-label">Nome</span>
                  <span className="data-value">{perfil.nome}</span>
                </div>
                <div className="data-item">
                  <span className="data-label">E-mail</span>
                  <span className="data-value">{perfil.email}</span>
                </div>
                <div className="data-item">
                  <span className="data-label">CRN</span>
                  <span className="data-value">{perfil.crn || 'Não informado'}</span>
                </div>
                <div className="data-item">
                  <span className="data-label">Especialidade</span>
                  <span className="data-value">{perfil.especialidade || 'Não informada'}</span>
                </div>
                <div className="data-item">
                  <span className="data-label">Telefone</span>
                  <span className="data-value">{perfil.telefone || 'Não informado'}</span>
                </div>
                <div className="data-item">
                  <span className="data-label">CEP</span>
                  <span className="data-value">{perfil.cep || 'Não informado'}</span>
                </div>
              </div>
            </div>

            <div className="data-card mt-4">
              <h2><span className="material-symbols-outlined">description</span> Sobre mim</h2>
              <div className="data-item">
                <span className="data-label">Biografia</span>
                <p className="data-value biography-text">{perfil.sobreMim}</p>
              </div>
            </div>

            {/* Nova Posição dos Botões de Ação */}
            <div className="action-buttons-bottom">
              <button 
                className="btn-view-logout" 
                onClick={handleLogout}
              >
                sair
              </button>
              
              <button 
                className="btn-view-edit" 
                onClick={() => navigate('/editar-perfil')}
              >
                <span className="material-symbols-outlined">edit</span>
                Editar perfil
              </button>
            </div>

          </section>

        </div>
      </main>
    </div>
  );
}