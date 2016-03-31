import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './containers/App';
import Header from './components/Header';

import configureStore from './store/configureStore';

const initialState = window.MC.__INITIAL_STATE__

const store = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Header />
      <App />
    </div>
  </Provider>,
  document.getElementById('app')
);
