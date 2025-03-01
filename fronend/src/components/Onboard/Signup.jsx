import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";
import FormInput from '../FormsComponent/FormInput';
import CountryDropDown from '../FormsComponent/CountryDropDown';
// import SimpleSnackbar from '../Layout/Snackbar';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';   
// import { Checkbox } from 'primereact/Checkbox';

// Icons
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';

function SignUp() {

    const dispatch = useDispatch();
    const router = useNavigate();

    // const snackBarMessage = useSelector(state => state.globalReducer);
    const { loginUser, isLoading } = useSelector(state => state.usersReducer);
    const [formSubmit, setFormSubmit] = useState(false);
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

    const handleSubmit = () => {
        setFormSubmit(true);
        if(Object.values(formData).some(value => !value)) {
            return;
        } 
        dispatch({
            type: 'apiRequest',
            payload: {
                url: `users/register`,
                method: 'POST',
                onSuccess: 'users/saveUserDetails',
                onError: 'GLOBAL_MESSAGE',
                dispatchType: 'saveUserDetails',
                params: {
                    userInfo: {...formData}
                }
            }
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const isErrorInput = (inputName) => {
        return formSubmit && !formData[inputName];
    }

    if(loginUser?.username) {
        return <Navigate to="/expenses" />;
    }

    return (
        <>
            {/* {snackBarMessage?.message && <SimpleSnackbar snackBarInfo={snackBarMessage} />} */}
            <div className="flex align-items-center">
                <div className="p-4 shadow-2 border-round">
                    <div className="text-center mb-5">
                        <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
                        <span className="text-600 font-medium">Already have an account?</span>
                        <Button label="Login" className="line-height-0 p-0 ml-2" link onClick={() => router('/login')}/>
                    </div>
                    <div>
                        <div className='formgrid grid'>
                            <div className='field col'>
                                <label htmlFor="firstName" className="block text-900 font-medium mb-2">First name</label>
                                <FormInput
                                    label="First name"
                                    name="firstName"
                                    value={formData?.firstName}
                                    placeholder="First name"
                                    handleChange={handleChange}
                                    isError={isErrorInput('firstName')}
                                    className="w-full mb-3"
                                />
                            </div>
                            <div className='field col'>
                                <label htmlFor="lastName" className="block text-900 font-medium mb-2">Last name</label>
                                <FormInput
                                    label="Last name"
                                    name="lastName"
                                    value={formData?.firstName}
                                    placeholder="Last name"
                                    handleChange={handleChange}
                                    isError={isErrorInput('lastName')}
                                    className="w-full mb-3"
                                />
                            </div>
                        </div>
                        <div className='formgrid grid'>
                            <div className='field col'>
                                <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
                                <FormInput
                                    label="Email"
                                    name="email"
                                    value={formData?.email}
                                    placeholder="example@domain.com"
                                    handleChange={handleChange}
                                    isError={isErrorInput('firstName')}
                                    className="w-full mb-3"
                                />
                            </div>
                        </div>
                        <div className='formgrid grid'>
                            <div className='field col'>
                                <label htmlFor="username" className="block text-900 font-medium mb-2">Username</label>
                                <FormInput
                                    label="Username"
                                    name="username"
                                    value={formData?.username}
                                    placeholder="Username"
                                    handleChange={handleChange}
                                    isError={isErrorInput('username')}
                                    className="w-full mb-3"
                                />
                            </div>
                            <div className='field col'>
                                <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
                                <FormInput
                                    label="Password"
                                    name="password"
                                    value={formData?.password}
                                    placeholder="******"
                                    handleChange={handleChange}
                                    isError={isErrorInput('password')}
                                    className="w-full mb-3"
                                />
                            </div>
                        </div>
                        <div className='formgrid grid'>
                            <div className='field col'>
                                <label htmlFor="password" className="block text-900 font-medium mb-2">Street address</label>
                                <FormInput
                                    label="Street address"
                                    name="street_address"
                                    value={formData?.street_address}
                                    placeholder="Address..."
                                    handleChange={handleChange}
                                    isError={isErrorInput('street_address')}
                                    className="w-full mb-3"
                                />
                            </div>
                        </div>
                        <div className='formgrid grid'>
                            <div className='field col'>
                                <label htmlFor="city" className="block text-900 font-medium mb-2">City</label>
                                <FormInput
                                    label="City"
                                    name="city"
                                    value={formData?.city}
                                    placeholder="City"
                                    handleChange={handleChange}
                                    isError={isErrorInput('city')}
                                    className="w-full mb-3"
                                />
                            </div>
                            <div className='field col'>
                                <label htmlFor="country" className="block text-900 font-medium mb-2">Country</label>
                                <CountryDropDown handleChange={handleChange} value={formData?.country} className="w-full mb-3" />
                            </div>
                        </div>
                        <div className="flex align-items-center justify-content-between mb-6">
                            <div className="flex align-items-center">
                                <Checkbox id="rememberme" className="mr-2" />
                                <label htmlFor="rememberme">Remember me</label>
                            </div>
                            {/* <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot your password?</a> */}
                        </div>
                        <Button
                            onClick={handleSubmit}
                            label="Sign Up"
                            icon="pi pi-user"
                            className="w-full"
                        >
                            <ArrowForwardOutlinedIcon />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUp;