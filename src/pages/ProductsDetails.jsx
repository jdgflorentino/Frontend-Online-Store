/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-max-depth */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductsFromProductId } from '../services/api';
import Header from '../components/Header';
import '../styles/ProductsDetails.css';
import heart1 from '../images/heart1.png';
import delivery from '../images/fast-delivery.png';

class ProductsDetails extends Component {
  constructor(props) {
    super(props);
    const { location: { state } } = this.props;
    const { cart } = state;
    this.state = {
      productInfos: {},
      img_url: '',
      cart,
      haveShipping: false,
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const productResponses = await getProductsFromProductId(match.params.id);
    const shipping = productResponses.shipping.free_shipping;
    const img = Object.entries(productResponses.pictures[0])[1][1];
    this.setState({
      productInfos: productResponses,
      haveShipping: shipping,
      img_url: img,
    });
  }

  addCart = () => {
    const { productInfos, cart } = this.state;
    const product = cart.find((item) => item.id === productInfos.id);
    if (!product) {
      productInfos.quantity = 1;
      this.setState((prevState) => ({ cart: [...prevState.cart, productInfos] }));
    } else {
      const index = cart.indexOf(product);
      cart[index].quantity += 1;
      this.setState({ cart });
    }
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
    const { productInfos: {
      title,
      id,
      price,
      sold_quantity },
    cart, haveShipping, img_url } = this.state;
    return (
      <div className="container-home">

        <header className="ret-header">
          <Header
            cart={ cart }
            getValue={ this.getValue }
            searchButton={ this.searchButton }
            // totalProducts={ totalProducts }
          />
        </header>
        <div className="container-details">
          <div className="container">
            <div className="row-links">
              <a href="/" className="first">Compartilhar</a>
              <a href="/" className="second">Vender um igual</a>
            </div>
            <div className="panel">
              <div className="column">
                <img src={ img_url } alt={ title } className="img-detail" />
              </div>
              <div className="column">
                <div className="row-name">
                  <h1 data-testid="product-detail-name">
                    {title}
                  </h1>
                  <img src={ heart1 } alt="favoritar" className="favorite" />
                </div>
                <div className="condition">
                  <h6> Novo </h6>
                  <h6 className="second">{ `${sold_quantity} vendidos` }</h6>
                </div>
                <div className="row-price">
                  <span className="symbol">R$</span>
                  <span className="fraction">{price}</span>
                </div>
                <div className="stock">Estoque disponível</div>
                {haveShipping
                && <div className="delivery">
                  <img src={ delivery } alt="delivery" />
                  <h6 data-testid="free-shipping">Frete Grátis</h6>
                </div>}
                <div className="form">
                  <button
                    className="cart-btn"
                    type="button"
                    data-testid="product-decrease-quantity"
                    onClick={ this.clickDecrease }
                    id={ id }
                  >
                                  -
                  </button>
                  <p
                    className="quantity"
                    data-testid="shopping-cart-product-quantity"
                  >
                    {/* { quantity } */}
                  </p>
                  <button
                    className="cart-btn"
                    type="button"
                    data-testid="product-increase-quantity"
                    onClick={ this.clickIncrease }
                    id={ id }
                  >
                                  +
                  </button>

                </div>
                <button
                  type="button"
                  onClick={ this.addCart }
                  id={ id }
                  data-testid="product-detail-add-to-cart"
                  className="btn-cart"
                >
              Enviar para o carrinho
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>
    );
  }
}

ProductsDetails.propTypes = {
  match: PropTypes.object,
  cart: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default ProductsDetails;
