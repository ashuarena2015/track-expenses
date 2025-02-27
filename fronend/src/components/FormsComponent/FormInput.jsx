import React from 'react';
import Form from 'react-bootstrap/Form';
import { InputText } from 'primereact/inputtext';

const FormInput = (props) => {
    const { label, value, name, type, isError, placeholder, handleChange, className } = props;

    console.log({isError});

    return (
        <>
            <InputText
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                className={className}
            />
            {/* <Form.Label>{label}</Form.Label>
            <Form.Control
                required
                type={type}
                name={name}
                placeholder={placeholder || name}
                value={value}
                onChange={handleChange}
                isInvalid={isError}
            /> */}
        </>
    )
}

export default FormInput;
