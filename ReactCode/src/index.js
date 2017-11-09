import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

//comment out before building
//module.hot.accept();
