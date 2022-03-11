import React, { Component } from 'react';
import ShoppingCartButton from '../components/ShoppingCartButton';

class Home extends Component {
  render() {
    return (
      <div>
        <label htmlFor="pesquisa">
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
          <input type="text" id="pesquisa" />
        </label>
        <ShoppingCartButton />
      </div>
    );
  }
}

export default Home;
