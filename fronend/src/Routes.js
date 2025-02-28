import React from 'react';
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from './components/Layout/ProtectedRoute';
import TodoList from './components/TodoList';
import Expenses from './components/Expenses';
import Layout from './components/Layout';
import SignUp from './components/Onboard/Signup';
import Login from './components/Onboard/Login';

const MainRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="todo" element={<TodoList />} />
                    <Route path="/expenses" element={<Expenses />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default MainRoutes;
