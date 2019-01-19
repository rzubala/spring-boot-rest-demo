import React from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';


const CustomerHeaderSort = (props) => {
    return (
        <TableCell
            align={'left'}
            padding={'default'}
            sortDirection={props.order}
        >
            <Tooltip
                title="Sort"
                placement={'bottom-start'}
                enterDelay={300}
            >
                <TableSortLabel
                    active={true}
                    direction={props.order}
                    onClick={props.sortHandler}
                >
                    {props.children}
                </TableSortLabel>
            </Tooltip>
        </TableCell>
    );
}

export default CustomerHeaderSort;