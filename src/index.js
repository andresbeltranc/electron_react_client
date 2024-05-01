import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose} from "redux";
import App from './components/App/App';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';
import { BrowserRouter,Routes, Route } from 'react-router-dom';


import Titlebar from './components/App/TitleBar/Titlebar'
import UserAgreement from "./components/user_agreement/UserAgreement";
import CreatePassword from "./components/auth/create_password/CreatePassword";
import MainPage from "./components/main_page/MainPage";
import LoginPage from "./components/login/LoginPage"
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)));
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDom.render (
        <Provider store={createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)))}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
        ,document.querySelector('#root'));