/**
 * Componente ProfileForm:
 * Responsável pela renderização e captura de dados dos formulários de perfil.
 * * Props recebidas:
 * - formData: Objeto com os estados atuais do perfil (nome, email, etc).
 * - handleChange: Função callback para atualizar o estado conforme digitação.
 * - handleSubmit: Função callback para processar o salvamento.
 */
export default function ProfileForm({ formData, handleChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="profile-form-wrapper">

      {/* Card: Informações Pessoais */}
      <div className="card-box">
        <h3 className="card-title">
          <span className="material-symbols-outlined title-icon">person</span>
          Informações Pessoais
        </h3>

        <div className="form-grid">
          {/* Agrupador de input genérico */}
          <div className="input-group">
            <label>Nome</label>
            <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Sobrenome</label>
            <input type="text" name="sobrenome" value={formData.sobrenome} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>E-mail</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          {/* Campo CRN - type="text" */}
          <div className="input-group">
            <label>CRN</label>
            <input
              type="text"
              name="crn"
              placeholder="Ex: CRN-5/12345 ou CRN-5/T-1234/P"
              value={formData.crn}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label>Cidade</label>
            <input type="text" name="cidade" value={formData.cidade} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Telefone</label>
            <input
              type="text"
              name="telefone"
              placeholder="(00) 0 0000-0000"
              value={formData.telefone}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* Card: Biografia */}
      <div className="card-box">
        <h3 className="card-title">
          <span className="material-symbols-outlined title-icon">description</span>
          Biografia
        </h3>

        <div className="input-group">
          <label>Sobre mim</label>
          <textarea
            name="sobreMim"
            value={formData.sobreMim}
            onChange={handleChange}
            rows="5"
            maxLength={300} // Limite nativo do HTML como reforço
          />
          {/* Contador de caracteres */}
          <small className="char-counter">
            {formData.sobreMim.length} / 300 caracteres
          </small>
        </div>
      </div>

      <div className="action-buttons">
        <button type="button" className="btn-cancel">Cancelar</button>
        <button type="submit" className="btn-save">Salvar Alterações</button>
      </div>
    </form>
  );
}