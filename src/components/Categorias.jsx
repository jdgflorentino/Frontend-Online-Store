import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Categorias extends Component {
  render() {
    const { allCategories } = this.props;
    return (
      <ul>
        { allCategories.map((category) => (
          <div key={ category.id }>
            <label key={ category.id } htmlFor={ category.id } data-testid="category">
              <input id={ category.id } type="radio" />
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
};

export default Categorias;
