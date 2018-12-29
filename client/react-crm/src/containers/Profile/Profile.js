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

class Profile extends Component {

    state = {
        redirectTo: null,
        user: {
            id: "",
            username: "",
            password: "",
            password2: "",
            phone: "",
            email: ""
        },
        rules: {
            password: {
                required: true, 
                minLength: 6,
                errorText: "Password should have at least 6 characters"
            },
            password2: {
                required: true, 
                minLength: 6,
                errorText: "Password should have at least 6 characters"
            },
            email: {
                required: true, 
                isEmail: true,
                errorText: "Wrong email"
            },
            phone: {
                required: false,
                isPhone: true,
                errorText: "Wrong phone"
            }
        },
        error: {
            password: "",
            password2: "",
            email: "",
            phone: ""
        },
        fields: {
            password: {
                id: "password",
                label: "Password",
                type: "password",
                autoComplete: "current-password"
            },
            password2: {
                id: "password2",
                label: "Repeat password",
                type: "password",
                autoComplete: "current-password"
            },
            email: {
                id: "e-mail",
                label: "E-mail",
                type: "email",
                autoComplete: "email"
            },
            phone: {
                id: "phone",
                label: "Phone",
                type: "phone",
                autoComplete: "phone"
            }
        }
    }

    submitHandler = (event) => {
        event.preventDefault();
        axios.put('/auth/profile', this.state.user, buildTokenConfig(this.props.token))
            .then(r => this.setState({redirectTo: CUSTOMERS_PATH}))
            .catch(e => {
                let error = e;
                if (e.response) {
                  error = e.response.data.message;
                }
                console.log(error);          
            })
    }

    componentDidMount = () => {
        axios.get('/auth/profile', buildTokenConfig(this.props.token))
            .then (r => {
                const user = {
                    id: r.data.id,
                    username: r.data.username,
                    email: r.data.email,
                    phone: r.data.phone,
                    password: "",
                    password2: ""
                }
                this.setState({                    
                    user: user,
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
        const user = {
            ...this.state.user,
            [type]: event.target.value
        }
        let errorText = "";
        const rules = this.state.rules[type];
        if (!checkValidity(event.target.value, rules)) {
            errorText = rules.errorText;
        }    
        let error = {
            ...this.state.error,
            [type]: errorText
        }

        if (errorText.length === 0 && (type === PASSWORD || type === PASSWORD2)) {            
            let p1, p2;
            let otherPass;
            if (type === PASSWORD) {
                p1 = event.target.value;
                p2 = this.state.user.password2; 
                otherPass = PASSWORD2;
            } else {
                p2 = event.target.value;
                p1 = this.state.user.password; 
                otherPass = PASSWORD;
            }
            if (p1 !== p2) {
                errorText = "Passwords must match";                    
                error = {
                    ...error,
                    [PASSWORD]: errorText,
                    [PASSWORD2]: errorText
                };
            } else {
                let otherPassText = ""
                if (!checkValidity(this.state.user[otherPass], this.state.rules[otherPass])) {
                    otherPassText = this.state.rules[otherPass].errorText;
                }       
                error = {
                    ...error,
                    [type]: errorText,
                    [otherPass]: otherPassText
                }
            }    
        }
        this.setState({
            user: user,
            error: error,                
        });
    }

    onCancel = () => {
        this.setState({redirectTo: CUSTOMERS_PATH})
    }

    isError = () => {
        const errors = [];
        for (let elerr in this.state.fields) {
            errors.push(elerr);
        }
        const result = errors.reduce((res, el) => {
            return this.state.error[el].length !== 0 | res;
        }, false)
        return (result > 0);
    }

    render() {

        let redirect = null
        if (this.state.redirectTo) {
            redirect = <Redirect to={this.state.redirectTo} />
        }

        let fields = []
        for (let el in this.state.fields) {
            fields.push(el);
        }

        let inputs = fields.map(type => {
            return (
                <TextField
                key={this.state.fields[type].id}
                required={this.state.rules[type].required}
                id={this.state.fields[type].id}
                label={this.state.fields[type].label}
                type={this.state.fields[type].type}
                autoComplete={this.state.fields[type].autoComplete}
                className="ProfileInput"                
                value={this.state.user[type]}                        
                onChange={(event) => this.onFieldChange(event, type)}
                helperText={this.state.error[type]}
                error={this.state.error[type].length === 0 ? false : true}
                margin="normal" />);
        });

        return (
            <div className="Profile">
                <h1>Profile</h1>
                {redirect}
                <form className="ProfileForm" onSubmit={this.submitHandler}>                   

                    <TextField
                        id="login"
                        label="Login"
                        className="ProfileInput"
                        value={this.state.user.username}
                        margin="normal" 
                        InputProps={{
                            readOnly: true,
                        }}
                        />
                    {inputs}    
                      
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