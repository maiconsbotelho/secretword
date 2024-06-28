import './GameOver.css';

const GameOver = ({retry}) => {
  return (
    <div className="GameOver">
      <h1>GameOver</h1>
      <button onClick={retry}>Resetar Jogo</button>
    </div>
  );
}

export default GameOver;