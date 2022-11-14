import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import rainbow from '../images/rainbow.png';
import '../styles/ShoppingCart.css';

class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    const { location: { state } } = this.props;
    const { cart } = state;
    this.state = {
      itensCart: cart,
      totalPrice: 0,
    };
  }

  componentDidMount = () => {
    this.getPrice();
  }

  getPrice = () => {
    const { itensCart } = this.state;
    const price = itensCart.map((el) => el.price * el.quantity);
    const totalPrice = price.reduce((a, b) => a + b);
    console.log(totalPrice);
    this.setState({ totalPrice });
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
    const { itensCart, totalPrice, products } = this.state;
    return (
      <div>
        {itensCart.length === 0
          ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          : (
            <div className="container-cart">
              <header className="container-header">
                <div className="logo">
                  <img src={ rainbow } alt="rainbow" />
                </div>
              </header>
              <div className="cart-panel">
                <div className="card-body">
                  <div className="card-items">
                    {
                      itensCart.map((el) => (
                        <div
                          className="container-item"
                          key={ el.id }
                        >
                          <img src={ el.thumbnail } alt={ el.title } />
                          <div className="infos">
                            <p
                              className="title"
                              data-testid="shopping-cart-product-name"
                            >
                              {el.title}

                            </p>
                            <div className="price-button">
                              <p className="price">
                                {' '}
                                R$
                                {' '}
                                {el.price}
                              </p>
                              <div className="form">
                                <button
                                  className="cart-btn"
                                  type="button"
                                  data-testid="product-decrease-quantity"
                                  onClick={ this.clickDecrease }
                                  id={ el.id }
                                >
                                  -
                                </button>
                                <p
                                  className="quantity"
                                  data-testid="shopping-cart-product-quantity"
                                >
                                  {el.quantity}
                                </p>
                                <button
                                  className="cart-btn"
                                  type="button"
                                  data-testid="product-increase-quantity"
                                  onClick={ this.clickIncrease }
                                  id={ el.id }
                                >
                                  +
                                </button>

                              </div>

                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>

                </div>
                <div className="checkout">
                  <div className="content-checkout">
                    <p>Checkout</p>
                    <p>
                      Produtos
                      {`(${products})`}
                    </p>
                    <span>
                      {`Você pagará R$
                      ${totalPrice}
                      `}
                    </span>
                  </div>

                  <button type="button">Finalizar Compra</button>
                </div>

              </div>
              <footer className="container-footer">
                <Footer />
              </footer>
            </div>
          )}
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object),
  totalProducts: PropTypes.number,
}.isRequired;

export default ShoppingCart;
