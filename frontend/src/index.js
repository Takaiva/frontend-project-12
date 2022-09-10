import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as StoreProvider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.scss';

import App from './components/App.jsx';
import store from './slices/store.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <StoreProvider store={store}>
         <App />
     </StoreProvider>
  </React.StrictMode>
);

