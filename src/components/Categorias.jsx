import React, { Component } from 'react';

class Categorias extends Component {
  render() {
    return (
      <label htmlFor="pesquisa">
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <input type="text" id="pesquisa" />
      </label>
    );
  }
}

export default Categorias;
