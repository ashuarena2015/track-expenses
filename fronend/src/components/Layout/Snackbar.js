import React from 'react';
import Alert from 'react-bootstrap/Alert';

export default function SimpleSnackbar(props) {

    const { snackBarInfo } = props;

    return (   
        <Alert key={snackBarInfo?.msgType} variant={snackBarInfo?.msgType === 'error' ? 'danger' : snackBarInfo?.msgType}>
            {snackBarInfo?.message}
        </Alert>
    );
}
