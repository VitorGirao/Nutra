import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importações das Páginas e Componentes Principais
import EscolhaPerfil from './componets/EscolherPerfil/EscolherPerfil';
import CadastroNutricionista from './componets/CadastroLogin/CadastroNutricionista';
import Login from './componets/CadastroLogin/Login'; // <-- Agora importamos o componente real da sua amiga!
import PesquisaNutricionistas from "./pages/PesquisaNutricionistas";
import PerfilNutricionistas from './componets/PerfilNutricionistas/PerfilNutricionistas';

function App() {
  return (
    /* Mantemos a div pai para segurar os fundos em 100% da tela sem quebras */
    <div style={{ width: '100vw', minHeight: '100vh', margin: 0, padding: 0, display: 'flex', flexDirection: 'column' }}>
      <BrowserRouter>
        <Routes>
          {/* 1. Página Inicial (Escolha de Perfil) */}
          <Route path="/" element={<EscolhaPerfil />} />

          {/* 2. Rota de Cadastro de Nutricionista (Singular) */}
          <Route path="/CadastroNutricionista" element={<CadastroNutricionista />} />

          {/* 3. Rota de Login Real (Que agora redireciona para a pesquisa) */}
          <Route path="/login" element={<Login />} />

          {/* 4. Rota da Tela de Pesquisa (Onde aparecem os cards) */}
          <Route path="/pesquisa" element={<PesquisaNutricionistas />} />

          {/* 5. Rota do Perfil Detalhado do Nutricionista */}
          <Route path="/PerfilNutricionistas" element={<PerfilNutricionistas />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;