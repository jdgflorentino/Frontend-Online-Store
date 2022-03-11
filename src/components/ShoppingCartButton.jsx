import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ShoppingCartButton extends Component {
  render() {
    return (
      <Link to="/ShoppingCart">
        <button type="button" data-testid="shopping-cart-button">Carrinho</button>
      </Link>
    );
  }
}

export default ShoppingCartButton;
