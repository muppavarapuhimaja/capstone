import {applyMiddleware, compose, createStore} from "redux";
import axios from "axios";
import reducers from "../reducers"

export const SERVER_URL = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL || `http://54.203.176.192:8090`
})

const composeEnhancers = (process.env.REACT_APP_PROFILE === 'dev' &&
    typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose();

export const ReduxStore = createStore(
    reducers,
    composeEnhancers(applyMiddleware())
);