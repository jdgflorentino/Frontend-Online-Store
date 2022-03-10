import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Categorias from './components/Categorias';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={ Categorias } />
    </BrowserRouter>
  );
}

export default App;
