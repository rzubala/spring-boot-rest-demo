import * as actionTypes from './actionTypes';
import axios from './../../axios-crm';
import { store } from '../../index';

const fetchCustomersSuccess = (data, totalElements, page, rowsPerPage, order) => {
    return {
      type: actionTypes.CUSTOMERS_FETCH_SUCCESS,
      customers: data,
      total: totalElements,
      page: page,
      rowsPerPage: rowsPerPage,
      order: order,
      filter: ''
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
  const order = store.getState().customers.order;
  const filter = store.getState().customers.filter;
  return fetchCustomersInternal(token, page, rowsPerPage, order, filter);
}

const fetchCustomersInternal = (token, page, rowsPerPage, order, filter) => {
  filter = filter === undefined ? '%' : filter;
  return dispatch => {
    dispatch(fetchCustomersStart());
    axios.get('/customers?lastName=' + filter + '&page=' + page + ' &size=' + rowsPerPage + '&sort=lastName,' + order, buildTokenConfig(token))    
    .then(r => dispatch(fetchCustomersSuccess(r.data.content, r.data.totalElements, page, rowsPerPage, order)))
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
      const order = store.getState().customers.order;
      const filter = store.getState().customers.filter;
      return dispatch(fetchCustomersInternal(token, page, rowsPerPage, order, filter));  
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
      const order = store.getState().customers.order;
      const filter = store.getState().customers.filter;
      return dispatch(fetchCustomersInternal(token, page, rowsPerPage, order, filter));  
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
    const order = store.getState().customers.order;
    const filter = store.getState().customers.filter;
    return dispatch(fetchCustomersInternal(token, page, rowsPerPage, order, filter));
  };
}

export const onRowsPerPageChange = (rowsPerPage) => {
  return dispatch => {
    const token = store.getState().auth.token;
    const page = store.getState().customers.page;
    const order = store.getState().customers.order;
    const filter = store.getState().customers.filter;
    return dispatch(fetchCustomersInternal(token, page, rowsPerPage, order, filter));
  }
}

export const onCustomerOrderChange = (prev_order) => {
  let order;
  if (prev_order === 'asc') {
    order = 'desc';
  } else {
    order = 'asc';
  }
  return dispatch => {
    const token = store.getState().auth.token;
    const page = store.getState().customers.page;
    const rowsPerPage = store.getState().customers.rowsPerPage;
    const filter = store.getState().customers.filter;
    return dispatch(fetchCustomersInternal(token, page, rowsPerPage, order, filter));
  }
}

export const onCustomerFilter = (filter) => {
  return dispatch => {
    const token = store.getState().auth.token;
    const page = store.getState().customers.page;
    const rowsPerPage = store.getState().customers.rowsPerPage;
    const order = store.getState().customers.order;
    return dispatch(fetchCustomersInternal(token, page, rowsPerPage, order, filter));
  }
}
