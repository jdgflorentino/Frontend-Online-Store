import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductsFromCategory, getProductsFromQuery } from '../services/api';
import Categorias from '../components/Categorias';
import Propagandas from '../components/Propagandas';
import Pagination from '../components/Pagination';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/Home.css';

class Home extends Component {
  userData;

  constructor() {
    super();
    this.state = {
      inputValue: '',
      resultApi: [],
      cart: [],
      categorie: '',
    };
  }

  getValue = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
  }

    searchButton = async () => {
      const { inputValue } = this.state;
      const results = await getProductsFromQuery(inputValue);
      this.setState({ resultApi: results.results });
    }

  handleCategory = async ({ target }) => {
    const { id } = target;
    const data = await getProductsFromCategory(id);
    this.setState({ resultApi: data.results, categorie: target.textContent });
  }

  addCart = ({ target }) => {
    const { resultApi, cart } = this.state;
    const itemCart = resultApi.find((item) => item.id === target.id);
    const isInCart = cart.some((item) => item.id === itemCart.id);
    if (!isInCart) {
      itemCart.quantity = 1;
      this.setState((prevState) => ({ cart: [...prevState.cart, itemCart] }));
    } else {
      itemCart.quantity += 1;
    }
  }

  render() {
    const { resultApi, cart, categorie } = this.state;
    const { allCategories } = this.props;

    return (
      <div className="container-home">
        <header className="container-header">
          <Header
            cart={ cart }
            getValue={ this.getValue }
            searchButton={ this.searchButton }
          />
        </header>
        <Categorias
          allCategories={ allCategories }
          handleCategory={ this.handleCategory }
        />
        {resultApi.length > 0 ? (
          <section className="container-products">
            <span className="span-text">
              { categorie }
              {' '}
            </span>
            <Pagination
              addCart={ this.addCart }
              resultApi={ resultApi }
              cart={ cart }
            />
          </section>
        ) : (
          <div>
            <div className="container-propagandas">
              <div className="div-propagandas">
                <span className="span-text">Promoções para você</span>
              </div>
              <Propagandas />
            </div>
            <h1>Nenhum produto encontrado</h1>
          </div>
        )}
        <footer className="container-footer">
          <Footer />
        </footer>
      </div>
    );
  }
}
Home.propTypes = {
  allCategories: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default Home;
