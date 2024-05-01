import React from "react";
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import './MainPage.css'
import Menu from "./menu/Menu"
import Logout from "../logout/Logout"
import Settings from "../settings/Settings"
import Profile from "../user_profile/UserProfile"
import VideoList from "../user_videos/UserVideos"
import FaceRegistration from "../register_face/RegisterFace"
import Home from "../main_page/home/Home"
import SetupCamera from "../setup_camera/SetupCamera"
{/* <Route path="/main/defaulf" exact component={LoginPage}/>
<Route path="/main/settings" exact component={UserAgreement}/>
<Route path="/main/user_profile" exact component={CreatePassword}/> */}

const MainPage = () => {
    return (
        <div className ="main-page">
            <Menu/>
            <div className= "main-content">
            <Routes>
                <Route path="/"  element={<Home/>}/>
                <Route path="/videos"  element={<VideoList/>}/>        
                <Route path="/profile"  element={<Profile/>}/>
                <Route path="/settings"  element={<Settings/>}/>
                <Route path="/logout"  element={<Logout/>}/>
                <Route path="/register_face" element={<FaceRegistration/>}/>
                <Route path="/setup_camera" element={<SetupCamera/>}/>
            </Routes>
            </div>
        </div>     

    );
};
export default MainPage;