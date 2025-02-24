// import axiosInstance from '../axios';
import {
    createSlice,
    // createAsyncThunk
} from '@reduxjs/toolkit';

// Initial state
const initialState = {
    users: [],
    selectedUser: {}
};

// This is another way to call API
// But i am using api middleware to make api calls, you can find code in `middlewares/apiRequest.js`

// export const fetchUsers = createAsyncThunk('GET_USERS', async (_, thunkAPI) => {
//     try {
//         const response = await axiosInstance.get('/users');
//         thunkAPI.dispatch(getUsers({
//             users: response?.data
//         }));
//     } catch (e) {
//         console.log(e)
//     }
// })

// Reducer

const usersReducer = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getUsers: (state, action) => {
            state.users =  action.payload.users;
        },
        getUserDetails: (state, action) => {
            state.selectedUser =  action.payload.user;
        }
    }
})
export const { getUsers } = usersReducer.actions;
export default usersReducer.reducer;
