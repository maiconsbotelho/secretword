import { useRef, useEffect } from 'react';
import './GameOver.css';

// Tela de fim de jogo
const GameOver = ({ retry, score, scoreHistory }) => {
  const buttonRef = useRef(null); // Referência para o botão

  // Efeito para focar no botão ao carregar o componente
  useEffect(() => {
    buttonRef.current.focus();
  }, []);

  // Função para reiniciar o jogo ao clicar no botão
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      retry();
    }
  };

  return (
    <div className="GameOver">
      <h1>Fim de Jogo!</h1>
      <h2>
        A sua pontuação foi: <span>{score}</span>
      </h2>
      <button ref={buttonRef} onClick={retry} onKeyDown={handleKeyDown} tabIndex="0">
        Resetar Jogo
      </button>
      <h3>Histórico de Pontuações:</h3>
      <ul>
        {scoreHistory.map((score, index) => (
          <li key={index}>
            Jogo {index + 1}: {score} pontos
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameOver;
