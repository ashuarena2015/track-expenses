import React from 'react';
import Form from 'react-bootstrap/Form';

const FormSelect = (props) => {

const { options = [], label, name, handleChange } = props
  return (
    <>
        <Form.Label>{label}</Form.Label>
        <Form.Select name={name} onChange={handleChange}>
            {options.map((option, index) => {
                return (
                    <option key={index} value={option.code}>{option.name}</option>
                )
            })}
        </Form.Select>
    </> 
  );
}

export default FormSelect;
