import React from 'react';
import path from 'path';
import { Link } from 'react-router-dom';

import './Home.scss';

export default function Home() {
  return (
    <div className="tic-tac-toe__home--container">
      <img
        className="banner"
        src={path.join(__dirname, './images/jogo-da-velha.png')}
        alt="Tic Tac Toe"
      />
      <div className="button-box">
        <Link to="/signIn">
          <button type="submit" className="btn-game">
            Login
          </button>
        </Link>
        <Link to="/signUp">
          <button type="submit" className="btn-game">
            Registrar
          </button>
        </Link>
      </div>
    </div>
  );
}
