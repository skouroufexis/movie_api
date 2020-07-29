
import React from 'react';
import ReactDOM from 'react-dom';

import redux from 'redux';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {moviesApp} from './reducers/reducers';


import MainView from './components/main-view/main-view';

import { format } from 'morgan';

import {Date} from './components/general/date';



// localStorage.clear();
const store = createStore(moviesApp);




var container = document.getElementById('root');


ReactDOM.render(
  
  <Provider store={store}>
      <MainView />
  </Provider>
  ,container
  );


