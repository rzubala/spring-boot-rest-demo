import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Redirect } from 'react-router';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import TextField from '@material-ui/core/TextField';
import axios from '../../axios-crm';
import { buildTokenConfig } from '../../store/actions/customers';

import { CUSTOMERS_PATH } from '../Customers/Customers';

import './Profile.css';

const LOGIN = 'login';
const PASSWORD = 'password';
const PASSWORD2 = 'password2';
const EMAIL = 'email';
const PHONE = 'phone';

class Profile extends Component {

    state = {
        redirectTo: null,
        username: "",
        password: "",
        password2: "",
        email: "",
        phone: ""
    }

    submitHandler = (event) => {
        event.preventDefault();

        if (this.state.password !== this.state.password2) {
            
            return;
        }
    }

    componentDidMount = () => {
        axios.get('/auth/profile', buildTokenConfig(this.props.token))
            .then (r => console.log(r.data))
            .catch (e => {
                let error = e;
                if (e.response) {
                  error = e.response.data.message;
                }
                console.log(error);          
            })
    }

    onFieldChange = (event, type) => {
        this.setState({
            ...this.state,
            [type]: event.target.value
        });
    }

    onCancel = () => {
        this.setState({redirectTo: CUSTOMERS_PATH})
    }

    render() {

        let redirect = null
        if (this.state.redirectTo) {
            redirect = <Redirect to={this.state.redirectTo} />
        }

        return (
            <div className="Profile">
                <h1>Profile</h1>
                {redirect}
                <form className="ProfileForm" onSubmit={this.submitHandler}>                   

                    <TextField
                        id="login"
                        label="Login"
                        className="ProfileInput"
                        value={this.state.login}
                        // onChange={(event) => this.onFieldChange(event, LOGIN)}
                        // autoComplete="login"
                        margin="normal" 
                        InputProps={{
                            readOnly: true,
                        }}
                        />

                    <TextField
                        required
                        id="password"
                        label="Password"
                        className="ProfileInput"
                        type="password"
                        value={this.state.password}
                        onChange={(event) => this.onFieldChange(event, PASSWORD)}
                        autoComplete="current-password"
                        margin="normal" />

                    <TextField
                        required
                        id="password2"
                        label="Repeat password"
                        className="ProfileInput"
                        type="password"
                        value={this.state.password}
                        onChange={(event) => this.onFieldChange(event, PASSWORD2)}
                        autoComplete="current-password"
                        margin="normal" />

                    <TextField
                        required
                        id="e-mail"
                        label="E-mail"
                        className="ProfileInput"
                        type="email"
                        value={this.state.email}
                        onChange={(event) => this.onFieldChange(event, EMAIL)}
                        autoComplete="email"
                        margin="normal" />

                    <TextField
                        id="phone"
                        label="Phone"
                        className="ProfileInput"
                        type="phone"
                        value={this.state.phone}
                        onChange={(event) => this.onFieldChange(event, PHONE)}
                        autoComplete="phone"
                        margin="normal" />
                        
                    <div className="ProfileButtons">
                        <div className="ProfileButton" >
                            <Button variant="contained" color="primary" style={{width: '100%'}} type="submit">
                                <SaveIcon className="IconMargin" />Save
                            </Button>
                        </div>
                        <div className="ProfileButton">
                            <Button variant="contained" onClick={this.onCancel} >
                                <CancelIcon className="IconMargin" />Cancel
                            </Button>
                        </div>          
                    </div>
                </form>    
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    };
}

export default connect(mapStateToProps)(Profile);