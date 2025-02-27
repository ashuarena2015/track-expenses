import React from 'react';
import { Routes, Route } from "react-router-dom";
import TodoList from './components/TodoList';
import Expenses from './components/Expenses';
import Layout from './components/Layout';
import SignUp from './components/Onboard/Signup';

const MainRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<TodoList />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/expenses" element={<Expenses />} />
            </Route>
        </Routes>
    )
}

export default MainRoutes;
