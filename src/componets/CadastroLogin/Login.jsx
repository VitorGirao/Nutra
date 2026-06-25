import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../services/api';
import './auth.css';

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    senha: '',
    erroMensagem: '',
    carregando: false,
    mostrarSenha: false,
  });

  const { email, senha, erroMensagem, carregando, mostrarSenha } = form;

  const atualizarCampo = (campo) => (evento) => {
    setForm((prev) => ({ ...prev, [campo]: evento.target.value }));
  };

  const alternarCampoBooleano = (campo) => {
    setForm((prev) => ({ ...prev, [campo]: !prev[campo] }));
  };

  const handleLogin = async (evento) => {
    evento.preventDefault();
    setForm((prev) => ({ ...prev, erroMensagem: '', carregando: true }));

    try {
      const resposta = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      const dadosResultado = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dadosResultado.message || 'E-mail ou senha incorretos.');
      }

      localStorage.setItem('usuarioLogado', JSON.stringify(dadosResultado));

      alert('Login efetuado com sucesso! Bem-vindo.');
      navigate('/feed');
    } catch (erro) {
      setForm((prev) => ({ ...prev, erroMensagem: erro.message || 'Não foi possível conectar ao servidor.' }));
    } finally {
      setForm((prev) => ({ ...prev, carregando: false }));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-brand-section"></div>

        <div className="auth-form-section login-section">
          <h1>Olá, Seja Bem Vindo!</h1>

          <form className="login-form auth-form" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="E-mail"
              className="auth-input"
              value={email}
              onChange={atualizarCampo('email')}
              required
            />

            <div className="auth-password-group">
              <input
                type={mostrarSenha ? 'text' : 'password'}
                placeholder="Senha"
                className={`auth-input ${erroMensagem ? 'error' : ''}`}
                value={senha}
                onChange={atualizarCampo('senha')}
                required
              />

              <span
                className="auth-eye-icon"
                onClick={() => alternarCampoBooleano('mostrarSenha')}
              >
                {mostrarSenha ? (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                )}
              </span>
            </div>

            <div className="form-helpers" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginTop: '2px' }}>
              {erroMensagem ? (
                <span className="auth-error" style={{ margin: 0 }}>{erroMensagem}</span>
              ) : (
                <span></span>
              )}

              <Link to="/esqueci-senha" className="forgot-password" style={{ color: '#666', textDecoration: 'none' }}>
                Esqueceu a senha?
              </Link>
            </div>

            <button type="submit" className="auth-main-button" disabled={carregando}>
              {carregando ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <p className="auth-link-text">
            Ainda não tem conta? <Link to="/">Criar</Link>
          </p>
          <p className="auth-link-text" style={{ marginTop: '8px' }}>
            É nutricionista? <Link to="/CadastroNutricionista">Criar conta profissional</Link>
          </p>
        </div>
      </div>
    </div>
  );
}