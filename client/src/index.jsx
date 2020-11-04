import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';

import redux from 'redux';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {moviesApp} from './reducers/reducers';


import MainView from './components/main-view/main-view';

import { format } from 'morgan';
import {Mymovies} from './components/profile-vew/mymovies';
import {Date} from './components/general/date';
/**
 * @constant
 * @type {function}
 */
const store = createStore(moviesApp);

var container = document.getElementById('root');

ReactDOM.render(
  
  <Provider store={store}>
      <MainView />
  </Provider>
  ,container
  );


