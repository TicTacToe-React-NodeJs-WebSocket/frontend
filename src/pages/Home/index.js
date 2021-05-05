import React from 'react';
import path from 'path';

import './Home.scss';

export default function Home() {
  console.log(path.join(__dirname, './images/post-office-banner.png'));
  return (
    <div className="tic-tac-toe__container">
      <img
        className="banner"
        src={path.join(__dirname, './images/jogo-da-velha.png')}
        alt="Tic Tac Toe"
      />
      <div className="button-box">
        <button type="submit" className="btn-game">
          Login
        </button>
        <button type="submit" className="btn-game">
          Registrar
        </button>
      </div>
    </div>
  );
}
