import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../../services/api';
import './EsqueciSenha.css';

export default function EsqueciSenha() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erroMensagem, setErroMensagem] = useState('');
  const [sucessoMensagem, setSucessoMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [mostrarNovaSenha, setMostrarNovaSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  useEffect(() => {
    const emailInicial = location.state?.email || '';
    if (emailInicial) {
      setEmail(emailInicial);
    }
  }, [location.state]);

  const handleSubmit = async (evento) => {
    evento.preventDefault();
    setErroMensagem('');
    setSucessoMensagem('');
    setCarregando(true);

    try {
      const resposta = await fetch(`${API_BASE_URL}/recuperar-senha`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, novaSenha, confirmarSenha }),
      });

      const dadosResultado = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dadosResultado.message || 'Não foi possível atualizar a senha.');
      }

      setSucessoMensagem(dadosResultado.message || 'Senha atualizada com sucesso.');
      setEmail('');
      setNovaSenha('');
      setConfirmarSenha('');

      setTimeout(() => navigate('/login'), 1200);
    } catch (erro) {
      setErroMensagem(erro.message || 'Não foi possível conectar ao servidor.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-brand-section"></div>

        <div className="auth-form-section recuperar-section">
          <h1>Atualizar senha</h1>

          <p className="form-description">
            Informe seu e-mail e escolha uma nova senha.
          </p>

          <form className="recuperar-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="E-mail"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              readOnly={Boolean(location.state?.email)}
              disabled={Boolean(location.state?.email)}
            />

            <div className="auth-password-group">
              <input
                type={mostrarNovaSenha ? 'text' : 'password'}
                placeholder="Nova senha"
                className="auth-input"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                required
              />

              <span
                className="auth-eye-icon"
                onClick={() => setMostrarNovaSenha(!mostrarNovaSenha)}
              >
                {mostrarNovaSenha ? (
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

            <div className="auth-password-group">
              <input
                type={mostrarConfirmarSenha ? 'text' : 'password'}
                placeholder="Confirmar nova senha"
                className="auth-input"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                required
              />

              <span
                className="auth-eye-icon"
                onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
              >
                {mostrarConfirmarSenha ? (
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

            {erroMensagem ? <p className="auth-error">{erroMensagem}</p> : null}
            {sucessoMensagem ? <p className="auth-success">{sucessoMensagem}</p> : null}

            <div className="button-group">
              <Link to="/login" className="btn-cancelar">
                Cancelar
              </Link>

              <button type="submit" className="btn-enviar" disabled={carregando}>
                {carregando ? 'Atualizando...' : 'Atualizar senha'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}