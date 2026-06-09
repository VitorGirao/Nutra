// NutritionistCard.jsx
import { useNavigate } from 'react-router-dom'; // 1. Importa o hook de navegação
import { ProfessionalRow } from './ProfessionalRow';
import Button from '../../Buttons/Buttons'; // Seu botão customizado

const nutritionistsData = [
  { id: 1, name: 'Nayara Loranne', role: 'Nutricionista', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop' },
  { id: 2, name: 'Rafael Oliveira', role: 'Nutricionista', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop' },
  { id: 3, name: 'Juliana Mendes', role: 'Nutricionista', image: 'https://images.unsplash.com/photo-1582750433449-64c024716c17?w=150&h=150&fit=crop' },
];

export function NutritionistCard() {
  const navigate = useNavigate(); // 2. Inicializa o navegador do React Router

  return (
    <div className="nutritionist-card">
      
      <div className="card-header">
        <h3 className="card-title">Nutricionistas para seguir</h3>
        <p className="card-subtitle">Conecte-se com outros profissionais</p>
      </div>

      <div className="card-list">
        {nutritionistsData.map((nutri) => (
          <ProfessionalRow 
            key={nutri.id}
            name={nutri.name}
            role={nutri.role}
            imageSrc={nutri.image}
          />
        ))}
      </div>

      <hr className="card-divider" />

      <div className="card-footer">
        <Button 
          variant="ghost" 
          size="medium"
          // 3. Redireciona o usuário para a rota "/pesquisa" ao clicar
          onClick={() => navigate('/pesquisa')} 
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