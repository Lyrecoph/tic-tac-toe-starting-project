import {useState} from 'react';

import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';
import GameOver from './components/GameOver.jsx';
import { WINNING_COMBINATIONS } from './winning-combinations.js';

function deriveActivePlayer(gameTurns){
  // Nous dérivons le joueur actif pour la MAJ de l'état de ce tour en fonction du tour précédent
  let currentPlayer = 'X';

  // si le dernier tour est supérieur à zero et a été joué par le joueur si
  if(gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;

}

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];


function App() {
  const [players, setPlayers] = useState({
    X: 'Player1',
    O: 'Player2',
  });

  // Etat de tours de jeu est l'état dérivé
  const [gameTurns, setGameTurns] = useState([]);
  // Etat gère le joueur gagnant
  // Etat du joueur active
  // const [activePlayer, setActivePlayer] = useState('X');

  // Fonction dérivé qui permet de savoir le joueur active
  const activePlayer = deriveActivePlayer(gameTurns);

  //**Calculer la valeur du tableau de jeu en fonction de l'état gameTurns géré dans App */
  // Etat dérivé, une valeur calculée: deriving state from props
  let gameBoard = [...initialGameBoard.map(array => [...array])]; // est une valeur calculée qui est dérivé d'un état


  for (const turn of gameTurns ){
      const {square, player} = turn;
      const {row, col} = square;
      
      gameBoard[row][col] = player
  }

  let winner;

  // Déterminer si nous avons un gagnant ou non partir de nos gameTurns
  for (const combination of WINNING_COMBINATIONS){
    // obtenir le symbole dans la première case
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol && 
      firstSquareSymbol === secondSquareSymbol && 
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  // Mettre à jour l'etat du joueur active
  function handleSelectSquare(rowIndex, colIndex){
    // setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns(prevTurns=>{
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        {square: {row: rowIndex, col: colIndex}, player: currentPlayer}, 
        ...prevTurns
      ];

      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol] : newName
      };
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player 
            initialName="Player1" 
            symbol="X" 
            isActive={activePlayer === 'X'} 
            onChangeName={handlePlayerNameChange}
          />
          <Player 
            initialName="Player2" 
            symbol="O" 
            isActive={activePlayer === 'O'} 
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
