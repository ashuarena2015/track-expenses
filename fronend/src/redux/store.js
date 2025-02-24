import { configureStore, Tuple } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import api from './middlewares/apiRequest';
import error from './middlewares/apiRequest';

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...[api, error]),
});

export default store;
