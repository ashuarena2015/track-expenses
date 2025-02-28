import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from "react-router-dom";
import Navigation from './Navigation';

const Layout = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: 'apiRequest',
            payload: {
                url: `user/auth`,
                method: 'GET',
                onSuccess: 'user/getLoginDetails',
                onError: 'GLOBAL_MESSAGE',
                dispatchType: 'getLoginDetails'
            }
        });
    }, []);

    return (
        <div className="block bg-primary">
        <div className="grid flex-column">
            <Navigation />
            <div className='p-4 m-auto'>
                <Outlet />
            </div>
        </div>
        </div>
    )

}

export default Layout;