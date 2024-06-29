import './GameOver.css';

const GameOver = ({ retry, score, scoreHistory }) => {
  return (
    <div className="GameOver">
      <h1>Fim de Jogo!</h1>
      <h2>
        A sua pontuação foi: <span>{score}</span>
      </h2>
      <button onClick={retry}>Resetar Jogo</button>
      <h3>Histórico de Pontuações:</h3>
      <ul>
        {scoreHistory.map((score, index) => (
          <li key={index}>Jogo {index + 1}: {score} pontos</li>
        ))}
      </ul>
    </div>
  );
};

export default GameOver;
