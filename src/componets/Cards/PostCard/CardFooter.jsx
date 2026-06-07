import React from 'react';
import './CardFooter.css';

// IMPORTAÇÃO DO SEU BOTÃO: Caminho ajustado saindo de PostCard/CardFooter para entrar em Buttons
import Button from '../../Buttons/Buttons'; 

// Mantemos o ícone de salvar nativo do card
function BookmarkIcon() {
  return (
    <svg width="1.375rem" height="1.375rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

// Ícone de seta para a direita que passamos para a prop 'icon' do seu botão
function ArrowRightIcon() {
  return (
    <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function CardFooter({ onSalvar, onLerMais }) {
  return (
    <footer className="card-footer-comp">
      {/* Botão de Salvar (Marcador) */}
      <button className="card-footer-comp__save-btn" onClick={onSalvar}>
        <BookmarkIcon />
      </button>

      {/* REESCRITO: Agora usando o SEU componente <Button /> original */}
      <Button 
        label="Ler mais"
        variant="primary" /* Usa a sua variante padrão (ou a verde se tiver) */
        size="small"
        onClick={onLerMais}
        icon={<ArrowRightIcon />}
      />
    </footer>
  );
}

export default CardFooter;