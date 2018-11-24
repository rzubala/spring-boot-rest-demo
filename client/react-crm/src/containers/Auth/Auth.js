import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../../store/actions/index';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import './Auth.css';

class Auth extends Component {

  state = {
      username: null,
      password: null,
  };

  usernameChangedHandler(event) {
    this.setState({username: event.target.value});
  }

  passwordChangedHandler(event) {
    this.setState({password: event.target.value});
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onLogin(this.state.username, this.state.password);
  }

  render () {
      let token = null;
      if (this.props.token) {
        token = <p>token: {this.props.token}</p>
      }
      let error = null;
      if (this.props.error) {
        error = <p>error: {this.props.error}</p>
      }
      return (
        <div className="Auth" >
          {token}
          {error}
          <form className="AuthForm" onSubmit={this.submitHandler}>
            <TextField
              id="username"
              label="Username"
              value={this.state.username}
              onChange={event => this.usernameChangedHandler(event)}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-password-input"
              label="Password"
              value={this.state.password}
              onChange={event => this.passwordChangedHandler(event)}
              type="password"
              margin="normal"
              variant="outlined"
            />
            <Button variant="outlined" color="primary" type="submit">SUBMIT</Button>
          </form>
        </div>
      );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    error: state.auth.error    
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (username, password) => dispatch(actions.login(username, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
