import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Collapse from '@material-ui/core/Collapse';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Aux from '../../../hoc/Aux/Aux';

import './CustomerTableRow.css';

class CustomerTableRow extends Component {
    state = {
        expanded: false,
    };

    handleExpandClick = () => {
        const exp = this.state.expanded;
        this.setState({ expanded: !exp });
    }

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
            let expandClasses = "TableRowExpand ";
            let details = null;
            if (this.state.expanded) {
                expandClasses += "TableRowExpandOpen";
                details = (
                    <Aux>
                        <TableRow>
                            <TableCell style={{ width: '5%', padding: '0px', margin: '0px' }} />
                            <TableCell  className="TableRowNarrow" colSpan={2}>
                                <Collapse in={this.state.expanded} unmountOnExit={true}>Email: {row.email}</Collapse>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ width: '5%', padding: '0px', margin: '0px' }} />
                            <TableCell  className="TableRowNarrow" colSpan={2}>
                                <Collapse in={this.state.expanded} unmountOnExit={true}>Created at: {row.createdAt}</Collapse>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ width: '5%', padding: '0px', margin: '0px' }} />
                            <TableCell  className="TableRowNarrow" colSpan={2}>
                                <Collapse in={this.state.expanded} unmountOnExit={true}>Updated at: {row.updatedAt}</Collapse>
                            </TableCell>
                        </TableRow>
                    </Aux>
                );
            }

            return (
                <React.Fragment>
                    <TableRow key={row.id}>
                        <TableCell style={{ width: '5%', padding: '0px', margin: '0px' }}>
                            <IconButton
                                className={expandClasses}
                                onClick={this.handleExpandClick} >
                                <ExpandMoreIcon />
                            </IconButton>
                        </TableCell>
                        <TableCell className="TableRowNarrow" component="th" scope="row">{row.firstName} {row.lastName}</TableCell>
                        <TableCell className="TableRowNarrow">
                            <IconButton>
                                <Link style={noSpace} to={{ pathname: "/customer/" + row.id }}>
                                    <EditIcon color="primary" />
                                </Link>
                            </IconButton>
                            <IconButton onClick={() => this.props.onDeleteRow(row.id)}>
                                <DeleteIcon color="primary" />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    {details}
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