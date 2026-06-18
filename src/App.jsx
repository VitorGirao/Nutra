import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importações das Páginas e Componentes Principais
import EscolhaPerfil from './componets/EscolherPerfil/EscolherPerfil';
import CadastroNutricionista from './componets/CadastroLogin/CadastroNutricionista';
import Login from './componets/CadastroLogin/Login'; 
import PesquisaNutricionistas from "./pages/PesquisaNutricionistas";
import PerfilNutricionistas from './componets/PerfilNutricionistas/PerfilNutricionistas';
import EditarPerfil from './pages/EditarPerfil';
import LandingPage from './pages/LandingPage';

// NOVA IMPORTAÇÃO: Importando a sua nova página de Feed
import Feed from './pages/Feed'; // Ajuste o caminho conforme onde salvou a pasta da página

function App() {
  return (
    /* O estilo inline abaixo reseta a largura e garante que o display flex alinhe a Sidebar */
    <div style={{ width: '100vw', minHeight: '100vh', margin: 0, padding: 0, display: 'flex', flexDirection: 'column' }}>
      
      {/* Injeção sutil para garantir que o body do navegador não crie margens em nenhuma rota */}
      <style>{`
        body {
          margin: 0 !important;
          padding: 0 !important;
          box-sizing: border-box;
          font-size: 1rem; /* Define a base de 16px para o REM funcionar perfeitamente */
        }
      `}</style>

      <BrowserRouter>
        <Routes>
          {/* 1. Página Inicial agora é a Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Tela de Escolha de Perfil, movida para sua própria rota */}
          <Route path="/escolher-perfil" element={<EscolhaPerfil />} />

          {/* 2. Rota de Cadastro de Nutricionista (Singular) */}
          <Route path="/CadastroNutricionista" element={<CadastroNutricionista />} />

          {/* 3. Rota de Login Real */}
          <Route path="/login" element={<Login />} />

          {/* NOVA ROTA: O Feed de publicações com os cards retangulares */}
          <Route path="/feed" element={<Feed />} />

          {/* 4. Rota da Tela de Pesquisa (Onde aparecem os cards de busca e a Sidebar) */}
          <Route path="/pesquisa" element={<PesquisaNutricionistas />} />

          {/* 5. Rota do Perfil Detalhado do Nutricionista */}
          <Route path="/PerfilNutricionistas" element={<PerfilNutricionistas />} />

          <Route path="/editar-perfil" element={<EditarPerfil />} />

          <Route path='/landing' element={<LandingPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;