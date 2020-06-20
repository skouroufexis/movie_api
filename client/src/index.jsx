import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import {MainView} from './components/main-view/main-view';
import {MovieCard} from './components/movie-card/movie-card';
import {MovieView} from './components/movie-view/movie-view';

import { format } from 'morgan';

var container = document.getElementById('root');


ReactDOM.render(<MainView />,container);