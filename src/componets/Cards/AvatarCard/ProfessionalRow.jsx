import React from 'react';
import Button from '../../Buttons/Buttons';
import './NutriCardAvatar.css';

// Criando o componente Avatar aqui em cima para o React saber o que ele significa
function Avatar({ src, alt, className }) {
    return <img src={src} alt={alt} className={className} />;
}

export function ProfessionalRow({ name, role, imageSrc }) {
    const [following, setFollowing] = React.useState(false);

    return (
        <div className="professional-row">
            <div className="professional-info">
                <Avatar className="prof-avatar-card" src={imageSrc} alt={name} />

                <div className="text-group">
                    <span className="professional-name">{name}</span>
                    <span className="professional-role">{role}</span>
                </div>
            </div>

            <Button
                variant="secondary"
                size="small"
                label={"Ver Perfil"}
                onClick={() => setFollowing(!following)}
            />
        </div>
    );
}