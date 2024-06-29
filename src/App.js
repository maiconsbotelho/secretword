import './App.css';
import { useCallback, useEffect, useState } from 'react';
import { wordsList } from './data/words';
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

// Estágios do jogo
const stages = [
  { id: 1, name: 'Start' },
  { id: 2, name: 'Game' },
  { id: 3, name: 'End' },
];

// Quantidade de tentativas
const guessesQty = 6;

// Função para normalizar as letras (remover acentos)
const normalizeLetter = (letter) => {
  return letter.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

// Função principal
function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  // Estados para a palavra
  const [pickedWord, setPickedWord] = useState(''); // Palavra escolhida
  const [pickedCategory, setPickedCategory] = useState(''); // Categoria da palavra
  const [letters, setLetters] = useState([]); // Letras da palavra

  // Estados para as letras
  const [guessedLetters, setGuessedLetters] = useState([]); // Letras corretas
  const [wrongLetters, setWrongLetters] = useState([]); // Letras erradas
  const [guesses, setGuesses] = useState(guessesQty); // Número de tentativas

  // Estados para a pontuação
  const [score, setScore] = useState(0); // Pontuação
  const [scoreHistory, setScoreHistory] = useState([]); // Histórico de pontuações

  // Adicionar a pontuação ao histórico
  const addScoreToHistory = useCallback(() => {
    setScoreHistory((prevScoreHistory) => [...prevScoreHistory, score]);
  }, [score]);

  // Escolher uma palavra e uma categoria aleatória
  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words); // Pegar as categorias
    const category = categories[Math.floor(Math.random() * categories.length)]; // Escolher uma categoria aleatória
    const word = words[category][Math.floor(Math.random() * words[category].length)]; // Escolher uma palavra aleatória

    return { word, category };
  }, [words]);

  // Iniciar o jogo
  const startGame = useCallback(() => {
    clearLettersStates(); // Limpar os estados das letras
    const { word, category } = pickWordAndCategory(); // Escolher uma palavra e uma categoria aleatória
    let wordLetters = word.split(''); // Separar as letras da palavra
    wordLetters = wordLetters.map((l) => l.toLowerCase()); // Normalizar as letras

    // Atualizar os estados
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);
    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  // Verificar a letra
  const verifyLetter = (letter) => {
    const normalizedLetter = normalizeLetter(letter.toLowerCase()); // Normalizar a letra

    // Verificar se a letra já foi escolhida
    if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return;
    }
    // Verificar se a letra está correta ou errada
    if (letters.map(normalizeLetter).includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [...actualGuessedLetters, normalizedLetter]);
    } else {
      setWrongLetters((actualWrongLetters) => [...actualWrongLetters, normalizedLetter]);
      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  // Limpar os estados das letras
  const clearLettersStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  // Verificar condições de derrota
  useEffect(() => {
    if (guesses <= 0) {
      addScoreToHistory(); // Adicionar a pontuação ao histórico
      clearLettersStates(); // Limpar os estados das letras
      setGameStage(stages[2].name); // Mudar o estágio do jogo
    }
  }, [guesses, score, addScoreToHistory]);

  // Verificar condições de vitória
  useEffect(() => {
    const uniqueLetters = [...new Set(letters.map(normalizeLetter))]; // Pegar as letras únicas da palavra

    // Verificar se todas as letras únicas da palavra foram adivinhadas
    if (uniqueLetters.length === guessedLetters.length) {
      // Verificar se o jogo está no estágio correto
      if (gameStage === stages[1].name) {
        setScore((prevScore) => prevScore + 100); // Adicionar 100 pontos à pontuação
        startGame(); // Iniciar um novo jogo
      }
    }
  }, [guessedLetters, letters, startGame, gameStage]);

  // Reiniciar o jogo
  const retry = () => {
    setScore(0); // Zerar a pontuação
    setGuesses(guessesQty); // Reiniciar as tentativas
    setGameStage(stages[0].name); // Mudar o estágio do jogo
  };

  return (
    <div className="App">
      {gameStage === 'Start' && <StartScreen startGame={startGame} />}
      {gameStage === 'Game' && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === 'End' && <GameOver retry={retry} score={score} scoreHistory={scoreHistory} />}
    </div>
  );
}

export default App;
