import { combineReducers } from "redux";
import todoListReducer from "./todolist";
import usersReducer from "./users";
import globalReducer from "./global";

const appReducer = combineReducers({
    todoListReducer,
    usersReducer,
    globalReducer
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;