import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ShoppingCart extends Component {
  render() {
    const { location } = this.props;
    const { state } = location;
    const { cart } = state;
    console.log(cart);

    return (
      <div>
        {cart.length === 0
          ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          : (
            cart.map((el) => {
              const quantidade = cart.filter((el2) => el.title === el2.title);
              return (
                <div key={ el.id }>
                  <img src={ el.thumbnail } alt={ el.title } />
                  <p data-testid="shopping-cart-product-name">{el.title}</p>
                  <p data-testid="shopping-cart-product-quantity">{quantidade.length}</p>
                </div>
              );
            }))}
      </div>
    );
  }
}
ShoppingCart.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default ShoppingCart;
