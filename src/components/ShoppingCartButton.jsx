import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/ShoppingCartButton.css';
import carticon from '../images/cart.png';

class ShoppingCartButton extends Component {
  render() {
    const { cart, totalProducts } = this.props;

    return (
      <div className="div-cart">
        <Link
          to={ {
            pathname: '/ShoppingCart',
            state: { cart },
          } }
        >
          <button
            type="button"
            data-testid="shopping-cart-button"
            className="icon-btn"
          >
            <img src={ carticon } alt="cart-icon" />
          </button>

        </Link>
        <div className="container-quantity">
          <p className="cart-quantity">{ totalProducts }</p>
        </div>
      </div>
    );
  }
}

ShoppingCartButton.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object),
  totalProducts: PropTypes.number,
}.isRequired;

export default ShoppingCartButton;
