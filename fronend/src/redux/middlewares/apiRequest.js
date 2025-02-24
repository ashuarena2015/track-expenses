import axiosInstance from '../axios';
const api = ({ dispatch }) => next => async action => {
    if(action.type !== 'apiRequest') {
        return next(action);
    }

    try {
        const { url, method, params, onSuccess, onError, dispatchType} = action.payload;
        const response = await axiosInstance.get(url, {
            params,
            method,
            onSuccess,
            onError
        });
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
        if(dispatchType === 'getUserDetails') {
            dispatch({
                type: 'users/getUserDetails',
                payload: {
                    user: response?.data[0]
                }
            })
            dispatch({
                type: 'GLOBAL_MESSAGE',
                payload: {
                    message: 'User data fetched successfully!',
                    msgType: 'success'
                }
            })
        }
    } catch (error) {
        dispatch({
            type: 'GLOBAL_MESSAGE',
            payload: {
                message: error.message,
                msgType: 'error'
            }
        })
    }

}

export default api;
