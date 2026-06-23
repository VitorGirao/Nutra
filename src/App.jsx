import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import EscolhaPerfil from './componets/EscolherPerfil/EscolherPerfil';
import CadastroNutricionista from './componets/CadastroLogin/CadastroNutricionista';
import CadastroPaciente from './componets/CadastroLogin/CadastroPaciente';
import Login from './componets/CadastroLogin/Login';
import PesquisaNutricionistas from "./pages/PesquisaNutricionistas";
import PerfilNutricionistas from './componets/PerfilNutricionistas/PerfilNutricionistas';
import EditarPerfil from './pages/EditarPerfil';
import LandingPage from './pages/LandingPage';
import CriarPost from './pages/CriarPost/CriarPost';
import PostAberto from './pages/PostsAberto/PostAberto';
import CriarPostPage from './pages/CriarPostPage/CriarPostPage';
import PostAbertoPage from './pages/Postabertopage/Postabertopage';
import Feed from './pages/Feed';

function App() {
  return (
    <div style={{ width: '100vw', minHeight: '100vh', margin: 0, padding: 0, display: 'flex', flexDirection: 'column' }}>

      <style>{`
        body {
          margin: 0 !important;
          padding: 0 !important;
          box-sizing: border-box;
          font-size: 1rem;
        }
      `}</style>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/escolher-perfil" element={<EscolhaPerfil />} />
          <Route path="/CadastroNutricionista" element={<CadastroNutricionista />} />
          <Route path="/login" element={<Login />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/pesquisa" element={<PesquisaNutricionistas />} />
          <Route path="/PerfilNutricionistas" element={<PerfilNutricionistas />} />
          <Route path="/editar-perfil" element={<EditarPerfil />} />
          <Route path='/landing' element={<LandingPage />} />
          <Route path='/criar-post' element={<CriarPostPage />} />
          <Route path='/ver-post/:id' element={<PostAbertoPage />} />
          <Route path='/CadastroPaciente' element={<CadastroPaciente/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;