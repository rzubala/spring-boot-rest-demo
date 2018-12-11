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
    dispatch(loginStart());
    axios
      .post('/auth/login', {
        username: username,
        password: password
      })
      .then(r => {
        const expirationDate = new Date(new Date().getTime() + r.data.expiredIn);
        localStorage.setItem('token', r.data.token);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', r.data.userId);
  
        dispatch(loginSuccess(r.data.token, r.data.userId))
        dispatch(authTimeout(r.data.expiredIn));
      })
      .catch(e => {
        let error = 'Network error';
        if (e.response) {
          error = e.response.data.message;
        }
        dispatch(loginFail(error))
      });
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT
  };
}

export const authTimeout = (expirationTime) => {
  return dispatch => {    
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

export const tryAutoLogin = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
      return;
    }
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    if (expirationDate <= new Date()) {
      dispatch(logout());
    } else {
      const userId = localStorage.getItem('userId');      
      dispatch(loginSuccess(token, userId))
      dispatch(authTimeout(expirationDate.getTime() - new Date().getTime()));
    }
  }
}