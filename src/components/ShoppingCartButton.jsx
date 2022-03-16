import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ShoppingCartButton extends Component {
  render() {
    const { cart } = this.props;

    return (
      <Link
        to={ {
          pathname: '/ShoppingCart',
          state: { cart },
        } }
      >
        <button type="button" data-testid="shopping-cart-button">Carrinho</button>
      </Link>
    );
  }
}

ShoppingCartButton.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default ShoppingCartButton;
