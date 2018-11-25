import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

import './Customer.css';

class Customer extends Component {

    state = {
        show: true,
        currentId: null
    }

    onCancel = () => {
        this.setState({show: false});
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            currentId: this.props.match.params.customerId,
            show: true
        });
    }

    submitHandler = (event) => {
        event.preventDefault();

        this.setState({
            currentId: null,
            show: false
        });
    }

    render() {
        if (!this.state.show) {
            return null;
        }
        return (
            <div className="Customer">
            <h1>Customer: {this.props.match.params.customerId}</h1>
            <form onSubmit={this.submitHandler}>
                <Input className="CustomerInput" placeholder="First name" />
                <Input className="CustomerInput" placeholder="Last name" />
                <Input className="CustomerInput" placeholder="E-mail" />
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
}

export default Customer;