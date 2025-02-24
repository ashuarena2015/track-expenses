// Actions types
const GLOBAL_MESSAGE = 'GLOBAL_MESSAGE';
const GLOBAL_MESSAGE_RESET = 'GLOBAL_MESSAGE_RESET';

// Initial state
const initialState = {
    message: '',
    msgType: ''
};

// Actions
export const globalSnackbarMessage = ({ message, msgType, isReset }) => async (dispatch) => {
    dispatch({
        type: isReset ? GLOBAL_MESSAGE_RESET : GLOBAL_MESSAGE,
        payload: {
            message,
            msgType
        }
    });
};

// Reducer

const globalReducer = (state = initialState, action) => {
    console.log({action});
    switch (action.type) {
        case GLOBAL_MESSAGE:
            return {
                ...state,
                message: action.payload.message,
                msgType: action.payload.msgType
            }
        case GLOBAL_MESSAGE_RESET:
            return {
                ...state,
                message: '',
                msgType: ''
            }
        default:
            return state;
    }
}

export default globalReducer;
