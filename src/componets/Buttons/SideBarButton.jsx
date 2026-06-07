import React from 'react';
import './SideBarButton.css'; // Aponta para o arquivo com B maiúsculo

function SideBarButton({ Icon, label, active, onClick }) {
  return (
    <button 
      className={`sidebar-btn ${active ? 'sidebar-btn--active' : ''}`} 
      onClick={onClick}
    >
      <div className="sidebar-btn__content">
        <span className="sidebar-btn__icon">
          <Icon />
        </span>
        <span className="sidebar-btn__label">
          {label}
        </span>
      </div>
    </button>
  );
}

export default SideBarButton;