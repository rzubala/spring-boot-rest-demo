import React, { Component } from 'react';

import { Redirect } from 'react-router';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

import { CUSTOMERS_PATH } from '../Customers/Customers';

import './Profile.css';

class Profile extends Component {

    state = {
        redirectTo: null
    }

    submitHandler() {

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
                <form onSubmit={this.submitHandler}>                   
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

export default Profile;