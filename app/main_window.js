const {app,BrowserWindow} = require('electron');

class MainWindow {
    constructor(url){
        let iconName = process.platform === 'win32' ? 'logo.ico': 'logo.ico';
        this.window = new BrowserWindow({
            height: 600,
            width: 500,
            frame: true,
            resizable: true,
            show:true,
            webPreferences: {
                backgroundThrottling:false,
                nodeIntegration: true,
                nodeIntegrationInWorker: true,
                contextIsolation: false
            },
        });
       this.url = url;
       this.window.loadURL(this.url);
       this.window.on('closed', () => this.window = null);
       this.window.on('maximize', () =>{this.window.webContents.send('maximized')});
       this.window.on('unmaximize', () =>{this.window.webContents.send('unmaximized')});
    } 
    

}

module.exports = MainWindow;
