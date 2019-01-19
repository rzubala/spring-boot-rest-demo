import * as actionTypes from './../actions/actionTypes';

const initialState = {
  customers: null,
  loading: false,
  error: null,
  total: 0,
  page: 0,
  rowsPerPage: 5,
  order: 'asc'
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
    customers: action.customers,
    total: action.total,
    page: action.page,
    rowsPerPage: action.rowsPerPage,
    order: action.order
  };
}

const customerFetchFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error
  };
}

const customerUpdateSuccess = (state, action) => {
  const customer = action.data;
  const create = action.create;
  let newCustomers;
  if (create) {
    const newCustomer = {
      ...customer
    };
    newCustomers = [
      ...state.customers,
      newCustomer
    ];
    console.log(newCustomers);
  } else {
    newCustomers = state.customers.map(e => {
      if (e.id !== customer.id) {
        return e;
      } else {
        return {
          ...customer
        };
      }
    });
  }
  return {
    ...state,
    customers: newCustomers
  };
}

const customerDeleteSuccess = (state, action) => {
  const id = action.id;
  const newCustomers = state.customers.filter(e => {
    return (e.id !== id);
  });
  return {
    ...state,
    customers: newCustomers
  };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CUSTOMERS_FETCH_START: return customerFetchStart(state, action);
    case actionTypes.CUSTOMERS_FETCH_SUCCESS: return customerFetchSuccess(state, action);
    case actionTypes.CUSTOMERS_FETCH_FAIL: return customerFetchFail(state, action);
    case actionTypes.CUSTOMERS_UPDATE_SUCCESS: return customerUpdateSuccess(state, action);
    case actionTypes.CUSTOMERS_DELETE_SUCCESS: return customerDeleteSuccess(state, action);
    default:;
  }
  return state;
}

export default reducer;
