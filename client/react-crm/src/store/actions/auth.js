import * as actionTypes from './actionTypes';
import axios from './../../axios-crm';

export const loginStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
};

export const loginSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId
  }
};

export const loginFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
};

export const login = (username, password) => {
  return dispatch => {
    axios
      .post('/auth/login', {
        username: username,
        password: password
      })
      .then(r => dispatch(loginSuccess(r.data.token, r.data.userId)))
      .catch(e => dispatch(loginFail(e.response.data.error)));
  }
};
