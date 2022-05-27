import React, { Component } from 'react';
import PropTypes from 'prop-types';
import search from '../images/search24.png';
import '../styles/Search.css';

class Search extends Component {
  render() {
    const { getValue, searchButton } = this.props;
    return (
      <div className="group-input">
        <div className="line" />
        <input
          type="search"
          name="inputValue"
          onChange={ getValue }
          data-testid="query-input"
          className="input-search"
          placeholder="Pesquisar produtos ..."
        />
        <div className="search-icon">
          <button
            type="submit"
            data-testid="query-button"
            onClick={ searchButton }
            className="btn-search"
          >
            <img src={ search } alt="search" />
          </button>
        </div>
      </div>

    );
  }
}
Search.propTypes = {
  searchButton: PropTypes.func.isRequired,
  getValue: PropTypes.func.isRequired,
};

export default Search;
