import React from 'react';
import { InputText } from 'primereact/inputtext';

const FormInput = (props) => {
    const { label, value, name, type, isError, placeholder, handleChange, className } = props;

    return (
        <>
            <InputText
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                className={className}
                type={type}
            />
        </>
    )
}

export default FormInput;
