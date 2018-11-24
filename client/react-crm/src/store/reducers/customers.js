import * as actionTypes from './actionTypes';

const initialState = {
  customers: null,
  loading: false,
  error: null;
}

customerFetchStart = (state, action) => {
  return {
    ...state,
    loading: true,
    customers: null,
    error: null
  };
}

customerFetchSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    customers: action.customers
  };
}

customerFetchFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error
  };
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CUSTOMERS_FETCH_START: customerFetchStart(state, action);
    case actionTypes.CUSTOMERS_FETCH_SUCCESS: customerFetchSuccess(state, action);
    case actionTypes.CUSTOMERS_FETCH_FAIL: customerFetchFail(state, action);
    default:;
  }
  return state;
}
