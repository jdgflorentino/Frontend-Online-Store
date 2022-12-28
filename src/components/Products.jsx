/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/Products.css';

class Products extends Component {
  render() {
    const { resultApi, addCart, cart } = this.props;
    return (

      <div className="products-container">
        {resultApi
          .map((element) => (
            <div
              key={ element.id }
              data-testid="product"
              className="container-inner"
            >
              <div className="card">
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
                      <span>{element.price}</span>
                    </p>
                    {element.shipping.free_shipping
                      && <p
                        className="shipping"
                        data-testid="free-shipping"
                      >
                        {' '}
                        Frete Grátis
                        {' '}

                      </p>}
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
            </div>
          ))}
      </div>
    );
  }
}
Products.propTypes = {
  addCart: PropTypes.func.isRequired,
  resultApi: PropTypes.arrayOf(PropTypes.object).isRequired,
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Products;
