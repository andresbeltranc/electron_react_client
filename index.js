//  ipcMain, shell
'use strict';
const ipcMain = require('electron').ipcMain;
const {app, BrowserWindow} = require('electron');
const MainTray = require('./app/main_tray');
const MainWindow = require('./app/main_window');
const LoadingWindow = require('./app/loading_window');
const _ = require('lodash');
const {PythonShell} = require('python-shell');
const axios = require('axios')
let pyshell;
let mainWindow;
let loadingWindow;
let tray;

function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
async function delay() {

}
// i want in the future that the component of loading.html are going to be integrated in the react part of the app.
async function startEngie(){

    console.log('Awake');
    try {
        let res = await axios({url: 'http://localhost:4321/user_app_status', method: 'post', timeout: 8000,
            headers: {'Content-Type': 'application/json',}})
        if(res.status == 200){
            console.log(res.data["user_properties"])
            let userAgreement = res.data["user_properties"]["user_agreement_status"].toLowerCase()
            let userPassword = res.data["user_properties"]["is_first_login"].toLowerCase()
            
            if(userAgreement == "false"){
                loadingWindow.window.hide()
                mainWindow = new MainWindow('https://<url>/user_agreement');
                tray = new MainTray(mainWindow.window);
            }
            else if(userPassword == "true"){
                loadingWindow.window.hide()
                mainWindow = new MainWindow('https://<url>/create_password');
                tray = new MainTray(mainWindow.window);
            }
            if(userAgreement == "true" && userPassword == "false"){
                loadingWindow.window.hide()
                console.log("login")
                mainWindow = new MainWindow('https://<url>:3000/');
                tray = new MainTray(mainWindow.window);
            }
        }    
     }
     catch (err) {
         console.error(err);
     }   
}
app.on('ready',()=>{
    loadingWindow = new LoadingWindow(__dirname + '/public/loading/loading.html');
    loadingWindow.window.show()
    startEngie()

        
});
// ipcMain.handle('my-video-devices', async () => {
//     const result = await cameraService.getVideoDevices();
//     return result
// });

ipcMain.handle('minimize-event', () => {
    mainWindow.window.minimize()
});
ipcMain.handle('maximize-event', () => {
    mainWindow.window.maximize();
});
ipcMain.handle('unmaximize-event', () => {
    mainWindow.window.unmaximize();
});
ipcMain.handle('close-event', () => {
    //let kill = require('tree-kill');
   // console.log(pyshell)
    //kill(pyshell);
    pyshell.end(function (err,code,signal) {
        if (err) throw err;
        console.log('The exit code was: ' + code);
        console.log('The exit signal was: ' + signal);
        console.log('finished');
      });
    app.quit()
});
