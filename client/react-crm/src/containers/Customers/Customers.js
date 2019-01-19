import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Aux from '../../hoc/Aux/Aux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import TablePagination from '@material-ui/core/TablePagination';

import * as actions from './../../store/actions/index';
import Customer from './Customer/Customer';
import CustomSnackbar from '../../components/UI/CustomSnackbar/CustomSnackbar';
import CustomerTableRow from '../../components/UI/CustomerTableRow/CustomerTableRow';
import CustomerTableHeader from '../../components/UI/CustomerTableHeader/CustomerTableHeader';
import TextField from '@material-ui/core/TextField';

import './Customers.css';

export const CUSTOMERS_PATH = '/customers';

const SUBROW_WIDTH = 1000;

class Customers extends Component {

  state = {
    infoOpen: false,
    infoType: 'error',
    infoMessage: '',
    windowHeight: undefined,
    windowWidth: undefined,
    redirectPath: '',
    confirmDelete: null
  };

  handleResize = () => this.setState({
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth
  });

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  componentDidMount() {
    if (this.props.token) {
      this.props.onCustomersFetch(this.props.token);
    }
    window.addEventListener('resize', this.handleResize)
  }

  deleteRow = id => {
    this.setState({ confirmDelete: id });
  }

  cancelDelete = () => {
    this.setState({ confirmDelete: null });
  }

  confirmDelete = () => {
    this.props.onCustomerDelete(this.props.token, this.state.confirmDelete);
    this.setState({ confirmDelete: null });
  }

  onCreateNewCustomer = () => {
    if (this.state.windowWidth < SUBROW_WIDTH) {
      this.setState({ redirectPath: '/customer/new' });
    } else {
      this.props.history.replace(this.props.match.url + '/new');
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.error) {
      this.setState({
        infoOpen: true,
        infoMessage: nextProps.error
      });
    }
    this.handleResize();
  }

  handleChangePage = (event, page) => {
    this.props.onCustomerPageChange(page);
  };

  handleChangeRowsPerPage = event => {
    this.props.onCustomerRowsPerPageChange(event.target.value);
  };

  onCustomerSort = () => {
    this.props.onCustomerOrder(this.props.order);
  }

  filterChangedHandler = (event) => {
    this.props.onCustomerFilter(event.target.value);
  }

  render() {
    let customersTable = <div style={{ textAlign: "center" }}><CircularProgress /></div>;
    if (this.props.customers) {
      const rows = this.props.customers.map(row => {
        return <CustomerTableRow key={row.id} row={row} pathname={this.props.match.url + '/' + row.id} onDeleteRow={this.deleteRow} narrow={this.state.windowWidth < SUBROW_WIDTH} />
      });

      customersTable = (
        <Aux>
          <Table>
            <colgroup>
              {this.state.windowWidth < SUBROW_WIDTH ? <col width="5%" /> : null}
            </colgroup>
            <TableHead>
              <CustomerTableHeader narrow={this.state.windowWidth < SUBROW_WIDTH}
                sortHandler={this.onCustomerSort} order={this.props.order} />
            </TableHead>
            <TableBody>
              {rows}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={this.props.totalCustomers}
            rowsPerPage={this.props.rowsPerPage}
            page={this.props.page}
            backIconButtonProps={{ 'aria-label': 'Previous Page' }}
            nextIconButtonProps={{ 'aria-label': 'Next Page' }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Aux>
      );
    } else if (this.props.error) {
      customersTable = null;
    }

    let confirmDelete = null;
    if (this.state.confirmDelete) {
      confirmDelete = (
        <Dialog
          open={this.state.confirmDelete ? true : false}
          onClose={this.handleClose}>
          <DialogTitle id="alert-dialog-title">{"Delete Customer: " + this.state.confirmDelete + "?"}</DialogTitle>
          <DialogActions>
            <Button onClick={this.cancelDelete} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.confirmDelete} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      );
    }

    return (
      <div>
        {confirmDelete}
        <Paper className="Customers">
          <div style={{
            textAlign: 'right',
            width: '100%',
            padding: '0'
          }}>
            <h1 style={{ textAlign: 'center' }}>CUSTOMERS</h1>
            <div className="CustomerToolbar">
              <TextField
                className="CustomerToolbarElement"
                style={{ marginLeft: '10px', width: '40%' }}
                id="last-name-filter"
                label="Filter"
                value={this.props.filter}
                onChange={event => this.filterChangedHandler(event)}
                margin="normal"
                variant="outlined"

              />
              <Button style={{ marginRight: '10px' }} variant="contained" color="primary" onClick={this.onCreateNewCustomer}>
                <AddIcon className="IconMargin" />New
              </Button>
            </div>
          </div>
          {customersTable}
        </Paper>
        {this.state.windowWidth < SUBROW_WIDTH ? null : <Route path={this.props.match.url + '/:customerId'} component={Customer} />}
        {this.state.redirectPath ? <Redirect to={this.state.redirectPath} /> : null}

        <CustomSnackbar
          snackbarOpen={this.state.infoOpen}
          onSnackbarClose={this.handleInfoClose}
          variant={this.state.infoType}
          message={this.state.infoMessage}
        />
        <span style={{ display: "none" }}>{this.state.windowWidth} x {this.state.windowHeight}</span>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    customers: state.customers.customers,
    error: state.customers.error,
    loading: state.customers.loading,
    token: state.auth.token,
    totalCustomers: state.customers.total,
    page: state.customers.page,
    rowsPerPage: state.customers.rowsPerPage,
    order: state.customers.order,
    filter: state.customers.filter
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onCustomersFetch: (token, page, size) => dispatch(actions.fetchCustomers(token, page, size)),
    onCustomerDelete: (token, id) => dispatch(actions.deleteCustomer(token, id)),
    onCustomerPageChange: (page) => dispatch(actions.onPageChange(page)),
    onCustomerRowsPerPageChange: (rowsPerPage) => dispatch(actions.onRowsPerPageChange(rowsPerPage)),
    onCustomerOrder: (order) => dispatch(actions.onCustomerOrderChange(order)),
    onCustomerFilter: (filter) => dispatch(actions.onCustomerFilter(filter))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Customers);
