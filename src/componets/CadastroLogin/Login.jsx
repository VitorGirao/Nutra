import { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erroMensagem, setErroMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleLogin = async (evento) => {
    evento.preventDefault();
    setErroMensagem('');
    setCarregando(true);

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (email === 'andressa@gmail.com' && senha === '123456') {
            resolve('Login efetuado!');
          } else {
            reject('Senha incorreta!');
          }
        }, 1500);
      });

      alert('Login efetuado com sucesso! Bem-vindo.');
    } catch (erro) {
      setErroMensagem(erro);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-brand-section"></div>

        <div className="auth-form-section login-section">
          <h1>Olá, Seja Bem Vindo!</h1>

          <form className="login-form" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="E-mail"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="auth-password-group">
              <input
                type={mostrarSenha ? 'text' : 'password'}
                placeholder="Senha"
                className={`auth-input ${erroMensagem ? 'error' : ''}`}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />

              <span
                className="auth-eye-icon"
                onClick={() => setMostrarSenha(!mostrarSenha)}
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

            <div className="form-helpers">
              {erroMensagem ? (
                <span className="error-text">{erroMensagem}</span>
              ) : (
                <span></span>
              )}

              <Link to="/esqueci-senha" className="forgot-password">
                Esqueceu a senha?
              </Link>
            </div>

            <button type="submit" className="auth-main-button" disabled={carregando}>
              {carregando ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <p className="auth-link-text">
            Ainda não tem conta? <Link to="/cadastro-paciente">Criar</Link>
          </p>
          <p className="auth-link-text">
            É nutricionista? <Link to="/cadastro-nutricionista">Criar conta profissional</Link>
          </p>
        </div>
      </div>
    </div>
  );
}