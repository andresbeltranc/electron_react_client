import React from "react";
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import history from'../../history';
import LoginPage from "../login/LoginPage";
import './App.css'
import Titlebar from './TitleBar/Titlebar'
import UserAgreement from "../user_agreement/UserAgreement";
import CreatePassword from "../auth/create_password/CreatePassword";
import MainPage from "../main_page/MainPage";
const App = () => {
    return (
        <div className ="MainApp">
            <Titlebar/>    
            <div className= "app-content">
                <Routes>
                    <Route path="/" element={<LoginPage/>}/>
                    <Route path="/user_agreement" element={<UserAgreement/>}/>
                    <Route path="/create_password" element={<CreatePassword/>}/>
                    <Route path="/main/*" element={<MainPage/>}/>            
                </Routes> 
            </div> 
    
        </div>     
    );
}
export default App;