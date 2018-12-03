import React, { Component } from 'react';
import './App.css';
import Auth from './containers/Auth/Auth';
import Layout from './hoc/Layout/Layout';
import Customers from './containers/Customers/Customers';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { CUSTOMERS_PATH } from './containers/Customers/Customers';

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path ="/" exact component={Auth} />
        <Redirect to="/" />
      </Switch>);
    if (this.props.token) {
      routes = (
        <Layout>
          <Switch>
            <Route path = {CUSTOMERS_PATH} component={Customers} />
            <Route path ="/" exact component={Auth} />
            <Redirect to="/" />          
          </Switch>
          </Layout>  
        );
    }
    return (
      <div>
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
