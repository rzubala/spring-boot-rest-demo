import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import LeftDrawer from './LeftDrawer/LeftDrawer';
import TopToolbar from './TopToolbar/TopToolbar';

import './Layout.css';

class Layout extends Component {

    state = {
        logout: null,
        leftDrawer: false
    };

    toggleDrawer = open => {
        this.setState({
            leftDrawer: open
        });        
    };

    handleLogout = () => {
        this.setState({logout: true});
    }

    render() {        
        let redirect = null;
        if (this.state.logout) {             
            redirect = <Redirect to ="/logout" />
        }
        return (
            <div className="LayoutRoot">
              {redirect}
              <TopToolbar onToggle={this.toggleDrawer} onLogout={this.handleLogout} />
              <LeftDrawer open={this.state.leftDrawer} onToggle={this.toggleDrawer} onLogout={this.handleLogout} />
              <main>
                {this.props.children}
              </main>
            </div>
        );
    }
}

export default Layout;