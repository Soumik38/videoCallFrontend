import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import {SocketProvider} from './util/socketContext'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<SocketProvider><App/></SocketProvider>);
reportWebVitals();
