import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SideBar.css';
import SideBarButton from '../Buttons/SideBarButton';

function HomeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function NutritionistIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function SavedIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  );
}

function SideBar() {
  const navigate = useNavigate();
  const location = useLocation(); // pega a rota atual
  const rota = location.pathname;  // ex: '/feed', '/pesquisa'

  return (
    <aside className="sidebar-container">
      <div className="sidebar-logo-area">
        <span className="sidebar-logo-placeholder">Nutra</span>
      </div>

      <nav className="sidebar-nav-links">
        <SideBarButton 
          Icon={HomeIcon} 
          label="Início" 
          active={rota === '/feed'}
          onClick={() => navigate('/feed')} 
        />
        <SideBarButton 
          Icon={NutritionistIcon} 
          label="Nutricionistas" 
          active={rota === '/pesquisa'}
          onClick={() => navigate('/pesquisa')} 
        />
        <SideBarButton 
          Icon={SavedIcon} 
          label="Salvos" 
          active={rota === '/salvos'}
          onClick={() => navigate('/salvos')} 
        />
      </nav>

      <div className="sidebar-footer">
        <button 
          className={`sidebar-profile-card ${rota === '/perfil' ? 'sidebar-profile-card--active' : ''}`}
          onClick={() => navigate('/perfil')}
        >
          <div className="sidebar-profile-info">
            <img 
              className="sidebar-avatar" 
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces" 
              alt="Foto de perfil" 
            />
            <div className="sidebar-user-text">
              <span className="sidebar-username">Maria Joana</span>
              <span className="sidebar-user-sub">Ver perfil &gt;</span>
            </div>
          </div>
          <span className="sidebar-more-icon">
            <MoreIcon />
          </span>
        </button>
      </div>
    </aside>
  );
}

export default SideBar;