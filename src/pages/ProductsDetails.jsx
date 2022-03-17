import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductsFromProductId } from '../services/api';
import ShoppingCartButton from '../components/ShoppingCartButton';

class ProductsDetails extends Component {
  constructor(props) {
    super(props);
    const { location: { state } } = this.props;
    const { cart } = state;
    this.state = {
      productInfos: [],
      cart,
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const productResponses = await getProductsFromProductId(match.params.id);
    this.setState({ productInfos: productResponses });
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
    const { productInfos, cart } = this.state;
    return (
      <>
        <h3 data-testid="product-detail-name">
          {productInfos.title}
        </h3>
        <p>
          {' '}
          R$
          {' '}
          {productInfos.price}
        </p>
        <img src={ productInfos.thumbnail } alt={ productInfos.title } />
        <button
          type="button"
          onClick={ this.addCart }
          id={ productInfos.id }
          data-testid="product-detail-add-to-cart"
        >
          Enviar para o carrinho
        </button>
        <ShoppingCartButton cart={ cart } />
      </>
    );
  }
}

ProductsDetails.propTypes = {
  match: PropTypes.object,
  cart: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default ProductsDetails;
