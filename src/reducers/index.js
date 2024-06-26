import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form'
import authReducer  from './authReducer';
import userReducer from './userReducer';
export default combineReducers({
    userinfo: userReducer,
    auth:authReducer,
    form: formReducer,
});