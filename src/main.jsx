import React from 'react';
import ReactDOM from 'react-dom/client';

// 1. IMPORT the real App component from the file you made
import App from './App.jsx'; 

// 2. IMPORT your styles
import './styles.css';

// 3. RENDER the imported App
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
