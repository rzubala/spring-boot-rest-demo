import * as actionTypes from './actionTypes';
import axios from './../../axios-crm';

const fetchCustomersSuccess = (data, totalElements, totalPages) => {
    return {
      type: actionTypes.CUSTOMERS_FETCH_SUCCESS,
      customers: data,
      total: totalElements,
      pages: totalPages
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

export const buildTokenConfig = token => {
  var config = {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  };
  return config;
}

export const fetchCustomers = (token, page, size) => {
  return dispatch => {
    dispatch(fetchCustomersStart());
    axios.get('/customers?page=' + page + '&size=' + size, buildTokenConfig(token))    
    .then(r => {
      console.log(r.data)
      return dispatch(fetchCustomersSuccess(r.data.content, r.data.totalElements, r.data.totalPages))
    })
    .catch(e => {
      let error = e;
      if (e.response) {
        error = e.response.data.message;
      }
      dispatch(fetchCustomersFail(error));
    });
  };
}

const onUpdateSuccess = (customer, create = false) => {
  return {
    type: actionTypes.CUSTOMERS_UPDATE_SUCCESS,
    data: customer,
    create: create
  };
}

export const updateCustomer = (token, customer) => {
  return dispatch => {
    axios.put('/customers/' + customer.id, customer, buildTokenConfig(token))
    .then(r => dispatch(onUpdateSuccess(r.data)))
    .catch(e => {
      let error = e;
      if (e.response) {
        error = e.response.data.message;
      }
      console.log(error);
    });
  }
}

export const createCustomer = (token, customer) => {
  return dispatch => {
    axios.post('/customers', customer, buildTokenConfig(token))
    .then(r => dispatch(onUpdateSuccess(r.data, true)))
    .catch(e => {
      let error = e;
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
    .then(r => dispatch(onDeleteSuccess(r.data)))
    .catch(e => {
      let error = e;
      if (e.response) {
        error = e.response.data.message;
      }
      console.log(error);
    });
  }
}