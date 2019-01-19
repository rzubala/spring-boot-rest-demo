import * as actionTypes from './actionTypes';
import axios from './../../axios-crm';
import { store } from '../../index';

const fetchCustomersSuccess = (data, totalElements, page, rowsPerPage) => {
    return {
      type: actionTypes.CUSTOMERS_FETCH_SUCCESS,
      customers: data,
      total: totalElements,
      page: page,
      rowsPerPage: rowsPerPage
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

export const fetchCustomers = (token) => {
  const page = store.getState().customers.page;
  const rowsPerPage = store.getState().customers.rowsPerPage;
  return fetchCustomersInternal(token, page, rowsPerPage);
}

const fetchCustomersInternal = (token, page, rowsPerPage) => {
  return dispatch => {
    dispatch(fetchCustomersStart());
    axios.get('/customers?page=' + page + '&size=' + rowsPerPage, buildTokenConfig(token))    
    .then(r => {
      console.log(r.data)
      return dispatch(fetchCustomersSuccess(r.data.content, r.data.totalElements, page, rowsPerPage))
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
    .then(r => {
      const page = store.getState().customers.page;
      const rowsPerPage = store.getState().customers.rowsPerPage;
      return dispatch(fetchCustomersInternal(token, page, rowsPerPage));  
    })
    .catch(e => {
      let error = e;
      if (e.response) {
        error = e.response.data.message;
      }
      console.log(error);
    });
  }
}

export const deleteCustomer = (token, id) => {
  return dispatch => {
    axios.delete('/customers/' + id, buildTokenConfig(token))
    .then(r => {
      const page = store.getState().customers.page;
      const rowsPerPage = store.getState().customers.rowsPerPage;
      return dispatch(fetchCustomersInternal(token, page, rowsPerPage));  
    })
    .catch(e => {
      let error = e;
      if (e.response) {
        error = e.response.data.message;
      }
      console.log(error);
    });
  }
}

export const onPageChange = (page) => {
  return dispatch => {
    const token = store.getState().auth.token;
    const rowsPerPage = store.getState().customers.rowsPerPage;
    return dispatch(fetchCustomersInternal(token, page, rowsPerPage));
  };
}

export const onRowsPerPageChange = (rowsPerPage) => {
  return dispatch => {
    const token = store.getState().auth.token;
    const page = store.getState().customers.page;
    return dispatch(fetchCustomersInternal(token, page, rowsPerPage));
  }
}
