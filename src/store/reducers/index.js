import { combineReducers } from 'redux';
import auth from './auth';
import factorsReducer from './factorsReducer'

export default combineReducers({
    auth: auth,
    factors: factorsReducer,
});