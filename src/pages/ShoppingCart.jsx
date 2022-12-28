import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import rainbow from '../images/rainbows.png';
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
    const totalPrice = price.reduce((a, b) => a + b, 0).toFixed(2);
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
    this.getPrice();
  }

  clickIncrease = ({ target }) => {
    const { itensCart } = this.state;
    const item = itensCart.find((e) => e.id === target.id);
    if (item.quantity < item.available_quantity) {
      item.quantity += 1;
    }
    this.setState({ itensCart: [...itensCart] });
    this.getPrice();
  }

  render() {
    const { itensCart, totalPrice } = this.state;
    return (
      <div className="container-cart">
        <header className="container-header">
          <Link to="/" className="logo">
            <img src={ rainbow } alt="Frontend Online Store" />
          </Link>
        </header>
        {itensCart.length === 0
          ? <p data-testid="shopping-cart-empty-message" className="empty">Seu carrinho está vazio</p>
          : (
            <div className="container-cart">
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
                    <p className="price">Checkout</p>
                    <p className="title">
                      {`Valor total da compra R$
                      ${totalPrice}
                      `}
                    </p>
                  </div>
                  <div className="container-btn">
                    <button
                      type="button"
                      className="btn-finalizar"
                      disabled={ itensCart.length === 0 }
                    >
                      Finalizar Compra
                    </button>
                  </div>
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
