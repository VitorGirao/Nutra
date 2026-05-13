import React from 'react';
import './Buttons.css';

const Button = ({ label, onClick, variant = 'primary', size = 'medium' }) => {
  return (  
         <button 
      className={`btn-base ${variant} ${size}`}
      onClick={onClick}
    >
      {label}
    </button>
   
  );
};

export default Button;