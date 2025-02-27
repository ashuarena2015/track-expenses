import React from 'react';
import { Outlet } from "react-router-dom";
import Navigation from './Navigation';

const Layout = () => {

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