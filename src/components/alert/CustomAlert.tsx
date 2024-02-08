import React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';

interface CustomAlertProps {
    severity: 'success' | 'error' | 'warning' | 'info' | undefined;
    message: string;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ severity, message }) => {

    const getIcon = () => {
        switch (severity) {
            case 'success':
                return <CheckIcon fontSize="inherit" />;
            case 'error':
                return <ErrorIcon fontSize="inherit" />;
            case 'warning':
                return <WarningIcon fontSize="inherit" />;
            case 'info':
                return <InfoIcon fontSize="inherit" />;
            default:
                return null;
        }
    };

    return (
        <Alert icon={getIcon()} severity={severity}>
            {message}
        </Alert>
    );
}
export default CustomAlert;