import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Categorias extends Component {
  render() {
    const { allCategories, handleCategory } = this.props;
    return (
      <ul>
        { allCategories.map((category) => (
          <div key={ category.id }>
            <label key={ category.id } htmlFor={ category.id } data-testid="category">
              <input
                id={ category.id }
                type="radio"
                name="category"
                onClick={ handleCategory }
              />
              { category.name }
            </label>
          </div>
        ))}
      </ul>
    );
  }
}
Categorias.propTypes = {
  allCategories: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleCategory: PropTypes.func.isRequired,
};

export default Categorias;
