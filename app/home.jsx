import React from 'react';
import ReactDOM from 'react-dom';

import AppHome from './containers/AppHome';
import Header from './components/Header';

ReactDOM.render(
  <div>
    <Header />
    <AppHome />
  </div>,
  document.getElementById('app')
);
