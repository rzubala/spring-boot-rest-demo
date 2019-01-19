import React from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CustomerHeaderSort from './CustomerHeaderSort/CustomerHeaderSort';

const CustomerTableHeader = (props) => {
    if (props.narrow) {
        return (
            <TableRow>
                <TableCell style={{ width: '5%', padding: '0px', margin: '0px' }} />
                <CustomerHeaderSort order={props.order} sortHandler={props.sortHandler}>Customer</CustomerHeaderSort>
                <TableCell className="TableRowNarrow">Actions</TableCell>
            </TableRow>
        );
    } else {
        return (
            <TableRow>
                <TableCell>First name</TableCell>
                <CustomerHeaderSort order={props.order} sortHandler={props.sortHandler}>Last name</CustomerHeaderSort>
                <TableCell>Email</TableCell>
                <TableCell>Created at</TableCell>
                <TableCell>Updated at</TableCell>
                <TableCell>Actions</TableCell>
            </TableRow>
        );
    }
}

export default CustomerTableHeader;