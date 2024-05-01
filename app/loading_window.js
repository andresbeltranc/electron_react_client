const {app,BrowserWindow} = require('electron');

class LoadingWindow {
    constructor(url){
        let iconName = process.platform === 'win32' ? 'logo.ico': 'logo.ico';
        this.window = new BrowserWindow({
            height: 300,
            width: 300,
            frame: false,
            resizable: false,
            show:false,
            alwaysOnTop: true,
            webPreferences: {
                backgroundThrottling:false,
                nodeIntegration: true,
                nodeIntegrationInWorker: true,
                contextIsolation: false
            },
        });
       this.url = url;
       this.window.loadURL(this.url);
       this.window.center();
       this.window.setSkipTaskbar(true);
    } 
    

}

module.exports = LoadingWindow;
