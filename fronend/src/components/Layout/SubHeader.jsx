import React, { memo } from 'react';
import { Button, Typography } from '@mui/material';

const SubHeader = (props) => {
    const { subheading } = props;
    return (
        <>
            <Typography variant="h6" component="h2" gutterBottom>{subheading}</Typography>
        </>
    )
}
export default memo(SubHeader);
