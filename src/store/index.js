import { applyMiddleware, createStore } from "redux";
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducer from '../reducers/index'; //if you dont mention index then also it will work


let store;

export function configureStore(){
    store=createStore(reducer,applyMiddleware(thunk,logger));
    return store;
}