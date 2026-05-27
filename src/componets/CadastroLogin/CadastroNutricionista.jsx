import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './CadastroNutricionista.css';
import './auth.css';

function EyeIcon({ aberto }) {
  return aberto ? (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

export default function CadastroNutricionista() {
  const navigate = useNavigate();
  
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [crn, setCrn] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [genero, setGenero] = useState('');

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const [erroMensagem, setErroMensagem] = useState('');

  const handleCadastro = (evento) => {
    evento.preventDefault();
    setErroMensagem('');

    if (senha !== confirmarSenha) {
      setErroMensagem('As senhas não coincidem!');
      return;
    }

    alert('Cadastro de nutricionista criado com sucesso!');
    navigate('/login'); 
  };

  return (
    <div className="pagina-cadastro-wrapper" style={{ width: '100%', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-brand-section"></div>

          <div className="auth-form-section auth-form-section--compact cadastro-nutricionista-section">
            <h1>Crie sua conta</h1>

            <form className="auth-form auth-form--compact cadastro-nutricionista-form" onSubmit={handleCadastro}>
              <input type="text" placeholder="Nome" className="auth-input" value={nome} onChange={(e) => setNome(e.target.value)} required />
              
              <input type="email" placeholder="E-mail" className="auth-input" value={email} onChange={(e) => setEmail(e.target.value)} required />

              <div className="auth-password-group">
                <input type={mostrarSenha ? 'text' : 'password'} placeholder="Senha" className="auth-input" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                <span className="auth-eye-icon" onClick={() => setMostrarSenha(!mostrarSenha)}>
                  <EyeIcon aberto={mostrarSenha} />
                </span>
              </div>

              <div className="auth-password-group">
                <input type={mostrarConfirmarSenha ? 'text' : 'password'} placeholder="Confirmar senha" className="auth-input" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} required />
                <span className="auth-eye-icon" onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}>
                  <EyeIcon aberto={mostrarConfirmarSenha} />
                </span>
              </div>

              <input type="text" placeholder="CRN" className="auth-input" value={crn} onChange={(e) => setCrn(e.target.value)} required />
              
              <input type="text" placeholder="CEP" className="auth-input" value={cep} onChange={(e) => setCep(e.target.value)} />
              
              <input type="tel" placeholder="+55 (00) 00000-0000" className="auth-input" value={telefone} onChange={(e) => setTelefone(e.target.value)} />

              {/* CORRIGIDO: Tag select fechada e estruturada perfeitamente */}
              <select className="auth-input" value={genero} onChange={(e) => setGenero(e.target.value)} required>
                <option value="" disabled>Gênero</option>
                <option value="feminino">Feminino</option>
                <option value="masculino">Masculino</option>
                <option value="outro">Outro</option>
                <option value="nao-informar">Prefiro não informar</option>
              </select>

              {erroMensagem && <span className="auth-error">{erroMensagem}</span>}

              <button type="submit" className="auth-main-button">Criar conta</button>
            </form>

            <p className="auth-link-text">
              Já tem conta? <Link to="/">Voltar</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}