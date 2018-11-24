import * as actionTypes from './../actions/actionTypes';

const initialState = {
  customers: null,
  loading: false,
  error: null
}

const customerFetchStart = (state, action) => {
  return {
    ...state,
    loading: true,
    customers: null,
    error: null
  };
}

const customerFetchSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    customers: action.customers
  };
}

const customerFetchFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error
  };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CUSTOMERS_FETCH_START: return customerFetchStart(state, action);
    case actionTypes.CUSTOMERS_FETCH_SUCCESS: return customerFetchSuccess(state, action);
    case actionTypes.CUSTOMERS_FETCH_FAIL: return customerFetchFail(state, action);
    default:;
  }
  return state;
}

export default reducer;
