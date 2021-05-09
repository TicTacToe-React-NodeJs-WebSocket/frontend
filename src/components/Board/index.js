/* eslint-disable no-unused-expressions */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector, useDispatch, useEffect } from 'react-redux';
import './Board.scss';

import Square from '../Square';

const players = [
  {
    name: 'Talita Pastorini',
    symbol: 'X',
  },
  {
    name: 'Larissa Maciel',
    symbol: 'O',
  },
];
export default function Board() {
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    squares: Array(9).fill(null),
    currentPlayerX: true,
    winner: null,
    running: true,
    winsX: 0,
    winsO: 0,
    totalMatches: 0,
  });

  const handleClick = (i) => {
    const squares = state.squares.slice();
    if (squares[i] === null) {
      squares[i] = state.currentPlayerX ? 'X' : 'O';
      setState({ ...state, squares, currentPlayerX: !state.currentPlayerX });
    }
  };

  const resetGame = () => {
    const squares = state.squares.slice();
    if (state.winner || !state.running) {
      squares.fill(null);
      setState({
        ...state,
        squares,
        currentPlayerX: true,
        winner: null,
        running: true,
      });
    }
  };

  const resetScoreBoard = () => {
    const squares = state.squares.slice();
    if (state.winner || !state.running) {
      squares.fill(null);
      setState({
        ...state,
        squares,
        currentPlayerX: true,
        winner: null,
        running: true,
        winsO: 0,
        winsX: 0,
        totalMatches: 0,
      });
    }
  };

  React.useEffect(() => {
    const checkWinner = (squares) => {
      const combinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      combinations.forEach((combination) => {
        const [a, b, c] = combination;
        if (
          squares[a] &&
          squares[a] === squares[b] &&
          squares[a] === squares[c]
        ) {
          let { winsX, winsO, totalMatches } = state;
          squares[a] === 'X' ? (winsX += 1) : (winsO += 1);
          totalMatches += 1;
          setState({
            ...state,
            winner: squares[a],
            running: false,
            winsX,
            winsO,
            totalMatches,
          });
        }
      });
    };

    const checkRunning = (squares) => {
      const index = squares.findIndex((sq) => sq === null);
      if (index < 0) {
        let { totalMatches } = state;
        totalMatches += 1;
        setState({ ...state, running: false, totalMatches });
      }
    };

    if (!state.winner) {
      checkWinner(state.squares);
    }
    if (state.running) {
      checkRunning(state.squares);
    }
  });

  return (
    <div className="board-container">
      <div>
        <div className="status">
          {state.running ? (
            <>
              {state.currentPlayerX
                ? `${players[0].name} joga...`
                : `${players[1].name} joga...`}
            </>
          ) : (
            <>
              {state.winner
                ? `${
                    state.winner === 'X'
                      ? `${players[0].name} VENCEU! PARABÉNS!!`
                      : `${players[1].name} VENCEU! PARABÉNS!!`
                  }`
                : 'EMPATE!'}
            </>
          )}
        </div>
        <div className="board-row">
          <Square
            value={state.squares[0]}
            index={0}
            onClick={() => handleClick(0)}
          />
          <Square
            value={state.squares[1]}
            index={1}
            onClick={() => handleClick(1)}
          />
          <Square
            value={state.squares[2]}
            index={2}
            onClick={() => handleClick(2)}
          />
        </div>
        <div className="board-row">
          <Square
            value={state.squares[3]}
            index={3}
            onClick={() => handleClick(3)}
          />
          <Square
            value={state.squares[4]}
            index={4}
            onClick={() => handleClick(4)}
          />
          <Square
            value={state.squares[5]}
            index={5}
            onClick={() => handleClick(5)}
          />
        </div>
        <div className="board-row">
          <Square
            value={state.squares[6]}
            index={6}
            onClick={() => handleClick(6)}
          />
          <Square
            value={state.squares[7]}
            index={7}
            onClick={() => handleClick(7)}
          />
          <Square
            value={state.squares[8]}
            index={8}
            onClick={() => handleClick(8)}
          />
        </div>
      </div>
      <div className="button-box">
        {state.winner || !state.running ? (
          <>
            <button
              type="submit"
              className="btn-game"
              onClick={() => resetGame()}
            >
              Novo jogo
            </button>
            <button
              type="submit"
              className="btn-game"
              onClick={() => resetScoreBoard()}
            >
              Zerar Placar
            </button>
          </>
        ) : null}
      </div>
      <div className="placar">
        <h1>Placar</h1>
        <span>
          [X] -{players[0].name} = {state.winsX}
        </span>
        <br />
        <br />
        <span>
          [O] -{players[1].name} = {state.winsO}
        </span>
        <br />
        <br />
        <span>
          Empates = {state.totalMatches - (state.winsX + state.winsO)}
        </span>
        <br />
        <br />
        <div className="container-total">
          <span className="total-partidas">
            Total de Partidas = {state.totalMatches}
          </span>
        </div>
      </div>
    </div>
  );
}
