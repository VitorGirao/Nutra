import { Link } from 'react-router-dom';
import './EsqueciSenha.css';

export default function EsqueciSenha() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-brand-section"></div>

        <div className="auth-form-section recuperar-section">
          <h1>Esqueceu sua senha?</h1>

          <p className="form-description">
            Você receberá um código para mudar sua senha pelo email
          </p>

          <form className="recuperar-form">
            <input
              type="email"
              placeholder="E-mail"
              className="auth-input"
              required
            />

            <div className="button-group">
              <Link to="/" className="btn-cancelar">
                Cancelar
              </Link>

              <button type="submit" className="btn-enviar">
                Enviar código
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}