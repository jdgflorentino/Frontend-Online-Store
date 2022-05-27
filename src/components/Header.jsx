import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Search from './Search';
import ShoppingCartButton from './ShoppingCartButton';
import rainbow from '../images/rainbow.png';
import '../styles/Header.css';

class Header extends Component {
  render() {
    const { getValue, searchButton, cart } = this.props;
    return (
      <div className="container-header-infos">
        <div className="container-logo">
          <img src={ rainbow } alt="rainbow" />
          <h6 className="logo-page">Frontend</h6>
          <h6 className="logo-page">Online Store</h6>
        </div>
        <div className="container-search">
          <Search
            getValue={ getValue }
            searchButton={ searchButton }
          />
        </div>
        <ShoppingCartButton cart={ cart } />
      </div>
    );
  }
}
Header.propTypes = {
  searchButton: PropTypes.func.isRequired,
  getValue: PropTypes.func.isRequired,
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Header;
