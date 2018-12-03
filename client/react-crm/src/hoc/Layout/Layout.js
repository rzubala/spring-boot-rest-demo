import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import './Layout.css';

class Layout extends Component {

    state = {
        left: false,
        anchorEl: null
    };

    toggleDrawer = open => () => {
        this.setState({
          left: open
        });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    render() {
        const sideList = (
            <div className="LayoutList">
              <List>
                  <ListItem button key="Profile">
                    <ListItemIcon><AccountCircle /></ListItemIcon>
                    <ListItemText primary="Profile" />
                  </ListItem>
              </List>
              <Divider />
              <List>
                  <ListItem button key="Logout">
                    <ListItemIcon><LogoutIcon /></ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItem>
              </List>
            </div>
        );

        const anchorEl = this.state.anchorEl;
        const open = Boolean(anchorEl);

        return (
            <div className="LayoutRoot">
              <AppBar position="static">
                <Toolbar>
                    <IconButton className="LayoutMenuButton" color="inherit" onClick={this.toggleDrawer(true)}>
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
                        open={open} 
                        onClose={this.handleClose}
                        >
                        <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                        <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
              </AppBar>
              <Drawer open={this.state.left} onClose={this.toggleDrawer(false)}>
                <div
                    tabIndex={0}
                    role="button"
                    onClick={this.toggleDrawer(false)}
                    onKeyDown={this.toggleDrawer(false)}
                >
                  {sideList}
                </div>
              </Drawer>
              <main>
                {this.props.children}
              </main>
            </div>
        );
    }
}

export default Layout;