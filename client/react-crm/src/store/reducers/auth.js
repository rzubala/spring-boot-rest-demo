import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  userId: null,
  error: null
};

const authStart = (state, action) => {
  return {
    ...state,
    token: null,
    userId: null,
    error: null
  };
};

const authSuccess = (state, action) => {
  return {
    ...state,
    token: action.token,
    userId: action.userId
  };
};

const authFail = (state, action) => {
  return {
    ...state,
    error: action.error
  };
};

const authLogout = (state, action) => {
  return {
    ...state,
    token: null,
    userId: null,
    error: null  
  }
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.AUTH_START: return authStart(state, action);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    default:;
  };
  return state;
};

export default reducer;
