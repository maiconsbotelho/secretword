import { useState, useRef, useEffect } from 'react';
import './Game.css';

// Função para normalizar a letra
const normalizeLetter = (letter) => {
  return letter.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

// Componente do jogo
const Game = ({ verifyLetter, pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score }) => {
  const [letter, setLetter] = useState('');
  const letterInputRef = useRef(null);

  // Efeito para focar no campo de entrada ao carregar o componente
  useEffect(() => {
    letterInputRef.current.focus();
  }, []);

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    verifyLetter(letter);
    setLetter('');
    letterInputRef.current.focus();
  };

  return (
    <div className="Game">
      <p className="points">
        <span>Pontuação: {score}</span>
      </p>
      <h1>Adivinhe a palavra:</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>
      <p>Você ainda tem {guesses} tentativa(s).</p>
      <div className="wordContainer">
        {letters.map((letter, index) =>
          guessedLetters.includes(normalizeLetter(letter)) ? (
            <span key={index} className="letter">
              {letter}
            </span>
          ) : (
            <span key={index} className="blankSquare"></span>
          )
        )}
      </div>
      <div className="letterContainer">
        <p>Tente adivinhar uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            maxLength="1"
            required
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
            ref={letterInputRef}
          />
          <button>Jogar!</button>
        </form>
      </div>

      <div className="wrongLettersContainer">
        <p>Letras já utilizadas:</p>
        {wrongLetters.map((letter, index) => (
          <span key={index}>{letter}, </span>
        ))}
      </div>
    </div>
  );
};

export default Game;
