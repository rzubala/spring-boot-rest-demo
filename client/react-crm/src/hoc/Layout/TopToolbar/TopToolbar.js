import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import './TopToolbar.css';

class TopToolbar extends Component {

    state = {
        anchorEl: null
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleLogout = () => {
        this.handleClose();
        this.props.onLogout();
    }

    render() {
        const anchorEl = this.state.anchorEl;
        const isOpen = Boolean(anchorEl);

        return (
            <AppBar position="static">
                <Toolbar>
                    <IconButton className="LayoutMenuButton" color="inherit" onClick={() => this.props.onToggle(true)}>
                        <MenuIcon />
                    </IconButton>

                    <div className="LayoutGrow"/>
                    <div className="LayoutRightMenu">
                        <IconButton onClick={this.handleMenu} color="inherit">
                            <AccountCircle />
                        </IconButton>
                        <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={isOpen} 
                        onClose={this.handleClose}
                        >
                        <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                        <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        );
    }
}

export default TopToolbar;