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

    componentWillReceiveProps = (nextProps) => {
        this.setState({path: null});
    }

    render() {        
        let redirect = null;
        if (this.state.path) {             
            redirect = <Redirect to ={this.state.path} />
            console.log('layout',this.state.path);
        }
        return (
            <div className="LayoutRoot">
              {redirect}
              <TopToolbar onToggle={this.toggleDrawer} onLogout={this.handleLogout} onProfile={this.handleProfile} />
              <LeftDrawer open={this.state.leftDrawer} onToggle={this.toggleDrawer} onLogout={this.handleLogout} onProfile={this.handleProfile} />
              <main>
                {this.props.children}
              </main>
            </div>
        );
    }
}

export default Layout;