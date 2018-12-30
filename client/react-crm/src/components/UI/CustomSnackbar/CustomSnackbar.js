import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import CustomSnackbarContent from '../CustomSnackbarContent/CustomSnackbarContent';

const CustomSnackbar = (props) => {
    return (
        <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            open={props.snackbarOpen}
            autoHideDuration={6000}
            onClose={props.onSnackbarClose}>                    
            <CustomSnackbarContent 
                onClose={props.onSnackbarClose}
                variant={props.variant}
                message={props.message}
            />
        </Snackbar>
    );
}

export default CustomSnackbar;