import React from 'react';
import { Outlet } from "react-router-dom";
import Navigation from './Navigation';

const Layout = () => {

    return (
        <>
        <Navigation />
        <div className="mx-auto" style={{marginTop: "3rem"}}>
            <Outlet />
        </div>
        </>
    )

}

export default Layout;