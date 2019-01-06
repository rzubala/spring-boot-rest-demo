import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Redirect } from 'react-router';
import Button from '@material-ui/core/Button';

import Roles from '../../components/UI/Roles/Roles';
import { buildTokenConfig } from '../../store/actions/customers';
import axios from '../../axios-crm';
import CustomSnackbar from '../../components/UI/CustomSnackbar/CustomSnackbar';
import withError from '../../hoc/withError/withError';
import { CUSTOMERS_PATH } from '../Customers/Customers';

import './Admin.css';

class Admin extends Component {
    state = {
        roles: null,
        users: null,
        redirectTo: null,
        infoOpen: false,
        infoType: 'success',
        infoMessage: 'Role updated succesfully'
    };

    componentDidMount = () => {
        if (!this.state.roles) {
            axios.get('/admin/roles', buildTokenConfig(this.props.token))
            .then(r => {
                const roles = r.data.map(r => r.name);
                this.setState({roles: roles});
            })
            .catch(e => {
                let error = e;
                if (e.response) {
                error = e.response.data.message;
                }
                console.log(error);
            });
        }
        if (!this.state.users) {
            axios.get('/admin/users', buildTokenConfig(this.props.token))
            .then(r => {
                const users = r.data.map(u => {
                    const roles = u.roles.map(r => r.name);
                    return {
                        ...u,
                        roles: roles
                    };
                });
                this.setState({users: users});
            })
            .catch(e => {
                let error = e;
                if (e.response) {
                error = e.response.data.message;
                }
                console.log(error);
            });
        }
    }

    onUserRole = (id, roles) => {
        var foundIndex = this.state.users.findIndex(x => x.id === id);
        if (foundIndex) {
            const user = this.state.users[foundIndex];
            const userRoles = user.roles;
            const newItems = roles.filter(x => !userRoles.includes(x));
            const deletedItems = userRoles.filter(x => !roles.includes(x));

            user.roles = roles;

            this.addRoles(newItems, user.id, true);
            this.addRoles(deletedItems, user.id, false)
        }
    }

    addRoles = (items, userId, add) => {
        if (!items) {
            return;
        }
        let url = '/admin/users/' + userId + '/roles/';
        items.forEach(role => {
            const urlRole = url + role;
            if (add) {
                axios.put(urlRole, {}, buildTokenConfig(this.props.token))
                .then(r => this.setState({infoOpen: true}))
                .catch (e => {
                    let error = e;
                    if (e.response) {
                    error = e.response.data.message;
                    }
                    console.log(error);
                });
            } else {
                axios.delete(urlRole, buildTokenConfig(this.props.token))
                .then(r => this.setState({infoOpen: true}))
                .catch (e => {
                    let error = e;
                    if (e.response) {
                    error = e.response.data.message;
                    }
                    console.log(error);
                });
            }
        });        
    }

    handleInfoClose = () => {
        this.setState({infoOpen: false});
    }

    onBack = () => {
        this.setState({redirectTo: CUSTOMERS_PATH});
    }

    render() {
        let redirect = null;
        if (this.state.redirectTo) {
            redirect = <Redirect to={this.state.redirectTo} />
        }

        return (
            <div className="Admin">
                {redirect}
                <h1 style={{textAlign: 'center'}}>Users</h1>
                <Table>
                    <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>Roles</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.users ? this.state.users.map(row => {
                        let uroles = [];
                        if (row.roles) {
                            uroles = row.roles;
                        }                       
                        return (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                            {row.id}
                            </TableCell>
                            <TableCell>{row.username}</TableCell>
                            <TableCell align="right"><Roles roles={this.state.roles} uroles={uroles} onRoleUpdated={(roles) => this.onUserRole(row.id, roles)} /></TableCell>
                        </TableRow>
                        );
                    })
                    : null}
                    </TableBody>
                </Table>

                <div className="AdminBack">
                    <Button  variant="outlined" color="secondary" onClick={this.onBack}>Back</Button>
                </div>    

                <CustomSnackbar 
                    snackbarOpen={this.state.infoOpen}
                    onSnackbarClose={this.handleInfoClose}
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

export default withError(connect(mapStateToProps)(Admin), axios);