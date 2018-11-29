import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Route, Link } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import * as actions from './../../store/actions/index';
import Customer from './Customer/Customer';

import './Customers.css';

export const CUSTOMERS_PATH = '/customers';

class Customers extends Component {

  state = {};

  componentDidMount() {
    if (this.props.token) {
      this.props.onCustomersFetch(this.props.token);
    }
  }

  editRow = id => {
    console.log('edit: ' + id);
    //this.props.history.push('/' + id)
  }

  deleteRow = id => {
    console.log('remove: ' + id);
  }

  render() {
    const noSpace = {
      margin: '0px',
      padding: '0px',
      boxSizing: 'border-box',
      textDecoration: 'none',
      fontSize: '0px'
    };

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
            <TableCell>
              <IconButton>                                
                <Link style={noSpace} to={{pathname: this.props.match.url + '/' + row.id}} >
                  <EditIcon color="primary" />
                </Link>                                  
              </IconButton>
              <IconButton onClick={() => this.deleteRow(row.id)}>
                <DeleteIcon color="primary" />
              </IconButton>
            </TableCell>
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
        <TableCell>Actions</TableCell>
      </TableRow>
    );

    return (
      <div>
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
        <Route path={this.props.match.url + '/:customerId'} component={Customer} />
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
