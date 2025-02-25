import React from 'react';
import Form from 'react-bootstrap/Form';

const FormInput = (props) => {
    const { label, value, name, type, placeholder, handleChange } = props;

    return (
        <>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                required
                type={type}
                name={name}
                placeholder={placeholder || name}
                value={value}
                onChange={handleChange}
            />
        </>
    )
}

export default FormInput;
