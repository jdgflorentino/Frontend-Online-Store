/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-max-depth */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductsFromProductId } from '../services/api';
import ShoppingCartButton from '../components/ShoppingCartButton';
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
      cart,
      haveShipping: false,
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const productResponses = await getProductsFromProductId(match.params.id);
    const shipping = productResponses.shipping.free_shipping;
    console.log(Object.entries(productResponses.pictures));
    this.setState({ productInfos: productResponses, haveShipping: shipping });
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

  render() {
    const { productInfos: {
      title,
      id,
      price,
      condition,
      sold_quantity },
    cart, haveShipping } = this.state;
    return (
      <div className="container-details">
        <div className="container">
          <div className="row-links">
            <a href="/" className="first">Compartilhar</a>
            <a href="/" className="second">Vender um igual</a>
          </div>
          <div className="panel">
            <div className="column">
              <img src="http://http2.mlstatic.com/D_817257-MLB49140406201_022022-O.jpg" alt={ title } />
            </div>
            <div className="column">
              <div className="condition">
                <h6>{condition}</h6>
                <h6>{ `${sold_quantity} vendidos` }</h6>
              </div>
              <div className="row-name">
                <h1 data-testid="product-detail-name">
                  {title}
                </h1>
                <img src={ heart1 } alt="favoritar" className="favorite" />
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
        <ShoppingCartButton cart={ cart } />
      </div>
    );
  }
}

ProductsDetails.propTypes = {
  match: PropTypes.object,
  cart: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default ProductsDetails;
