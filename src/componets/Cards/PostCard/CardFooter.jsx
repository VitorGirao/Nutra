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

function TrashIcon() {
  return (
    <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );
}

function CardFooter({ isSalvo, canManagePost = false, canDeletePost = false, canSavePost = false, onSalvar, onLerMais, onExcluir }) {
  return (
    <footer className="card-footer-comp">
      {canSavePost && (
        <button className="card-footer-comp__save-btn" onClick={onSalvar}>
          <BookmarkIcon isSalvo={isSalvo} />
        </button>
      )}

      <div className="card-footer-comp__actions">
        {canManagePost && canDeletePost && (
          <Button
            label="Excluir"
            variant="outline"
            size="small"
            onClick={onExcluir}
            icon={<TrashIcon />}
          />
        )}

        <Button 
          label="Ler mais"
          variant="primary" 
          size="small"
          onClick={onLerMais}
          icon={<ArrowRightIcon />}
        />
      </div>
    </footer>
  );
}

export default CardFooter;
