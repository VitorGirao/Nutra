// ProfessionalRow.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import Button from '../../Buttons/Buttons';
import './NutriCardAvatar.css';

// Componente Avatar mantido no topo como no seu original
function Avatar({ src, alt, className }) {
    return <img src={src} alt={alt} className={className} />;
}

export function ProfessionalRow({ nutricionista, name, role, imageSrc }) {
    const navigate = useNavigate();

    return (
        <div className="professional-row">
            <div className="professional-info">
                <Avatar className="prof-avatar-card" src={imageSrc} alt={name} />

                <div className="text-group">
                    <span className="professional-name truncate">{name}</span>
                    <span className="professional-role">{role}</span>
                </div>
            </div>

            <Button
                variant="secondary"
                size="small"
                label={"Ver Perfil"}
                onClick={() =>
                    navigate(`/PerfilNutricionistas?id=${nutricionista?.id || ""}`, {
                        state: { nutricionista },
                    })
                }
            />
        </div>
    );
}

export default ProfessionalRow;