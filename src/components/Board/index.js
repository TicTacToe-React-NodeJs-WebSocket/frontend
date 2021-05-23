/* eslint-disable no-unused-expressions */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector, useDispatch, useEffect } from 'react-redux';
import './Board.scss';

import Square from '../Square';

export default function Board({ currentRoom }) {
  const dispatch = useDispatch();
  const { socketInstance, userInfo } = useSelector((state) => state.Auth);
  const [state, setState] = React.useState({
    squares: Array(9).fill(null),
    currentPlayerX: true,
    winner: null,
    running: true,
    winsX: null,
    winsO: null,
    totalMatches: 0,
    tied: false,
    loser: null,
    emit: false,
  });

  const handleClick = (i) => {
    const squares = state.squares.slice();
    if (squares[i] === null) {
      squares[i] = state.currentPlayerX ? 'X' : 'O';
      socketInstance.emit('toMove', {
        index: i,
        anotherPlayer:
          userInfo.username !== currentRoom.Player1.username
            ? currentRoom.Player1.socketID
            : currentRoom.Player2.socketID,
        state: { ...state, squares, currentPlayerX: !state.currentPlayerX },
      });
      setState({ ...state, squares, currentPlayerX: !state.currentPlayerX });
    }
  };

  const resetGame = () => {
    const squares = state.squares.slice();
    if (state.winner || !state.running) {
      squares.fill(null);
      socketInstance.emit('resetGame', {
        anotherPlayer:
          userInfo.username !== currentRoom.Player1.username
            ? currentRoom.Player1.socketID
            : currentRoom.Player2.socketID,
        state: {
          ...state,
          squares,
          currentPlayerX: true,
          winner: null,
          running: true,
          emit: false,
        },
      });
      setState({
        ...state,
        squares,
        currentPlayerX: true,
        winner: null,
        running: true,
        emit: false,
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
        totalMatches: 0,
      });
    }
  };

  React.useEffect(() => {
    const checkWinner = (squares) => {
      console.log('----------checkWinner--------------');
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
          console.log('--------_VITORIa-------------------');
          setState({
            ...state,
            winner:
              squares[a] === 'X' ? currentRoom.Player1 : currentRoom.Player2,
            loser:
              squares[a] === 'X' ? currentRoom.Player2 : currentRoom.Player1,
            running: false,
            tied: false,
          });
        }
      });
    };

    const checkRunning = (squares) => {
      console.log('-------checkRunning--------');
      const index = squares.findIndex((sq) => sq === null);
      if (index < 0) {
        let { totalMatches } = state;
        totalMatches += 1;
        setState({ ...state, running: false, totalMatches });
      }
    };
    if (
      !state.emit &&
      state.winner &&
      userInfo.username === currentRoom.Player1.username
    ) {
      socketInstance.emit('winner', state);
      setState({ ...state, emit: true });
    }
    if (!state.winner) {
      checkWinner(state.squares);
    }
    if (state.running) {
      checkRunning(state.squares);
    }
    const handleClickListener = (data) => {
      setState({ ...data.state });
    };

    // const handleWinner = (data) => {
    //   setState({
    //     ...state,
    //     winsX:
    //       currentRoom.Player1.username === data.user1.username
    //         ? data.user1.score
    //         : data.user2.score,
    //     winsO:
    //       currentRoom.Player2.username === data.user1.username
    //         ? data.user1.score
    //         : data.user2.score,
    //   });
    // };

    if (socketInstance) {
      socketInstance.on('toMove', handleClickListener);
      socketInstance.on('resetGame', handleClickListener);
      // socketInstance.on('winner', handleWinner);
    }
  }, [socketInstance, state]);

  return (
    <div className="board-container">
      <div className="tab">
        <div className="status">
          {state.running ? (
            <>
              {state.currentPlayerX
                ? `${
                    userInfo.username === currentRoom.Player1.username
                      ? 'Sua vez..'
                      : `${currentRoom.Player1.username} joga...`
                  }`
                : `${
                    userInfo.username === currentRoom.Player2.username
                      ? 'Sua vez..'
                      : `${currentRoom.Player2.username} joga...`
                  }`}
            </>
          ) : (
            <>
              {state.winner
                ? `${
                    state.winner === 'X'
                      ? `${
                          userInfo.username === currentRoom.Player1.username
                            ? 'VOCÊ VENCEUU! PARABÉNS!!!!!!'
                            : `${currentRoom.Player1.username} venceu...`
                        }`
                      : `${
                          userInfo.username === currentRoom.Player2.username
                            ? 'VOCÊ VENCEUU! PARABÉNS!!!!!!'
                            : `${currentRoom.Player2.username} venceu...`
                        }`
                  }`
                : 'EMPATE!'}
            </>
          )}
        </div>
        <div className="board-row">
          <Square
            value={state.squares[0]}
            index={0}
            onClick={() => {
              if (
                (state.currentPlayerX &&
                  userInfo.username === currentRoom.Player1.username) ||
                (!state.currentPlayerX &&
                  userInfo.username === currentRoom.Player2.username)
              ) {
                handleClick(0);
              }
            }}
            visible={
              !state.winner &&
              ((state.currentPlayerX &&
                userInfo.username === currentRoom.Player1.username) ||
                (!state.currentPlayerX &&
                  userInfo.username === currentRoom.Player2.username))
            }
          />
          <Square
            value={state.squares[1]}
            index={1}
            onClick={() => {
              if (
                (state.currentPlayerX &&
                  userInfo.username === currentRoom.Player1.username) ||
                (!state.currentPlayerX &&
                  userInfo.username === currentRoom.Player2.username)
              ) {
                handleClick(1);
              }
            }}
            visible={
              !state.winner &&
              ((state.currentPlayerX &&
                userInfo.username === currentRoom.Player1.username) ||
                (!state.currentPlayerX &&
                  userInfo.username === currentRoom.Player2.username))
            }
          />
          <Square
            value={state.squares[2]}
            index={2}
            onClick={() => {
              if (
                (state.currentPlayerX &&
                  userInfo.username === currentRoom.Player1.username) ||
                (!state.currentPlayerX &&
                  userInfo.username === currentRoom.Player2.username)
              ) {
                handleClick(2);
              }
            }}
            visible={
              !state.winner &&
              ((state.currentPlayerX &&
                userInfo.username === currentRoom.Player1.username) ||
                (!state.currentPlayerX &&
                  userInfo.username === currentRoom.Player2.username))
            }
          />
        </div>
        <div className="board-row">
          <Square
            value={state.squares[3]}
            index={3}
            onClick={() => {
              if (
                (state.currentPlayerX &&
                  userInfo.username === currentRoom.Player1.username) ||
                (!state.currentPlayerX &&
                  userInfo.username === currentRoom.Player2.username)
              ) {
                handleClick(3);
              }
            }}
            visible={
              !state.winner &&
              ((state.currentPlayerX &&
                userInfo.username === currentRoom.Player1.username) ||
                (!state.currentPlayerX &&
                  userInfo.username === currentRoom.Player2.username))
            }
          />
          <Square
            value={state.squares[4]}
            index={4}
            onClick={() => {
              if (
                (state.currentPlayerX &&
                  userInfo.username === currentRoom.Player1.username) ||
                (!state.currentPlayerX &&
                  userInfo.username === currentRoom.Player2.username)
              ) {
                handleClick(4);
              }
            }}
            visible={
              !state.winner &&
              ((state.currentPlayerX &&
                userInfo.username === currentRoom.Player1.username) ||
                (!state.currentPlayerX &&
                  userInfo.username === currentRoom.Player2.username))
            }
          />
          <Square
            value={state.squares[5]}
            index={5}
            onClick={() => {
              if (
                (state.currentPlayerX &&
                  userInfo.username === currentRoom.Player1.username) ||
                (!state.currentPlayerX &&
                  userInfo.username === currentRoom.Player2.username)
              ) {
                handleClick(5);
              }
            }}
            visible={
              !state.winner &&
              ((state.currentPlayerX &&
                userInfo.username === currentRoom.Player1.username) ||
                (!state.currentPlayerX &&
                  userInfo.username === currentRoom.Player2.username))
            }
          />
        </div>
        <div className="board-row">
          <Square
            value={state.squares[6]}
            index={6}
            onClick={() => {
              if (
                (state.currentPlayerX &&
                  userInfo.username === currentRoom.Player1.username) ||
                (!state.currentPlayerX &&
                  userInfo.username === currentRoom.Player2.username)
              ) {
                handleClick(6);
              }
            }}
            visible={
              !state.winner &&
              ((state.currentPlayerX &&
                userInfo.username === currentRoom.Player1.username) ||
                (!state.currentPlayerX &&
                  userInfo.username === currentRoom.Player2.username))
            }
          />
          <Square
            value={state.squares[7]}
            index={7}
            onClick={() => {
              if (
                (state.currentPlayerX &&
                  userInfo.username === currentRoom.Player1.username) ||
                (!state.currentPlayerX &&
                  userInfo.username === currentRoom.Player2.username)
              ) {
                handleClick(7);
              }
            }}
            visible={
              !state.winner &&
              ((state.currentPlayerX &&
                userInfo.username === currentRoom.Player1.username) ||
                (!state.currentPlayerX &&
                  userInfo.username === currentRoom.Player2.username))
            }
          />
          <Square
            value={state.squares[8]}
            index={8}
            onClick={() => {
              if (
                (state.currentPlayerX &&
                  userInfo.username === currentRoom.Player1.username) ||
                (!state.currentPlayerX &&
                  userInfo.username === currentRoom.Player2.username)
              ) {
                handleClick(8);
              }
            }}
            visible={
              !state.winner &&
              ((state.currentPlayerX &&
                userInfo.username === currentRoom.Player1.username) ||
                (!state.currentPlayerX &&
                  userInfo.username === currentRoom.Player2.username))
            }
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
        <div className="placar-total">
          <span>
            [X] - {currentRoom.Player1.username} ={' '}
            {state.winsX ? state.winsX : currentRoom.Player1.score}
          </span>
          <br />
          <br />
          <span>
            [O] - {currentRoom.Player2.username} ={' '}
            {state.winsO ? state.winsO : currentRoom.Player2.score}
          </span>
          <br />
        </div>
        <br />
      </div>
    </div>
  );
}
