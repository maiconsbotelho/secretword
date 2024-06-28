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

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  
  // Zerando estados
  const [pickedWord, setPickedWord] = useState('');
  const [pickedCategory, setPickedCategory] = useState('');
  const [pickedLetter, setPickedLetter] = useState([]);

  const pickWordAndCategory = () => {
    // Pegar uma categoria aleatória
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * categories.length)];
    console.log(category);

    // Pegar uma palavra aleatória
    const word = words[category][Math.floor(Math.random() * words[category].length)];
    console.log(word);

    return { word, category };
  }


  // Start game
  const startGame = () => {
    // Pegar a palavra e a categoria
    const { word, category } = pickWordAndCategory();

    // Separar as letras da palavra
    let wordLetters = word.split('');
    // Transformar todas as letras em minúsculas
    wordLetters = wordLetters.map((letter) => letter.toLowerCase()); 

    console.log(word, category);
    console.log(wordLetters);

    // Atualizar os estados
    setPickedWord(word);
    setPickedCategory(category);
    setPickedLetter(wordLetters);

    setGameStage(stages[1].name);
  };

  // Game
  const verifyLetter = () => {
    setGameStage(stages[2].name);
  }

  // Resetar
  const retry = () => {
    setGameStage(stages[0].name);
  }




  return (
    <div className="App">
      {gameStage === 'Start' && <StartScreen startGame={startGame} />}
      {gameStage === 'Game' && <Game verifyLetter={verifyLetter} />}
      {gameStage === 'End' && <GameOver retry={retry} />}
    </div>
  );
}

export default App;
