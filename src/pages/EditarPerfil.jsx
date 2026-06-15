import { useState } from 'react';
import SideBar from '../componets/NavBar/SideBar';
import ProfileHeader from '../componets/ProfileHeader/ProfileHeader';
import ProfileForm from '../componets/ProfileForm/ProfileForm';
import './editar-perfil.css';

export default function EditarPerfil() {
  const [formData, setFormData] = useState({
    nome: 'Andressa',
    sobrenome: 'Souza',
    email: 'andressa.souza@gmail.com',
    crn: 'CRN-5/12345',
    cidade: 'Quixadá',
    telefone: '(85) 9 9999-9999',
    sobreMim: 'Olá, sou a Andressa...'
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === 'telefone') {
      value = value.replace(/\D/g, '');
      if (value.length > 11) value = value.slice(0, 11);
      if (value.length > 6) {
        value = value.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
      } else if (value.length > 2) {
        value = value.replace(/(\d{2})(\d{0,9})/, '($1) $2');
      }
    }
    if (name === 'crn') {
      value = value.toUpperCase();
      value = value.replace(/[^CRNTP S0-9\/-]/g, '');
    }
    if (name === 'sobreMim') {
      if (value.length > 300) value = value.slice(0, 300);
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Alterações salvas com sucesso!');
  };

  return (
    <div className="layout-pagina-wrapper">
      <SideBar />
      <main className="pesquisa-conteudo-principal">
        <div className="editar-perfil-conteudo">
          <h1 className="page-title">Editar Perfil</h1>
          <p className="page-subtitle">Atualize suas informações pessoais e profissionais</p>
          <div className="profile-layout">

            {/* Card da foto com classe específica */}
            <div className="photo-card">
              <ProfileHeader nome={formData.nome} />
            </div>

            {/* Formulário ocupa o resto */}
            <ProfileForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />

          </div>
        </div>
      </main>
    </div>
  );
}