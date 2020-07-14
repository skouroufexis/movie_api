import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {MainView} from './components/main-view/main-view';
import { format } from 'morgan';
import {Mymovies} from './components/profile-vew/mymovies';
import {Date} from './components/general/date';


var container = document.getElementById('root');

// localStorage.clear();
ReactDOM.render(<MainView />,container);


