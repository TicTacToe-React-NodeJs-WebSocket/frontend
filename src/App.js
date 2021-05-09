import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import './App.scss';

import promise from 'redux-promise';
import multi from 'redux-multi';
import thunk from 'redux-thunk';

import reducers from './redux/reducers';
import Routes from './routes';

const store = applyMiddleware(thunk, multi, promise)(createStore)(reducers);

function App() {
  return (
    <div className="tic-tac-toe-body">
      <Provider store={store}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
