import * as actionTypes from './actionTypes';
import axios from './../../axios-crm';

const fetchCustomersSuccess = (data) => {
    return {
      type: actionTypes.CUSTOMERS_FETCH_SUCCESS,
      customers: data
    };
}

const fetchCustomersFail = (error) => {
    return {
      type: actionTypes.CUSTOMERS_FETCH_FAIL,
      error: error
    };
}

const fetchCustomersStart = () => {
    return {
      type: actionTypes.CUSTOMERS_FETCH_START
    };
}

const buildTokenConfig = token => {
  var config = {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  };
  return config;
}

export const fetchCustomers = (token) => {
  return dispatch => {
    dispatch(fetchCustomersStart());
    axios.get('/customers', buildTokenConfig(token))
    .then(r => dispatch(fetchCustomersSuccess(r.data.content)))
    .catch(e => {
      let error = 'Fetch network error';
      if (e.response) {
        error = e.response.data.message;
      }
      dispatch(fetchCustomersFail(error));
    });
  };
}

const onUpdateSuccess = customer => {
  return {
    type: actionTypes.CUSTOMERS_UPDATE_SUCCESS,
    data: customer
  };
}

export const updateCustomer = (token, customer) => {
  return dispatch => {
    axios.put('/customers/' + customer.id, customer, buildTokenConfig(token))
    .then(r => dispatch(onUpdateSuccess(r.data)))
    .catch(e => {
      let error = 'Update network error';
      if (e.response) {
        error = e.response.data.message;
      }
      console.log(error);
    });
  }
}

const onDeleteSuccess = (id) => {
  return {
    type: actionTypes.CUSTOMERS_DELETE_SUCCESS,
    id: id
  };
}

export const deleteCustomer = (token, id) => {
  return dispatch => {
    axios.delete('/customers/' + id, buildTokenConfig(token))
    .then(r => dispatch(onDeleteSuccess(id)))
    .catch(e => {
      let error = 'Delete network error';
      if (e.response) {
        error = e.response.data.message;
      }
      console.log(error);
    });
  }
}