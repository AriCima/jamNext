import { combineReducers } from 'redux';
import { setUserReducer } from './userReducer';

const rootReducer = combineReducers({
    userReducer: setUserReducer
});

export default rootReducer;

