import React, { Component } from 'react';

import './Customer.css';

class Customer extends Component {
    render() {
        return (
            <div className="Customer">
            <h1>Customer: {this.props.match.params.customerId}</h1>
            </div>
        );
    }
}

export default Customer;