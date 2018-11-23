import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import './Auth.css';

class Auth extends Component {

  state = {
      username: null,
      password: null,
      token: null
  };

  usernameChangedHandler(event) {
    this.setState({username: event.target.value});
  }

  passwordChangedHandler(event) {
    this.setState({password: event.target.value});
  }

  submitHandler = (event) => {
    event.preventDefault();

    axios
      .post('http://localhost:8080/api/auth/login', {
        username: this.state.username,
        password: this.state.password
      })
      .then(r => this.setState({token: r.data.token}))
      .catch(e => this.setState({token: null}));
  }

  render () {
      return (
        <div className="Auth" >
          <p>token: {this.state.token}</p>
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

export default Auth;
