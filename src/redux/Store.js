import {createStore, combineReducers} from 'redux';
import {websocketReducer} from './Reducers';

const rootReducer = combineReducers({websocketReducer});

export const Store = createStore(rootReducer);
