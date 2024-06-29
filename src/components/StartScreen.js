import { useRef, useEffect } from 'react';
import './StartScreen.css';

// Tela de início
const StartScreen = ({ startGame }) => {
  const buttonRef = useRef(null); // Referência para o botão

  // Efeito para focar no botão ao carregar o componente
  useEffect(() => {
    buttonRef.current.focus();
  }, []);

  // Função para iniciar o jogo ao clicar no botão
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      startGame();
    }
  };

  return (
    <div className="start">
      <h1>Bem-vindo ao Secret Word</h1>
      <p>Clique no botão abaixo para começar a jogar</p>
      <button ref={buttonRef} onClick={startGame} onKeyDown={handleKeyDown} tabIndex="0">
        Começar o jogo
      </button>
    </div>
  );
};

export default StartScreen;
