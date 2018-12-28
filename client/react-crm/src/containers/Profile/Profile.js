import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Redirect } from 'react-router';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import TextField from '@material-ui/core/TextField';
import axios from '../../axios-crm';
import { buildTokenConfig } from '../../store/actions/customers';
import { checkValidity } from '../../shared/utils';

import { CUSTOMERS_PATH } from '../Customers/Customers';

import './Profile.css';

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
        phone: "",
        email: "",
        error: {
            password: "",
            password2: "",
            email: "",
            phone: ""
        }
    }

    submitHandler = (event) => {
        event.preventDefault();
        if (this.state.password !== this.state.password2) {            
            return;
        }
    }

    componentDidMount = () => {
        axios.get('/auth/profile', buildTokenConfig(this.props.token))
            .then (r => {
                console.log(r.data)
                this.setState({                    
                    username: r.data.username,
                    userId: r.data.userId,
                    email: 'todo@todo.pl',
                    phone: '997',
                    error: {
                        password: "Password can not be empty",
                        password2: "",
                        email: "",
                        phone: ""
                    }
                });
            })
            .catch (e => {
                let error = e;
                if (e.response) {
                  error = e.response.data.message;
                }
                console.log(error);          
            })
    }

    onFieldChange = (event, type) => {        
        let errorText = "";
        if (type === PASSWORD || type === PASSWORD2) {
            if (!checkValidity(event.target.value, {required: true, minLength: 6})) {
                errorText = "Password should have at least 6 characters";
            } else {
                let p1, p2;
                if (type === PASSWORD) {
                    p1 = event.target.value;
                    p2 = this.state.password2; 
                } else {
                    p2 = event.target.value;
                    p1 = this.state.password; 
                }
                if (p1 !== p2) {
                    errorText = "Passwords must match";
                }
            }
        } else if (type === EMAIL) {
            if (!checkValidity(event.target.value, {required: true, isEmail: true})) {
                errorText = "Wrong email";
            }
        } else if (type === PHONE) {
            if (!checkValidity(event.target.value, {isPhone: true})) {
                errorText = "Wrong phone";
            }
        }

        this.setState({
            [type]: event.target.value,
            error: {
                ...this.state.error,
                [type]: errorText
            }
        });
    }

    onCancel = () => {
        this.setState({redirectTo: CUSTOMERS_PATH})
    }

    isError = () => {
        const error = this.state.error.password.length !== 0 
            || this.state.error.password2.length !== 0
            || this.state.error.phone.length !== 0
            || this.state.error.email.length !== 0;
        return error;
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
                        value={this.state.username}
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
                        helperText={this.state.error.password}
                        error={this.state.error.password.length === 0 ? false : true}
                        autoComplete="current-password"
                        margin="normal" />

                    <TextField
                        required
                        id="password2"
                        label="Repeat password"
                        className="ProfileInput"
                        type="password"
                        value={this.state.password2}
                        onChange={(event) => this.onFieldChange(event, PASSWORD2)}
                        helperText={this.state.error.password}
                        error={this.state.error.password.length === 0 ? false : true}
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
                        helperText={this.state.error.email}
                        error={this.state.error.email.length === 0 ? false : true}
                        autoComplete="email"
                        margin="normal" />

                    <TextField
                        id="phone"
                        label="Phone"
                        className="ProfileInput"
                        type="phone"
                        value={this.state.phone}
                        onChange={(event) => this.onFieldChange(event, PHONE)}
                        helperText={this.state.error.phone}
                        error={this.state.error.phone.length === 0 ? false : true}
                        autoComplete="phone"
                        margin="normal" />
                        
                    <div className="ProfileButtons">
                        <div className="ProfileButton" >
                            <Button variant="contained" disabled={this.isError()} color="primary" style={{width: '100%'}} type="submit">
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