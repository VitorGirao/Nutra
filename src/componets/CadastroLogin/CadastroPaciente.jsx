import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPaciente } from '../../services/api';
import './CadastroPaciente.css';

function EyeIcon({ aberto }) {
  return aberto ? (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

export default function CadastroPaciente() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    telefone: '',
    cep: '',
    genero: '',
    mostrarSenha: false,
    mostrarConfirmarSenha: false,
    erroMensagem: '',
  });

  const {
    nome,
    email,
    senha,
    confirmarSenha,
    telefone,
    cep,
    genero,
    mostrarSenha,
    mostrarConfirmarSenha,
    erroMensagem,
  } = form;

  const atualizarCampo = (campo) => (e) => {
    setForm((prev) => ({ ...prev, [campo]: e.target.value }));
  };

  const alternarCampoBooleano = (campo) => {
    setForm((prev) => ({ ...prev, [campo]: !prev[campo] }));
  };

  const handleTelefoneChange = (e) => {
    let valor = e.target.value.replace(/\D/g, '');
    if (valor.length > 11) valor = valor.slice(0, 11);

    if (valor.length > 6) {
      valor = `(${valor.slice(0, 2)}) ${valor.slice(2, 7)}-${valor.slice(7)}`;
    } else if (valor.length > 2) {
      valor = `(${valor.slice(0, 2)}) ${valor.slice(2)}`;
    } else if (valor.length > 0) {
      valor = `(${valor}`;
    }

    setForm((prev) => ({ ...prev, telefone: valor }));
  };

  const handleCepChange = (e) => {
    let valor = e.target.value.replace(/\D/g, '');
    if (valor.length > 8) valor = valor.slice(0, 8);

    if (valor.length > 5) {
      valor = `${valor.slice(0, 5)}-${valor.slice(5)}`;
    }

    setForm((prev) => ({ ...prev, cep: valor }));
  };

  const handleCadastro = async (evento) => {
    evento.preventDefault();
    setForm((prev) => ({ ...prev, erroMensagem: '' }));

    if (senha !== confirmarSenha) {
      setForm((prev) => ({ ...prev, erroMensagem: 'As senhas não coincidem!' }));
      return;
    }

    const telefoneLimpo = telefone.replace(/\D/g, '');
    if (telefoneLimpo && telefoneLimpo.length < 11) {
      setForm((prev) => ({ ...prev, erroMensagem: 'Por favor, insira um número de telefone celular válido com DDD.' }));
      return;
    }

    const cepLimpo = cep.replace(/\D/g, '');
    if (cepLimpo && cepLimpo.length < 8) {
      setForm((prev) => ({ ...prev, erroMensagem: 'Por favor, insira um CEP válido.' }));
      return;
    }

    try {
      await createPaciente({
        nome,
        email,
        senha,
        cep: cepLimpo,
        genero,
        telefone: telefoneLimpo,
      });

      alert('Conta criada com sucesso!');
      navigate('/login');
    } catch (erro) {
      setForm((prev) => ({ ...prev, erroMensagem: erro.message || 'Não foi possível criar a conta.' }));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-brand-section"></div>

        <div className="auth-form-section auth-form-section--compact cadastro-paciente-section">
          <h1>Crie sua conta</h1>

          <form className="auth-form auth-form--compact cadastro-paciente-form" onSubmit={handleCadastro}>
            <input
              type="text"
              placeholder="Nome"
              className="auth-input"
              value={nome}
              onChange={atualizarCampo('nome')}
              required
            />

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
                className="auth-input"
                value={senha}
                onChange={atualizarCampo('senha')}
                required
              />

              <span
                className="auth-eye-icon"
                onClick={() => alternarCampoBooleano('mostrarSenha')}
              >
                <EyeIcon aberto={mostrarSenha} />
              </span>
            </div>

            <div className="auth-password-group">
              <input
                type={mostrarConfirmarSenha ? 'text' : 'password'}
                placeholder="Confirmar senha"
                className="auth-input"
                value={confirmarSenha}
                onChange={atualizarCampo('confirmarSenha')}
                required
              />

              <span
                className="auth-eye-icon"
                onClick={() => alternarCampoBooleano('mostrarConfirmarSenha')}
              >
                <EyeIcon aberto={mostrarConfirmarSenha} />
              </span>
            </div>

            <input
              type="tel"
              placeholder="(00) 90000-0000"
              className="auth-input"
              value={telefone}
              onChange={handleTelefoneChange}
              maxLength={15}
            />

            <input
              type="text"
              placeholder="CEP"
              className="auth-input"
              value={cep}
              onChange={handleCepChange}
              maxLength={9}
            />

            <select
              className="auth-input"
              value={genero}
              onChange={atualizarCampo('genero')}
              required
            >
              <option value="" disabled>
                Gênero
              </option>
              <option value="feminino">Feminino</option>
              <option value="masculino">Masculino</option>
              <option value="outro">Outro</option>
              <option value="nao-informar">Prefiro não informar</option>
            </select>

            {erroMensagem && (
              <span className="auth-error">{erroMensagem}</span>
            )}

            <button type="submit" className="auth-main-button">
              Criar conta
            </button>
          </form>

          <p className="auth-link-text">
            Já tem conta? <Link to="/">Entrar</Link>
          </p>
        </div>
      </div>
    </div>
  );
}