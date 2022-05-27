/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import '../styles/Categorias.css';

class Categorias extends Component {
  render() {
    const { allCategories, handleCategory } = this.props;
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 10,
      slidesToScroll: 5,
    };
    return (
      <div className="slider-container">
        <div className="text">
          <h5>Selecione uma categoria</h5>
        </div>
        <Slider { ...settings } className="categories-slider">
          { allCategories.map((category) => (
            <div
              key={ category.id }
              className="card-slider"
            >
              <div className="card-img-container">
                <img
                  src={ require(`../images/${category.name}.png`) }
                  alt={ category.name }
                  className="img-category"
                />
              </div>
              <button
                id={ category.id }
                type="button"
                onClick={ handleCategory }
                className="btn-category"
              >
                {category.name}
              </button>

            </div>
          ))}
        </Slider>
      </div>
    );
  }
}
Categorias.propTypes = {
  allCategories: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleCategory: PropTypes.func.isRequired,
};

export default Categorias;
