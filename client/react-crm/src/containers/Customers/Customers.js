import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from './../../store/actions/index';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import './Customers.css';

class Customers extends Component {

  state = {};

  componentDidMount() {
    if (this.props.token) {
      this.props.onCustomersFetch(this.props.token);
    }
  }

  render() {
    let rows = null;
    if (this.props.customers) {
      rows = this.props.customers.map(row => {
        return (
          <TableRow key={row.id}>
            <TableCell component="th" scope="row">{row.firstName}</TableCell>
            <TableCell>{row.lastName}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.createdAt}</TableCell>
            <TableCell>{row.updatedAt}</TableCell>
          </TableRow>
        );
      });
    }

    const headers = (
      <TableRow>
        <TableCell>First name</TableCell>
        <TableCell>Last name</TableCell>
        <TableCell>Email</TableCell>
        <TableCell>Created at</TableCell>
        <TableCell>Updated at</TableCell>
      </TableRow>
    );

    return (
      <Paper className="Customers">
        <h1>CUSTOMERS</h1>
        <Table>
          <TableHead>
            {headers}
          </TableHead>
          <TableBody>
            {rows}
          </TableBody>
        </Table>
      </Paper>
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
