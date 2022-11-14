/* eslint-disable global-require */
import React, { Component } from 'react';
import Slider from 'react-slick';
import '../styles/Propagandas.css';

class Propagandas extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 2000,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false,
    };
    return (
      <div className="body-container">
        <Slider { ...settings }>
          <div className="img-container">
            <img
              src={ require('../images/Compre.png') }
              alt="compre"
              className="img-propaganda"
            />
          </div>
          <div className="img-container">
            <img
              src={ require('../images/Gamer.png') }
              alt="gamer"
              className="img-propaganda"
            />
          </div>
          <div className="img-container">
            <img
              src={ require('../images/Moda.png') }
              alt="moda"
              className="img-propaganda"
            />
          </div>
          <div className="img-container">
            <img
              src={ require('../images/mercado.png') }
              alt="mercado"
              className="img-propaganda"
            />
          </div>
        </Slider>
      </div>
    );
  }
}

export default Propagandas;
