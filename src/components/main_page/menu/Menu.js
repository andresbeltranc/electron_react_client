import React from "react";
import './Menu.css'

const Menu = () => {

    const onRegisterFace = () => {
        ipcRenderer.invoke('maximize-event')
    }

    const onVideosContent = () => {
        ipcRenderer.invoke('unmaximize-event')
    }

    const onUserProfile = () => {
        ipcRenderer.invoke('close-event')
    }
    const onSettings = () => {
        ipcRenderer.invoke('close-event')
    }
    const onLogout = () => {
        ipcRenderer.invoke('minimize-event')
    }
    return (
        <div className="Menu">
            <div className =""></div>
            <div className="register-face-content"></div>
            <div className="videos-content"></div>
            <div className="user-content"></div>
            <div className="settings-content"></div>
            <div className="logout-content"></div>
        </div >
    );
}

export default Menu