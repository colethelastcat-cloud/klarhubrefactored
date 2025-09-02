import React from 'react';
import ReactDOM from 'react-dom/client';

// We will create this App.jsx file in the next step.
// For now, it's just a placeholder.
const App = () => {
  return (
    <div>
      <h1>Hello, Klar Hub!</h1>
      <p>Our new React app is loading...</p>
    </div>
  );
};

// This line imports all your CSS for the entire application.
import './styles.css';

// This is the standard React 18 way to start your app.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
