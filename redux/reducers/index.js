import { combineReducers } from 'redux';
import { setUserReducer } from './userReducer';
import { setJamReducer } from './jamReducer';
import { setDictionaryReducer } from './dictionaryReducer';

const rootReducer = combineReducers({
  userReducer: setUserReducer,
  jamReducer: setJamReducer,
  dictionaryReducer: setDictionaryReducer,
});

export default rootReducer;
