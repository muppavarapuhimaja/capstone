import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/css/index.css';
import App from './App';
import {Provider} from "react-redux";
import ErrorBoundary from "./components/ui/common/ErrorBoundary";
import {ReduxStore} from "./config/config"
import {SnackbarProvider} from "notistack";
import "bootstrap/dist/css/bootstrap.css";

if(process.env.REACT_APP_PROFILE === 'dev')
{
    console.log = console.error = console.warn = function() {}
}

ReactDOM.render(
    <Provider store={ReduxStore}>
        <SnackbarProvider maxSnack={3}
                          anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'right',
                          }}>
            <ErrorBoundary>
                <App/>
            </ErrorBoundary>
        </SnackbarProvider>
    </Provider>,
    document.getElementById('root')
);