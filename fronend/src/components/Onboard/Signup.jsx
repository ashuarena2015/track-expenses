import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FormInput from '../FormsComponent/FormInput';
import FormSelect from '../FormsComponent/FormSelect';
import { countries } from '../FormsComponent/Countries';

function SignUp() {
  const [validated, setValidated] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    username: '',
    city: '',
    street_address: '',
    country: ''
  });

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const handleChange = (e) => {
    const { name, value} = e.target;
    setFormData({
        ...formData,
        [name]: value
    })
  }

  console.log({formData});

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
            <Form.Group as={Col} md="6">
                <FormInput
                    label="First name"
                    name="firstName"
                    value={formData?.firstName}
                    placeholder="First name"
                    handleChange={handleChange}
                />
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom02">
                <FormInput
                    label="Last name"
                    name="lastName"
                    value={formData?.lastName}
                    placeholder="Last name"
                    handleChange={handleChange}
                />
            </Form.Group>
        </Row>
        <Row className="mb-3">
            <Form.Group as={Col}>
                <FormInput
                    label="Email"
                    name="email"
                    type="email"
                    value={formData?.email}
                    placeholder="Email"
                    handleChange={handleChange}
                />
            </Form.Group>
        </Row>
        <Row className="mb-4">
            <Form.Group as={Col} md="6">
                <FormInput
                    label="Username"
                    name="username"
                    value={formData?.username}
                    placeholder="Username"
                    handleChange={handleChange}
                />
            </Form.Group>
            <Form.Group as={Col} md="6">
                <FormInput
                    label="Password"
                    name="password"
                    type="password"
                    value={formData?.password}
                    placeholder="Password"
                    handleChange={handleChange}
                />
            </Form.Group>
        </Row>
        <Row className="mb-3">
            <Form.Group as={Col}>
                <FormInput
                    label="Street Address"
                    name="street_address"
                    value={formData?.street_address}
                    placeholder="Street Address"
                    handleChange={handleChange}
                />
            </Form.Group>
        </Row>
        <Row className="mb-4">
            <Form.Group as={Col} md="6">
                <FormInput
                    label="City"
                    name="city"
                    value={formData?.username}
                    placeholder="Username"
                    handleChange={handleChange}
                />
            </Form.Group>
            <Form.Group as={Col} md="6">
                <FormSelect
                    label={"Country"}
                    name="country"
                    options={countries}
                    handleChange={handleChange}
                />
            </Form.Group>
        </Row>
        <Button type="submit">Register</Button>
        </Form>
    </div>
  );
}

export default SignUp;