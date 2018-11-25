import React, { Component } from 'react';
import './App.css';
import Auth from './containers/Auth/Auth';
import Customers from './containers/Customers/Customers';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path ="/" exact component={Auth} />
        <Redirect to="/" />
      </Switch>);
    if (this.props.token) {
      routes = (
        <Switch>
          <Route path ="/customers" component={Customers} />
          <Route path ="/" exact component={Auth} />
          <Redirect to="/" />          
        </Switch>);
    }
    return (
      <div className="App">
        {routes}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
}

export default withRouter(connect(mapStateToProps)(App));
