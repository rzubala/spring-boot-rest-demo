import React from 'react';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import Drawer from '@material-ui/core/Drawer';
import AccountCircle from '@material-ui/icons/AccountCircle';

import Aux from '../../../hoc/Aux/Aux'

import './LeftDrawer.css';

const leftDrawer = (props) => {
    const sideList = (
        <div className="LayoutList">
            <List>
                <ListItem button key="Profile" onClick={props.onProfile}>
                <ListItemIcon><AccountCircle /></ListItemIcon>
                <ListItemText primary="Profile" />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button key="Logout" onClick={props.onLogout}>
                <ListItemIcon><LogoutIcon /></ListItemIcon>
                <ListItemText primary="Logout" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <Aux>
            <Drawer open={props.open} onClose={() => props.onToggle(false)}>
            <div
                tabIndex={0}
                role="button"
                onClick={() => props.onToggle(false)}
                onKeyDown={() => props.onToggle(false)}
            >
                {sideList}
            </div>
            </Drawer>
        </Aux>    
    );
};

export default leftDrawer;