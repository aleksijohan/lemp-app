import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

console.log('Main.jsx ajetaan – yritetään mountata root:iin');

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.log('Rootia ei löytynyt!');
}