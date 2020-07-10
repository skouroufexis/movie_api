import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {MainView} from './components/main-view/main-view';
import { format } from 'morgan';



var container = document.getElementById('root');


ReactDOM.render(<MainView />,container);

// localStorage.clear();