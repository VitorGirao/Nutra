import { useEffect, useState } from 'react';

/**
 * Componente ProfileHeader:
 * Responsável por exibir a imagem de perfil ou a inicial do usuário
 * e permitir definir uma URL de imagem para a foto de perfil.
 */
export default function ProfileHeader({ nome, photoUrl, canEditPhoto = true, onPhotoUrlChange }) {
    const [fotoUrl, setFotoUrl] = useState(photoUrl || null);

    useEffect(() => {
        setFotoUrl(photoUrl || null);
    }, [photoUrl]);

    const handleFotoChange = (e) => {
        const value = e.target.value;
        setFotoUrl(value || null);
        onPhotoUrlChange?.(value);
    };

    return (
        <div className="profile-header">
            <div className="avatar-circle">
                {fotoUrl ? (
                    <img src={fotoUrl} alt="Foto de perfil" className="avatar-img" />
                ) : (
                    <span className="avatar-initials">{nome ? nome.charAt(0) : 'U'}</span>
                )}
            </div>

            {canEditPhoto && (
                <>
                    <input
                        type="text"
                        value={fotoUrl || ''}
                        onChange={handleFotoChange}
                        placeholder="Cole aqui o link da imagem"
                        className="auth-input"
                        style={{ width: '100%', marginTop: '12px' }}
                    />

                    <span className="photo-formats-text">
                        Informe um link direto para a imagem.
                    </span>
                </>
            )}
        </div>
    );
}