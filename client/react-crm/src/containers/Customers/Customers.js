import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import * as actions from './../../store/actions/index';

class Customers extends Component {

  state = {};

  componentDidMount() {
    if (this.props.token) {
      this.props.onCustomersFetch(this.props.token);
    }
  }

  render() {
    let redirect = null;
    if (!this.props.token) {
      redirect = <Redirect to ="/" />
    }
    return (
      <div>
        {redirect}
        <h1>CUSTOMERS</h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    customers: state.customers.customers,
    error: state.customers.error,
    loading: state.customers.loading,
    token: state.auth.token
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onCustomersFetch: token => dispatch(actions.fetchCustomers(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Customers);
