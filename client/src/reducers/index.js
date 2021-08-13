import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';


const rootReducer = combineReducers({
    auth: authReducer,
    error: errorReducer
})

export default (state, action) =>
    rootReducer(action.type === 'LOGOUT' ? undefined : state, action)