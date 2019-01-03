import React, { Component } from 'react';

import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

import './Roles.css';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

class Roles extends Component {

    state = {
        urole: [],
        roles: null
    };

    constructor(props) {
        super(props);
        const updatedState = {
            ...this.state,
            roles: props.roles,
            urole: props.uroles
        };        
        this.state = updatedState;
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            roles: nextProps.roles,
            urole: nextProps.uroles
        });
    }

    handleChange = event => {
        this.setState({ urole: event.target.value });
        this.props.onRoleUpdated(event.target.value)
    };

    render() {
        return (
        <div className="RolesRoot">
            <FormControl className="RolesFormControl">
                <Select
                    multiple
                    value={this.state.urole}
                    onChange={this.handleChange}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={selected => (
                        <div className="RolesChips">
                            {selected.map(value => (
                                <Chip key={value} label={value} className="RolesChip" />
                            ))}
                        </div>
                    )}
                    MenuProps={MenuProps}
                >
                    {this.state.roles ? this.state.roles.map(name => (
                        <MenuItem key={name} value={name}>
                            {name}
                        </MenuItem>
                    ))
                        : null}
                </Select>
            </FormControl>
        </div>);
    }
}

export default Roles;