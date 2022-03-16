import React, { Component } from 'react';
import PropType from 'prop-types';
import { getProductsFromProductId } from '../services/api';
import ShoppingCartButton from '../components/ShoppingCartButton';

class ProductsDetails extends Component {
  constructor() {
    super();
    this.state = {
      productInfos: [],
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const productResponses = await getProductsFromProductId(match.params.id);
    console.log(productResponses);
    this.setState({ productInfos: productResponses });
  }

  addCart = () => {
    const { productInfos } = this.state;
    const { location } = this.props;
    const { state } = location;
    const { cart } = state;

    cart.push(productInfos);
  }

  render() {
    const { productInfos } = this.state;
    const { location } = this.props;
    const { state } = location;
    const { cart } = state;
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
          name={ productInfos.id }
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
  match: PropType.object,
}.isRequired;

export default ProductsDetails;
