/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-max-depth */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductsFromProductId } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/ProductsDetails.css';
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
      totalProducts: 0,
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const productResponses = await getProductsFromProductId(match.params.id);
    console.log(productResponses);
    const shipping = productResponses.shipping.free_shipping;
    const img = Object.entries(productResponses.pictures[0])[1][1];
    this.setState({
      productInfos: productResponses,
      haveShipping: shipping,
      img_url: img,
    });
  }

  addCart = ({ target }) => {
    const { productInfos, cart } = this.state;
    const product = cart.find((item) => item.id === target.id);
    if (!product) {
      productInfos.quantity = 1;
      this.setState(((prevState) => ({ cart: [...prevState.cart, productInfos] })),
        this.updateLocalStorage());
    } else {
      productInfos.quantity += 1;
    }
    this.setState(((prev) => ({ totalProducts: prev.totalProducts + 1 })),
      this.updateLocalStorage());
  }

  updateLocalStorage = () => {
    const { totalProducts } = this.state;
    console.log(totalProducts);
    localStorage.setItem('totalProducts', totalProducts + 1);
  };

  render() {
    const { productInfos: {
      title,
      id,
      price,
      sold_quantity },
    cart, haveShipping, img_url, totalProducts } = this.state;
    return (
      <div className="container-page">
        <header className="ret-header">
          <Header
            cart={ cart }
            getValue={ this.getValue }
            searchButton={ this.searchButton }
            totalProducts={ totalProducts }
          />
        </header>
        <div className="container-details">
          <div className="container">
            <div className="row-links">
              <a href="/" className="first">Compartilhar</a>
              <a href="/" className="second">Vender um igual</a>
            </div>
            <div className="panel">
              <div className="img-column">
                <img src={ img_url } alt={ title } className="img-detail" />
              </div>
              <div className="infos-column">
                <div className="row-name">
                  <h1 data-testid="product-detail-name">

                    {title}

                  </h1>

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

                {
                  haveShipping

                  && <div className="delivery">
                    <img src={ delivery } alt="delivery" />
                    <h6 data-testid="free-shipping">Frete Grátis</h6>
                  </div>
                }
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
        <footer className="container-footer">
          <Footer />
        </footer>
      </div>
    );
  }
}

ProductsDetails.propTypes = {
  match: PropTypes.object,
  cart: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default ProductsDetails;
