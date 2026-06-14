// NutritionistCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Para o botão "Ver todos"
import { ProfessionalRow } from './ProfessionalRow'; // Importa a linha de cada profissional
import Button from '../../Buttons/Buttons'; // Seu botão customizado

// Função para tratar fotos hospedadas no GitHub (vinda da sua tela de pesquisa)
const converterUrlGithub = (url) => {
  if (!url) return "";
  return url
    .replace("https://github.com/", "https://raw.githubusercontent.com/")
    .replace("/blob/", "/");
};

// Recebe a lista sorteada e o estado de loading vindos do Feed.js
export function NutritionistCard({ nutricionistas, loading }) {
  const navigate = useNavigate(); 

  return (
    <div className="nutritionist-card">
      
      {/* Cabeçalho fixo do Card */}
      <div className="card-header">
        <h3 className="card-title">Nutricionistas para seguir</h3>
        <p className="card-subtitle">Conecte-se com outros profissionais</p>
      </div>

      {/* Lista que renderiza as linhas dos profissionais */}
      <div className="card-list">
        {loading ? (
          <p style={{ padding: '16px', fontSize: '14px', color: '#666' }}>Carregando profissionais...</p>
        ) : (
          // Mapeia os 3 nutricionistas vindos do Firebase
          nutricionistas.map((nutri) => (
            <ProfessionalRow 
              key={nutri.id}
              nutricionista={nutri} // 🌟 Passando o objeto completo para o ProfessionalRow conseguir enviar via state
              name={nutri.nome}
              role={nutri.especialidade || 'Nutricionista'}
              imageSrc={converterUrlGithub(nutri.foto_do_nutricionista)}
            />
          ))
        )}
      </div>

      <hr className="card-divider" />

      {/* Rodapé fixo com o botão de Ver Todos */}
      <div className="card-footer">
        <Button 
          variant="ghost" 
          size="medium"
          onClick={() => navigate('/pesquisa')} // Redireciona para a tela de busca principal
          label={
            <div className="footer-label-content">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              Ver todos
            </div>
          }
          icon={<span>➔</span>}
        />
      </div>

    </div>
  );
}

// Exportação padrão correta para este arquivo
export default NutritionistCard;