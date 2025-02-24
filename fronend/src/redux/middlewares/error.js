import axios from 'axios';
const error = store => next => action => {
    if(action.type === 'GLOBAL_MESSAGE') {
        console.log('error action', action.payload);
        return next(action);
    } else {
        next(action);
    }
}

export default error;
