import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {MainView} from './components/main-view/main-view';
import { format } from 'morgan';
import {Mymovies} from './components/profile-vew/mymovies';



var container = document.getElementById('root');


ReactDOM.render(<MainView />,container);

// localStorage.clear();
