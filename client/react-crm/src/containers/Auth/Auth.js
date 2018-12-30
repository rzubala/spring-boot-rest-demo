import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from './../../store/actions/index';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import './Auth.css';

class Auth extends Component {

  state = {
      username: "",
      password: "",
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

  focusUsernameInputField = input => {
    input && input.focus();
  };

  render () {
      let redirect = null;
      if (this.props.token) {
        redirect = <Redirect to ="/customers" />
      }
      let error = null;
      if (this.props.error) {
        error = <p>error: {this.props.error}</p>
      }
      return (
        <div className="Auth" >
          {redirect}
          {error}
          <h1>CRM demo</h1>
          <form className="AuthForm" onSubmit={this.submitHandler}>
            <TextField
              inputRef={this.focusUsernameInputField}
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
              autoComplete="password"
            />
            <div className="AuthButtons">
              <Button className="AuthButton" variant="outlined" color="primary" type="submit">SUBMIT</Button>
              <Button className="AuthButton" variant="outlined" color="secondary">Register</Button>
            </div>
          </form>
          <div className="AuthAuthor">
            <div>
              <span style={{fontSize: "16px"}}>Created by: </span><a href="mailto:rafal@zubala.com" style={{fontSize: "16px"}}>Rafał Zubala</a>
            </div>              
            <div>
              Visit me at: <a href="http://rafal.zubala.com">rafal.zubala.com</a>
            </div>
          </div>
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
