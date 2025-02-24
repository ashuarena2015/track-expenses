/* 

This is the 1st way to use redux toolkit
---------------------------------------------

import { createAction, createReducer } from '@reduxjs/toolkit';
// import { globalSnackbarMessage } from './global';

// Action Creators

export const addTask = createAction("ADD_TASK");
export const removeTask = createAction("REMOVE_TASK");

// Reducer

const initialState = {
    tasks: [],
    message: ''
}

let id = 1;

const addTaskById = (curTask) => {
    let newTask = {
        id: id++,
        name: curTask?.taskName,
        status: false
    };
    return newTask;
}

const todoListReducer = createReducer(initialState, (builder) => {
    builder.addCase(addTask, (state, action) => {
        state.tasks.push(addTaskById(action.payload));
        state.message = `Added task along with id ${id - 1}`;
    })
    .addCase(removeTask, (state, action) => {
        console.log('state', state);
        state.tasks = state.tasks.filter(task => task.id !== action.payload.id);
        state.message = `Removed task id ${action.payload.id}`;
    })
})

export default todoListReducer;

*/

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: [],
    message: ''
}

let id = 1;

const addTaskById = (curTask) => {
    let newTask = {
        id: id++,
        name: curTask?.taskName,
        status: false
    };
    return newTask;
}

const todoListReducer = createSlice({
    name: 'todoListReducer',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(addTaskById(action.payload));
            state.message = `Added task along with id ${id - 1}`;
        },
        removeTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload.id);
            state.message = `Removed task id ${action.payload.id}`;
        }
    }
})

export const { addTask, removeTask } = todoListReducer.actions;
export default todoListReducer.reducer;
