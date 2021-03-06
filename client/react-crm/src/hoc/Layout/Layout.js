import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import LeftDrawer from './LeftDrawer/LeftDrawer';
import TopToolbar from './TopToolbar/TopToolbar';

import './Layout.css';

class Layout extends Component {

    state = {
        path: null,
        leftDrawer: false
    };

    toggleDrawer = open => {
        this.setState({
            leftDrawer: open
        });        
    };

    handleLogout = () => {
        this.setState({path: '/logout'});
    }

    handleProfile = () => {
        this.setState({path: '/profile'});
    }

    handleAdmin = () => {
        this.setState({path: '/admin'});
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({path: null});
    }

    render() {        
        let redirect = null;
        if (this.state.path) {             
            redirect = <Redirect to ={this.state.path} />
        }
        return (
            <div className="LayoutRoot">
              {redirect}
              <TopToolbar admin={this.props.admin} onToggle={this.toggleDrawer} onLogout={this.handleLogout} onProfile={this.handleProfile} onAdmin={this.handleAdmin} />
              <LeftDrawer admin={this.props.admin} open={this.state.leftDrawer} onToggle={this.toggleDrawer} onLogout={this.handleLogout} onProfile={this.handleProfile} onAdmin={this.handleAdmin} />
              <main>
                {this.props.children}
              </main>
            </div>
        );
    }
}

export default Layout;