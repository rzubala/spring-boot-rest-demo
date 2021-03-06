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
import CustomSnackbar from '../../components/UI/CustomSnackbar/CustomSnackbar';
import withError from '../../hoc/withError/withError';

import { CUSTOMERS_PATH } from '../Customers/Customers';

import './Profile.css';

const USERNAME = 'username';
const PASSWORD = 'password';
const PASSWORD2 = 'password2';

class Profile extends Component {

    constructor(props) {
        super(props);
        const updatedState = {
            ...this.state,
            register: props.register,
        };        
        this.state = updatedState;
    }    

    componentWillReceiveProps = (nextProps) => {
        this.setState({register: nextProps.register});
    }

    state = {
        infoOpen: false,
        infoMessage: "",
        infoType: "error",
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
            username: {
                required: true, 
                minLength: 3,
                errorText: "Username should have at least 3 characters"
            },
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
            username: "",
            password: "",
            password2: "",
            email: "",
            phone: ""
        },
        fields: {
            username: {
                id: "login",
                label: "Login",
                type: "text",
                autoComplete: "username"
            },
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
        if (this.state.register) {
            axios.post('/auth/signup', this.state.user)
                .then(r => this.setState({redirectTo: "/"}))
                .catch(e => {
                    let errorState;
                    if (e.response) {
                        errorState = this.mapValidationError(e.response.data);
                    }
                    if (errorState) {
                        this.setState({
                            infoOpen: true,
                            infoType: "error",
                            infoMessage: e.response.data[0].message,
                            error: errorState
                        });
                    } else {
                        console.log(e);
                    }
                })
        } else {
            axios.put('/auth/profile', this.state.user, buildTokenConfig(this.props.token))
                .then(r => this.setState({redirectTo: CUSTOMERS_PATH}))
                .catch(e => {
                    let error = e;
                    if (e.response.data) {
                        const errorState = this.mapValidationError(e.response.data);
                        this.setState({error: errorState});
                        return;
                    }
                    console.log(error);          
                })
        }
    }

    mapValidationError = (errordata) => {
        let errorState = {...this.state.error};
        errordata.forEach(d => {
            errorState = {
                ...errorState,
                [d.field]: d.message
            }
        });                        
        return errorState;
    }

    componentDidMount = () => {
        if (this.state.register) {
            return;
        }
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
                        username: "",
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
        if (this.state.register) {
            this.setState({redirectTo: "/"});
        } else {
            this.setState({redirectTo: CUSTOMERS_PATH});
        }
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

    handleClose = () => {
        this.setState({ infoOpen: false });
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
            if (!this.state.register && type === USERNAME) {
                return (
                    <TextField
                    key={this.state.fields[type].id}
                    id="login"
                    label="Login"
                    className="ProfileInput"
                    value={this.state.user.username}
                    margin="normal" 
                    autoComplete="username"
                    InputProps={{
                        readOnly: true,
                    }}
                    />
                );
            }
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
                {this.state.register ? <h1>Register</h1> : <h1>Profile</h1>}                
                {redirect}
                <form className="ProfileForm" onSubmit={this.submitHandler}>                   


                    {inputs}    
                      
                    <div className="ProfileButtons">
                        <div className="ProfileButton" >
                            <Button variant="contained" disabled={this.isError()} color="primary" style={{width: '100%'}} type="submit">
                                <SaveIcon className="IconMargin" />{this.state.register? "Signup" : "Save"}
                            </Button>
                        </div>
                        <div className="ProfileButton">
                            <Button variant="contained" onClick={this.onCancel} >
                                <CancelIcon className="IconMargin" />Cancel
                            </Button>
                        </div>          
                    </div>
                </form>    

                <CustomSnackbar 
                    snackbarOpen={this.state.infoOpen}
                    onSnackbarClose={this.handleClose}
                    variant={this.state.infoType}
                    message={this.state.infoMessage}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    };
}

export default withError(connect(mapStateToProps)(Profile), axios);