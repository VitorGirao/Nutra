import React from 'react';
// Ajustado: tirei um ponto (de ../ para ./) e usei o nome 'componets' que está na sua foto
import Button from './componets/Buttons/Buttons'; 

function App() {
  const handleClick = () => {
    alert("Botão funcionando!");
  };

  return (
    <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center' }}>
      <Button 
        label="Entrar" 
        size="medium" 
        variant="secondary" 
        onClick={handleClick} 
      />
    </div>
  );
}

export default App;