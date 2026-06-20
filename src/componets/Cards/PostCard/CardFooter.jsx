import React from 'react';
import './CardFooter.css';
import Button from '../../Buttons/Buttons'; 

function BookmarkIcon({ isSalvo }) {
  return (
    <svg 
      width="1.375rem" 
      height="1.375rem" 
      viewBox="0 0 24 24" 
      fill={isSalvo ? "currentColor" : "none"} 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function CardFooter({ isSalvo, onSalvar, onLerMais }) {
  return (
    <footer className="card-footer-comp">
      <button className="card-footer-comp__save-btn" onClick={onSalvar}>
        <BookmarkIcon isSalvo={isSalvo} />
      </button>

      <Button 
        label="Ler mais"
        variant="primary" 
        size="small"
        onClick={onLerMais}
        icon={<ArrowRightIcon />}
      />
    </footer>
  );
}

export default CardFooter;