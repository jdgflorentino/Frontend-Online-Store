import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    const { location: { state } } = this.props;
    const { cart } = state;
    this.state = {
      itensCart: cart,
    };
  }

  clickDecrease = ({ target }) => {
    const { itensCart } = this.state;
    const item = itensCart.find((e) => e.id === target.id);
    if (item.quantity > 0) {
      item.quantity -= 1;
    } else {
      item.quantity = 0;
    }
    this.setState({ itensCart: [...itensCart] });
  }

 clickIncrease = ({ target }) => {
   const { itensCart } = this.state;
   const item = itensCart.find((e) => e.id === target.id);
   if (item.quantity < item.available_quantity) {
     item.quantity += 1;
   }
   this.setState({ itensCart: [...itensCart] });
 }

 render() {
   const { itensCart } = this.state;
   return (
     <div>
       {itensCart.length === 0
         ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
         : (
           <div>
             <ul>
               {
                 itensCart.map((el) => (
                   <div key={ el.id }>
                     <img src={ el.thumbnail } alt={ el.title } />
                     <p data-testid="shopping-cart-product-name">{el.title}</p>
                     <p>
                       {' '}
                       R$
                       {' '}
                       {el.price}
                     </p>
                     <button
                       type="button"
                       data-testid="product-decrease-quantity"
                       onClick={ this.clickDecrease }
                       id={ el.id }
                     >
                       -
                     </button>
                     <p
                       data-testid="shopping-cart-product-quantity"
                       className={ el.id }
                     >
                       {el.quantity}
                     </p>
                     <button
                       type="button"
                       data-testid="product-increase-quantity"
                       onClick={ this.clickIncrease }
                       id={ el.id }
                     >
                       +
                     </button>
                   </div>
                 ))
               }
             </ul>
             <button type="button">Finalizar Compra</button>
           </div>
         )}
     </div>
   );
 }
}

ShoppingCart.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default ShoppingCart;
