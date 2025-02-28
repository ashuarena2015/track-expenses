import axiosInstance from '../axios';
const api = ({ dispatch }) => next => async action => {
    if(action.type !== 'apiRequest') {
        return next(action);
    }

    const isLoading = (status) => {
        dispatch({
            type: 'users/isLoading',
            payload: {
                loading: status
            }
        })
    }

    try {

        isLoading(true);
        const { url, method, params, onSuccess, onError, dispatchType} = action.payload;
        const response = await axiosInstance(url, {
            params,
            method,
            onSuccess,
            onError
        });
        if(dispatchType === 'getLoggedInUser') {
            dispatch({
                type: 'users/getLoggedInUser',
                payload: {
                    users: response?.data
                }
            })
            dispatch({
                type: 'GLOBAL_MESSAGE',
                payload: {
                    message: 'All data fetched successfully!',
                    msgType: 'success'
                }
            })
        }
        if(dispatchType === 'getUsers') {
            dispatch({
                type: 'users/getUsers',
                payload: {
                    users: response?.data
                }
            })
            dispatch({
                type: 'GLOBAL_MESSAGE',
                payload: {
                    message: 'All data fetched successfully!',
                    msgType: 'success'
                }
            })
        }
        if(dispatchType === 'getExpenses') {
            dispatch({
                type: 'users/getExpenses',
                payload: {
                    expenses: response?.data
                }
            })
            dispatch({
                type: 'GLOBAL_MESSAGE',
                payload: {
                    message: 'All data fetched successfully!',
                    msgType: 'success'
                }
            })
        }
        if(dispatchType === 'saveUserDetails') {
            dispatch({
                type: 'GLOBAL_MESSAGE',
                payload: {
                    message: 'User data saved successfully!',
                    msgType: 'success'
                }
            })
        }
        if(dispatchType === 'getLoginDetails') {
            console.log({response});
            dispatch({
                type: 'users/getLoginDetails',
                payload: {
                    ...response?.data.user
                }
            })
            dispatch({
                type: 'GLOBAL_MESSAGE',
                payload: {
                    message: 'You are now logged-in!',
                    msgType: 'success'
                }
            })
        }
    } catch (error) {
        console.log({error});
        dispatch({
            type: 'GLOBAL_MESSAGE',
            payload: {
                message: error.response?.data?.message || 'Something went wrong!',
                msgType: 'error'
            }
        })
    } finally {
        isLoading(false);
    }

}

export default api;
