import React from 'react';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import IconButton from '@material-ui/core/IconButton';

import './CustomSnackbarContent.css';

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const variantStyles = {
    success: "CustomSnackbarContentSuccess",
    warning: "CustomSnackbarContentWarning",
    error: "CustomSnackbarContentError",
    info: "CustomSnackbarContentInfo",
}

function CustomSnackbarContent(props) {
    const { message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    
    return (
        <SnackbarContent
            className={variantStyles[variant]}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar"
                    className="CustomSnackbarContentMessage" >
                    <Icon className="CustomSnackbarContentIcon CustomSnackbarContentIconVariant" />
                    {message}
                </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className="CustomSnackbarContentClose"
                    onClick={onClose}
                >
                    <CloseIcon className="CustomSnackbarContentIcon" />
                </IconButton>,
            ]}
            {...other}
        />
    );
}

export default CustomSnackbarContent;  