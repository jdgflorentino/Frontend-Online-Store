import React, { Component } from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      resultApi: [],
    };
  }

  getValue = (event) => {
    this.setState({ inputValue: event.target.value });
  }

  searchButton = async () => {
    const { inputValue } = this.state;
    const results = await getProductsFromCategoryAndQuery('bigua', inputValue);
    this.setState({ resultApi: results.results });
  }

  render() {
    const { inputValue, resultApi } = this.state;
    console.log(resultApi);
    return (
      <>
        <label htmlFor="pesquisa">
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
          <input
            type="text"
            id="pesquisa"
            name="pesquisa"
            value={ inputValue }
            onChange={ this.getValue }
            data-testid="query-input"
          />
        </label>
        <button
          type="submit"
          data-testid="query-button"
          onClick={ this.searchButton }
        >
          Pesquisar
        </button>
        <div>
          <h4>Lista de produtos</h4>
          {resultApi
            .map((element) => (
              <div key={ element.id }>
                <div data-testid="product">
                  {element.title}
                </div>
                <div>
                  {element.price}
                </div>
                <img src={ element.thumbnail } alt={ element.title } />
              </div>
            ))}
        </div>
      </>
    );
  }
}

export default Home;
