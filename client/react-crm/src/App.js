import React, { Component } from 'react';
import './App.css';
import Auth from './containers/Auth/Auth';
import Register from './components/Register/Register';
import Layout from './hoc/Layout/Layout';
import Aux from './hoc/Aux/Aux';
import Customers from './containers/Customers/Customers';
import Logout from './containers/Logout/Logout';
import Profile from './containers/Profile/Profile';
import Admin from './containers/Admin/Admin';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

import { CUSTOMERS_PATH } from './containers/Customers/Customers';
import { ADMIN_ROLE } from './store/actions/auth'

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoLogin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path = "/login" component={Auth} />
        <Route path = "/register" component={Register} />
        <Route path ="/" exact component={Auth} />
        <Redirect to="/" />
      </Switch>);
    if (this.props.token) {
      let admin = false;
      let adminPath = null;
      if (this.props.roles) {
        admin = this.props.roles.includes(ADMIN_ROLE);
        if (admin) {
          adminPath = <Route path = "/admin" component={Admin} />;
        }
      }
      routes = (
        <Layout admin={admin} >
          <Switch>
            <Route path = {CUSTOMERS_PATH} component={Customers} />
            <Route path = "/logout" component={Logout} />
            <Route path = "/profile" component={Profile} />
            <Route path = "/login" component={Auth} />
            {adminPath}
            <Route path ="/" exact component={Auth} />
            <Redirect to="/" />          
          </Switch>
        </Layout>
        );
    }
    return (
      <Aux>
        {routes}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    roles: state.auth.roles
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoLogin: () => dispatch(actions.tryAutoLogin())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
