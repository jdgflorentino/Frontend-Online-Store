import React, { Component } from 'react';
import PropType from 'prop-types';
import { getProductsFromProductId } from '../services/api';

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

  render() {
    const { productInfos } = this.state;
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
          data-testid="product-detail-add-to-cart"
        >
          Enviar para o carrinho
        </button>
      </>
    );
  }
}

ProductsDetails.propTypes = {
  match: PropType.object,
}.isRequired;

export default ProductsDetails;
