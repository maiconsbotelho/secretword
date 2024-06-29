// CSS
import './App.css';

// React
import { useCallback, useEffect, useState } from 'react';

// Data
import { wordsList } from './data/words';

// Components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  { id: 1, name: 'Start' },
  { id: 2, name: 'Game' },
  { id: 3, name: 'End' },
];

const guessesQty = 6;

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  // Zerando estados
  const [pickedWord, setPickedWord] = useState(''); // Palavra escolhida
  const [pickedCategory, setPickedCategory] = useState(''); // Categoria da palavra
  const [letters, setLetters] = useState([]); // Letras da palavra

  // Estados para as letras
  const [guessedLetters, setGuessedLetters] = useState([]); // Letras corretas
  const [wrongLetters, setWrongLetters] = useState([]); // Letras erradas
  const [guesses, setGuesses] = useState(guessesQty); // Número de tentativas
  const [score, setScore] = useState(0); // Pontuação

  const pickWordAndCategory = () => {
    // Pegar uma categoria aleatória
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * categories.length)];
    console.log(category);

    // Pegar uma palavra aleatória
    const word = words[category][Math.floor(Math.random() * words[category].length)];
    console.log(word);

    return { word, category };
  };

  // Start game
  const startGame = () => {
    // Zerar os estados
    clearLettersStates();
    // Pegar a palavra e a categoria
    const { word, category } = pickWordAndCategory();

    // Separar as letras da palavra
    let wordLetters = word.split('');
    // Transformar todas as letras em minúsculas
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    console.log(word, category);
    console.log(wordLetters);

    // Atualizar os estados
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  };

  // Game
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();
    // Verificar se a letra já foi escolhida
    if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return;
    }

    // Verificar se a letra está na palavra
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [...actualGuessedLetters, normalizedLetter]);
    } else {
      setWrongLetters((actualWrongLetters) => [...actualWrongLetters, normalizedLetter]);
      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  const clearLettersStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  // Verificar se o jogo acabou
  useEffect(() => {
    if (guesses <= 0) {
      clearLettersStates();
      setGameStage(stages[2].name);
    }
  }, [guesses]);

  // verificar condições de vitoria
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    if (uniqueLetters.length === guessedLetters.length) {
      // Aumentar a pontuação
      setScore((actualScore) => (actualScore += 100));
      startGame(); // Iniciar um novo jogo automaticamente após acertar a palavra anterior
    }
  }, [guessedLetters, letters, startGame]);

  // Resetar
  const retry = () => {
    setScore(0);
    setGuesses(guessesQty);
    setGameStage(stages[0].name);
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
      {gameStage === 'End' && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
