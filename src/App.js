import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={ Home } />
    </BrowserRouter>
  );
}

export default App;
