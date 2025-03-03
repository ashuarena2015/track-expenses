import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";
import FormInput from '../FormsComponent/FormInput';
// import SimpleSnackbar from '../Layout/Snackbar';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';

function Login() {

    const dispatch = useDispatch();

    const snackBarMessage = useSelector(state => state.globalReducer);
    const { loginUser, isLoading } = useSelector(state => state.usersReducer);
    const [formSubmit, setFormSubmit] = useState(false);
    const [formData, setFormData] = useState({
        password: '',
        username: '',
    });

    const handleSubmit = () => {
        setFormSubmit(true);
        if(Object.values(formData).some(value => !value)) {
            return;
        } 
        dispatch({
            type: 'apiRequest',
            payload: {
                url: `user/login`,
                method: 'POST',
                onSuccess: 'users/getLoginDetails',
                onError: 'GLOBAL_MESSAGE',
                dispatchType: 'getLoginDetails',
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
        isLoading ? "Loading..."
            : <>
                {/* {snackBarMessage?.message && <SimpleSnackbar snackBarInfo={snackBarMessage} />} */}
                <div className="flex align-items-center">
                    <div className="p-4 shadow-2 border-round">
                        <div className="text-center mb-5">
                            <div className="text-900 text-3xl font-medium mb-3">Login</div>
                            <span className="text-600 font-medium line-height-3">Don't have an account?</span>
                            <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</a>
                        </div>
                        <div>
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
                                        type="password"
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
                            <div className="flex align-items-center justify-content-between mb-6">
                                <div className="flex align-items-center">
                                    <Checkbox id="rememberme" className="mr-2" />
                                    <label htmlFor="rememberme">Remember me</label>
                                </div>
                                {/* <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot your password?</a> */}
                            </div>
                            <Button
                                onClick={handleSubmit}
                                label="Sign In"
                                icon="pi pi-user"
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </>
    );
}

export default Login;