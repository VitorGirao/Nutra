import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../componets/NavBar/SideBar';
import ProfileHeader from '../componets/ProfileHeader/ProfileHeader';
import ProfileForm from '../componets/ProfileForm/ProfileForm';
import { createProfileFormData, logoutUser } from '../services/profileService';
import { updateProfile } from '../services/api';
import './editar-perfil.css';

export default function EditarPerfil() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    crn: '',
    especialidade: '',
    cidade: '',
    telefone: '',
    genero: '',
    sobreMim: '',
    isNutricionista: false,
  });

  useEffect(() => {
    setFormData(createProfileFormData());
  }, []);

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

  const handleCancel = () => {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado') || '{}');
    const tipoUsuario = String(usuarioLogado.tipo_usuario || 'Nutricionista').toLowerCase();
    navigate(tipoUsuario === 'paciente' ? '/visualizar-perfil-paciente' : '/visualizar-perfil-nutri');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado') || '{}');
    const confirmed = window.confirm('Deseja realmente salvar estas alterações no perfil?');

    if (!confirmed) {
      return;
    }

    try {
      const payload = {
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        cep: formData.cidade,
        genero: formData.genero,
        crn: formData.crn,
        especialidade: formData.especialidade,
        sobreMim: formData.sobreMim,
      };

      const resultado = await updateProfile(usuarioLogado.tipo_usuario || 'Nutricionista', usuarioLogado.id, payload);
      const atualizado = {
        ...usuarioLogado,
        ...resultado,
        tipo_usuario: usuarioLogado.tipo_usuario || 'Nutricionista',
      };

      localStorage.setItem('usuarioLogado', JSON.stringify(atualizado));
      window.alert('Perfil atualizado com sucesso!');

      const tipoUsuario = String(usuarioLogado.tipo_usuario || 'Nutricionista').toLowerCase();
      navigate(tipoUsuario === 'paciente' ? '/visualizar-perfil-paciente' : '/visualizar-perfil-nutri');
    } catch (error) {
      window.alert(error.message || 'Não foi possível atualizar o perfil.');
    }
  };

  const handleLogout = () => {
    logoutUser(navigate);
  };

  return (
    <div className="layout-pagina-wrapper">
      <SideBar />
      <main className="pesquisa-conteudo-principal">
        <div className="editar-perfil-conteudo">
          <div className="page-header-row">
            <div>
              <h1 className="page-title">Editar Perfil</h1>
              <p className="page-subtitle">Atualize suas informações pessoais e profissionais</p>
            </div>
            <button type="button" className="btn-logout" onClick={handleLogout}>Sair</button>
          </div>
          <div className="profile-layout">

            {/* Card da foto com classe específica */}
            <div className="photo-card">
              <ProfileHeader nome={formData.nome} photoUrl={formData.photoUrl} canEditPhoto={formData.isNutricionista} />
            </div>

            {/* Formulário ocupa o resto */}
            <ProfileForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} handleCancel={handleCancel} />

          </div>
        </div>
      </main>
    </div>
  );
}