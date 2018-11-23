import React, { Component } from 'react';
import axios from 'axios';

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
          <form onSubmit={this.submitHandler}>
            <input className="AuthInput" value={this.state.username} onChange={event => this.usernameChangedHandler(event)} />
            <input className="AuthInput" value={this.state.password} type='password' onChange={event => this.passwordChangedHandler(event)} />
            <button className="AuthButton" >SUBMIT</button>
          </form>
        </div>
      );
  }
}

export default Auth;
