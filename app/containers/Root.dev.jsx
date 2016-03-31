import React from 'react';
import {Provider} from 'react-redux';
import App from './App.jsx';
import AppHome from './AppHome';
import DevTools from './DevTools.jsx';
import Header from '../components/Header';

export default ({store}) =>
  <Provider store={store}>
    <div>
      <Header />
      <AppHome />
      <DevTools />
    </div>
  </Provider>
