/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductsFromQuery } from '../services/api';
import '../styles/Recomendation.css';

class Recomendations extends Component {
  constructor() {
    super();
    this.state = {
      products: [{
        id: 'MLB1834126211',
        thumbnail: 'http://http2.mlstatic.com/D_707026-MLA40193696598_122019-I.jpg',
        title: 'Fone De Ouvido Gamer Headphone Microfone Melhor Pc Ps4 Xbox ',
        price: 49.19,
        shipping:
          { free_shipping: false } },
      { id: 'MLB2604914301', thumbnail: 'http://http2.mlstatic.com/D_869832-MLA48131216615_112021-I.jpg', title: 'Monitor Curvo Samsung T55 C32t550 Led 32   Dark Blue Gray 100v/240v', price: 2199, shipping: { free_shipping: true } },
      { id: 'MLB3060574177', thumbnail: 'http://http2.mlstatic.com/D_905514-MLA45654683948_042021-I.jpg', title: 'Cadeira De Escritório Thunderx3 Tgc12 Gamer Ergonômica  Preta Com Estofado De Couro Sintético', price: 1449, shipping: { free_shipping: true } }],
    };
  }

getProducts = async ({ target }) => {
  const { textContent } = target;
  const results = await getProductsFromQuery(textContent);
  console.log(results);
  this.setState({ products: results.results });
}

render() {
  const { products } = this.state;
  const { cart, addCart } = this.props;
  const THREE = 3;
  return (
    <div className="recomendation-container">
      <div className="span-container">
        <span className="span-text">Semana do Desenvolvedor</span>
      </div>
      <div className="recomendation-container--inner">
        <div className="card-container">
          <div className="link-list">
            <div className="link-container">
              <button
                type="button"
                className="link"
                onClick={ this.getProducts }
              >
                Teclado
              </button>
              <button
                type="button"
                className="link"
                onClick={ this.getProducts }
              >
                Monitor
              </button>
              <button
                type="button"
                className="link"
                onClick={ this.getProducts }
              >
                Cadeira
              </button>
              <button
                type="button"
                className="link"
                onClick={ this.getProducts }
              >
                CPU
              </button>
              <button
                type="button"
                className="link"
                onClick={ this.getProducts }
              >
                Headset
              </button>
            </div>
          </div>
          {products && products
            .slice(0, THREE)
            .map((element, index) => (
              <div
                className="card"
                key={ index }
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
                  <div className="div-img">
                    <img
                      src={ element.thumbnail }
                      alt={ element.title }
                    />

                  </div>
                  <div className="div-info-text">
                    <p className="curr-price">
                      R$
                      {' '}
                      {element.price}
                    </p>
                    {
                      element.shipping.free_shipping
                        ? (<p className="shipping" data-testid="free-shipping">
                          Frete Grátis
                           </p>) : null
                    }
                    <p className="product-title">
                      {element.title}
                    </p>
                  </div>
                </Link>
                <div className="div-btn">
                  <button
                    type="button"
                    data-testid="product-add-to-cart"
                    onClick={ addCart }
                    id={ element.id }
                    className="btn-buy"
                  >
                    + ADD CART
                  </button>

                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
}

Recomendations.propTypes = {
  addCart: PropTypes.func.isRequired,
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Recomendations;
