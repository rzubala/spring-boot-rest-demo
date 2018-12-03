import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import './Layout.css';

class Layout extends Component {

    handleClose = () => {

    }

    render() {

        let open = false

        return (
            <div className="LayoutRoot">
              <AppBar position="static">
                <Toolbar>
                    <IconButton className="LayoutMenuButton" color="inherit">
                        <MenuIcon />
                    </IconButton>
                    <div className="LayoutGrow"/>
                    <div>
                        <IconButton
                        onClick={this.handleMenu}
                        color="inherit"
                        >
                        <AccountCircle />
                        </IconButton>
                        <Menu
                        id="menu-appbar"
                        /* anchorEl={anchorEl} */
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open} 
                        onClose={this.handleClose}
                        >
                        <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                        <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
              </AppBar>
              <main>
                {this.props.children}
              </main>
            </div>
        );
    }
}

export default Layout;