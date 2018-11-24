import React, { Component } from 'react';
import './App.css';
import Auth from './containers/Auth/Auth';
import Customers from './containers/Customers/Customers';
import { Route, Switch, Redirect } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">

        <Switch>
          <Route path ="/customers" component={Customers} />
          <Route path ="/" exact component={Auth} />
          <Redirect to="/" />
        </Switch>

      </div>
    );
  }
}

export default App;
