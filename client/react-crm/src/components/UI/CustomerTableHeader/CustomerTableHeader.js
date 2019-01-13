import React from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const CustomerTableHeader = (props) => {
    if (props.narrow) {
        return (
            <TableRow>
              <TableCell style={{ width: '5%', padding: '0px', margin: '0px' }} />
              <TableCell className="TableRowNarrow">Customer</TableCell>
              <TableCell className="TableRowNarrow">Actions</TableCell>
            </TableRow>
        );    
    } else {
        return (
            <TableRow>              
              <TableCell>First name</TableCell>
              <TableCell>Last name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Created at</TableCell>
              <TableCell>Updated at</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
        );    
    }
}

export default CustomerTableHeader;