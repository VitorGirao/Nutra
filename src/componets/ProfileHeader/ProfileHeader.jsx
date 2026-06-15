import { useState, useRef } from 'react';

/**
 * Componente ProfileHeader:
 * Responsável por exibir a imagem de perfil ou a inicial do usuário
 * e gerenciar a funcionalidade de upload de nova foto.
 * * @param {string} nome - Nome do usuário para exibição da inicial (fallback).
*/
export default function ProfileHeader({ nome }) {
    // Estado para armazenar temporariamente a URL da foto selecionada para preview
    const [fotoUrl, setFotoUrl] = useState(null);

    // Referência (useRef) para acessar diretamente o elemento input de arquivo,
    // permitindo disparar o clique via botão estilizado.
    const fileInputRef = useRef(null);

    // Manipulador que processa o arquivo escolhido pelo usuário
    const handleFotoChange = (e) => {
        const arquivo = e.target.files[0];
        if (arquivo) {
            // Gera uma URL temporária em memória para renderizar a imagem sem enviar ao servidor
            const urlGerada = URL.createObjectURL(arquivo);
            setFotoUrl(urlGerada);
        }
    };

    // Função que aciona o clique programático no input invisível
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="profile-header">
            {/* Exibição do Avatar: Se houver foto, mostra a <img>, senão, a inicial */}
            <div className="avatar-circle">
                {fotoUrl ? (
                    <img src={fotoUrl} alt="Foto de perfil" className="avatar-img" />
                ) : (
                    <span className="avatar-initials">{nome ? nome.charAt(0) : 'U'}</span>
                )}
            </div>

            {/* Input de arquivo (tipo file) escondido via CSS.
                Utilizamos o fileInputRef para disparar o comportamento padrão de seleção 
                de arquivos a partir do botão visível.
            */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFotoChange}
                accept="image/png, image/jpeg, image/jpg"
                style={{ display: 'none' }}
            />

            {/* Botão customizado que ativa o seletor de arquivos */}
            <button type="button" className="btn-upload-photo" onClick={handleButtonClick}>
                Alterar foto
            </button>

            {/* Texto auxiliar de especificações técnicas */}
            <span className="photo-formats-text">
                JPG, PNG ou WebP. Máx. 2MB.
            </span>
        </div>
    );
}