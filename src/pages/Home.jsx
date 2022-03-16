import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ShoppingCartButton from '../components/ShoppingCartButton';
import { getProductsFromCategory, getProductsFromQuery } from '../services/api';
import Categorias from '../components/Categorias';

class Home extends Component {
  userData;

  constructor() {
    super();
    this.state = {
      inputValue: '',
      resultApi: [],
      cart: [],
    };
  }

  getValue = (event) => {
    this.setState({ inputValue: event.target.value });
  }

  handleCategory = async ({ target }) => {
    const { id } = target;
    const data = await getProductsFromCategory(id);
    this.setState({ resultApi: data.results });
  }

  searchButton = async () => {
    const { inputValue } = this.state;
    const results = await getProductsFromQuery(inputValue);
    console.log(results);
    this.setState({ resultApi: results.results });
  }

  addCart = (e) => {
    const { resultApi } = this.state;
    const itemsCart = resultApi.filter((el) => el.id === e.target.name);

    this.setState((ea) => ({
      cart: [...ea.cart, ...itemsCart],
    }));
  }

  render() {
    const { inputValue, resultApi, cart } = this.state;
    const { allCategories } = this.props;

    return (
      <div>
        <Categorias
          allCategories={ allCategories }
          handleCategory={ this.handleCategory }
        />
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
              <div
                key={ element.id }
                data-testid="product"
              >
                <Link
                  key={ element.id }
                  to={ {
                    pathname: `Products/${element.id}`,
                    state: { cart },
                  } }
                  data-testid="product-detail-link"
                >
                  <div>
                    {element.title}
                  </div>
                  <div>
                    {element.price}
                  </div>
                  <img src={ element.thumbnail } alt={ element.title } />
                </Link>
                <button
                  type="button"
                  data-testid="product-add-to-cart"
                  onClick={ this.addCart }
                  name={ element.id }
                >
                  Enviar para o carrinho
                </button>
              </div>
            ))}
        </div>
        <ShoppingCartButton cart={ cart } />
      </div>
    );
  }
}
Home.propTypes = {
  allCategories: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default Home;
