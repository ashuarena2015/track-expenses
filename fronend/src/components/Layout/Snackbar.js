import React from 'react';

export default function SimpleSnackbar(props) {

    const { snackbarInfo } = props;

    return (   
       <>{snackbarInfo?.message}</>
    );
}
