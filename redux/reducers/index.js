import { combineReducers } from 'redux';
import { setUserReducer } from './userReducer';
import { setJamReducer } from './jamReducer';

const rootReducer = combineReducers({
    userReducer: setUserReducer,
    jamReducer: setJamReducer
});

export default rootReducer;

