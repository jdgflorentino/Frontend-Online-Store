import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Products from './Products';
import '../styles/Pagination.css';

const FIFTEEN = 10;
const FOUR = 4;

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
    };
  }

  goToNextPage = () => {
    this.setState((prevState) => ({ currentPage: [prevState.currentPage + 1] }));
  }

  goToPreviousPage = () => {
    this.setState((prevState) => ({ currentPage: [prevState.currentPage - 1] }));
  }

changePage = (e) => {
  const pageNumber = Number(e.target.innerText);
  this.setState({ currentPage: pageNumber });
}

  getPaginatedData = () => {
    const { currentPage } = this.state;
    const { resultApi } = this.props;
    const start = currentPage * FIFTEEN - FIFTEEN;
    const end = start + FIFTEEN;
    const newProducts = resultApi.slice(start, end);
    return newProducts;
  }

  getPaginationGroup = () => {
    const { currentPage } = this.state;
    const start = Math.floor((currentPage - 1) / FOUR) * FOUR;
    return new Array(FOUR).fill(0).map((_, index) => start + index + 1);
  };

  render() {
    const { addCart, cart } = this.props;
    return (
      <div>
        <Products
          addCart={ addCart }
          resultApi={ this.getPaginatedData() }
          cart={ cart }
        />
        <div className="pagination">
          {/* previous button */}
          <button
            type="button"
            onClick={ this.goToPreviousPage }
            className="page-link"
          >
            &laquo;
          </button>

          {/* show page numbers */}
          {this.getPaginationGroup().map((item, index) => (
            <button
              type="button"
              key={ index }
              onClick={ this.changePage }
              className="page-link"
            >
              <span>{item}</span>
            </button>
          ))}

          {/* next button */}
          <button
            type="button"
            onClick={ this.goToNextPage }
            className="page-link"
          >
            &raquo;
          </button>
        </div>
      </div>
    );
  }
}

Pagination.propTypes = {
  addCart: PropTypes.func.isRequired,
  resultApi: PropTypes.arrayOf(PropTypes.object).isRequired,
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Pagination;
