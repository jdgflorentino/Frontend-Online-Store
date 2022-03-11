import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import * as api from './services/api';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      allCategories: [],
    };
    this.handleAllCategories = this.handleAllCategories.bind(this);
  }

  componentDidMount() {
    this.handleAllCategories();
  }

  async handleAllCategories() {
    const dataCategories = await api.getCategories();
    console.log(dataCategories);
    this.setState({
      allCategories: dataCategories,
    });
  }

  render() {
    const { allCategories } = this.state;
    return (
      <BrowserRouter>
        <Route
          exact
          path="/"
          render={ () => (<Home
            allCategories={ allCategories }
          />) }
        />
        <Route exact path="/ShoppingCart" component={ ShoppingCart } />
      </BrowserRouter>
    );
  }
}

export default App;
