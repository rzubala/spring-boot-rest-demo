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

export const fetchCustomers = (token) => {
  return dispatch => {
    dispatch(fetchCustomersStart());
    var config = {
      headers: {
        'Authorization': "bearer " + token
      }
    };
    axios.get('/customers', config)
    .then(r => {
      console.log(r);
      dispatch(fetchCustomersSuccess(r.data.content));
    })
    .catch(e => {
      let error = 'Network error';
      if (e.response) {
        error = e.response.data.message;
      }
      dispatch(fetchCustomersFail(error));
    });
  };
}
