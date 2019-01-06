import React, { Component } from 'react';
import CustomSnackbar from '../../components/UI/CustomSnackbar/CustomSnackbar';
import Aux from '../Aux/Aux';

const withError = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        handleClose = () => {
            this.setState({ 
                error: null
             });
        }

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ 
                    error: null 
                });
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ 
                    error: error 
                });
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        render() {
            return (
                <Aux>
                    <WrappedComponent {...this.props} />
                    <CustomSnackbar
                        snackbarOpen={this.state.error ? true : false}
                        onSnackbarClose={this.handleClose}
                        variant="error"
                        message={this.state.error ? this.state.error.message : ''}
                    />
                </Aux>
            )
        }
    }
}

export default withError;