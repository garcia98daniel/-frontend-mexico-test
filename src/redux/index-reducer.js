import { combineReducers } from 'redux';
import loginReducer from './auth/login/reducer';
import clientReducer from './client/reducer';
import userReducer from './auth/user/reducer';
import LogoutReducer from './auth/logout/reducer';

export default combineReducers({
    loginReducer,
    clientReducer,
    userReducer,
    LogoutReducer,
});