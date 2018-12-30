import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { connect } from 'react-redux';
import * as actions from './../../../store/actions/index';

import './Customer.css';

import { CUSTOMERS_PATH } from './../Customers';

const FIRST_NAME = 'firstName';
const LAST_NAME = 'lastName';
const EMAIL = 'email';

class Customer extends Component {

    constructor(props) {
        super(props);
        const updatedState = this.fillCustomer(props);
        this.state = updatedState;
    }    

    componentWillReceiveProps = (nextProps) => {
        const updatedState = this.fillCustomer(nextProps);
        this.setState(updatedState);
    }

    fillCustomer = (nextProps) => {
        let updatedState = {
            customer: null
        };
        let customerObject = null;
        let id = nextProps.match.params.customerId;
        if (id === 'new') {
            customerObject = {
                firstName: '',
                lastName: '',
                email: '',
                id: null
            }
        } else {
            id = +id; 
            customerObject = nextProps.customers.find(c => {
                return c.id === id;
            });
        }
        if (customerObject) {
            updatedState = {
                customer: {
                    ...customerObject
                }                
            };
        }
        return updatedState;
    }

    submitHandler = (event) => {
        event.preventDefault();
        if (this.state.customer.id) {
            this.props.onCustomerUpdate(this.props.token, this.state.customer);
        } else {
            this.props.onCustomerCreate(this.props.token, this.state.customer);
        }
        this.goBackToCustomers();
    }

    onCancel = () => {
        this.goBackToCustomers();
    }

    goBackToCustomers = () => {
        this.props.history.replace(CUSTOMERS_PATH);
    }

    onFieldChange = (event, type) => {
        this.setState({
            ...this.state,
            customer: {
                ...this.state.customer,
                [type]: event.target.value
            }
        });
    }

    render() {
        let customerRender = <div><h1>Customer</h1></div>;
        if (this.state.customer) {
            customerRender = (
                <div>
                    <h1 style={{textAlign: "center"}}>Customer: {this.state.customer.id}</h1>
                    <form onSubmit={this.submitHandler}>
                        <Input className="CustomerInput" autoComplete='given-name' placeholder="First name" value={this.state.customer.firstName} onChange={(event) => this.onFieldChange(event, FIRST_NAME)}/>
                        <Input className="CustomerInput" autoComplete='family-name' placeholder="Last name"  value={this.state.customer.lastName} onChange={(event) => this.onFieldChange(event, LAST_NAME)}/>
                        <Input className="CustomerInput" autoComplete='email' placeholder="E-mail" value={this.state.customer.email} onChange={(event) => this.onFieldChange(event, EMAIL)}/>
                        <div className="CustomerButtons">
                            <div className="CustomerButton" >
                                <Button variant="contained" color="primary" style={{width: '100%'}} type="submit">
                                    <SaveIcon className="IconMargin" />Save
                                </Button>
                            </div>
                            <div className="CustomerButton">
                                <Button variant="contained" onClick={this.onCancel} >
                                    <CancelIcon className="IconMargin" />Cancel
                                </Button>
                            </div>          
                        </div>
                    </form>    
                </div>
            );
        }
        return (
            <div className="Customer">
                {customerRender}
            </div>
            );
    }
}

const mapStatToProps = state => {
    return {
        customers: state.customers.customers,
        token: state.auth.token
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onCustomerUpdate: (token, customer) => dispatch(actions.updateCustomer(token, customer)),
        onCustomerCreate: (token, customer) => dispatch(actions.createCustomer(token, customer))
    }
}

export default connect(mapStatToProps, mapDispatchToProps)(Customer);