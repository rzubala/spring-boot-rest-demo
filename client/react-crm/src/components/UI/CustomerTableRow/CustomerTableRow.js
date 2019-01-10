import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Collapse from '@material-ui/core/Collapse';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

class CustomerTableRow extends Component {
    state = {
        expanded: false,
    };

    render() {
        const row = this.props.row;

        const noSpace = {
            margin: '0px',
            padding: '0px',
            boxSizing: 'border-box',
            textDecoration: 'none',
            fontSize: '0px'
        };

        if (this.props.narrow) {
            return (
                <React.Fragment>
                    <TableRow key={row.id}>
                        <TableCell component="th" scope="row">{row.firstName}</TableCell>
                        <TableCell>{row.lastName}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>
                            <IconButton>
                                <Link style={noSpace} to={{ pathname: this.props.pathname }}>
                                    <EditIcon color="primary" />
                                </Link>
                            </IconButton>
                            <IconButton onClick={() => this.props.onDeleteRow(row.id)}>
                                <DeleteIcon color="primary" />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>
                            <Collapse in={true} unmountOnExit={true}>Created at: {row.createdAt}</Collapse>
                        </TableCell>
                        <TableCell colSpan={2}>
                            <Collapse in={true} unmountOnExit={true}>Updated at: {row.updatedAt}</Collapse>
                        </TableCell>
                    </TableRow>
                </React.Fragment>
            );
        } else {
            return (
                <TableRow key={row.id}>
                    <TableCell component="th" scope="row">{row.firstName}</TableCell>
                    <TableCell>{row.lastName}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.createdAt}</TableCell>
                    <TableCell>{row.updatedAt}</TableCell>
                    <TableCell>
                        <IconButton>
                            <Link style={noSpace} to={{ pathname: this.props.pathname }} >
                                <EditIcon color="primary" />
                            </Link>
                        </IconButton>
                        <IconButton onClick={() => this.props.onDeleteRow(row.id)}>
                            <DeleteIcon color="primary" />
                        </IconButton>
                    </TableCell>
                </TableRow>
            );
        }

    }
};

export default CustomerTableRow;