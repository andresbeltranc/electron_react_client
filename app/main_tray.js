const { Menu, app, Tray} = require('electron');
const path = require('path');

class MainTray {
    constructor(mainWindow){
        let iconName = process.platform === 'win32' ? 'logo_34x33_px.png': 'logo_34x33_px.png';
        let iconPath = path.join(__dirname,`../src/assets/${iconName}`)
        this.mainTray = Tray(iconPath)
        this.mainWindow = mainWindow;
        this.mainTray.setToolTip('electron_client')
        this.mainTray.on('click',this.onClick.bind(this));
        this.mainTray.on('right-click', this.onRigthClick.bind(this))
        
    }

    onClick(event,bounds){
        //const {x,y} = bounds;
        // windows height and width
        //const {height, width} = this.mainWindow.getBounds();
        //console.log(this.mainWindow.getBounds())
        if(this.mainWindow.isVisible()){
            this.mainWindow.hide();
        }
        else{
            this.mainWindow.show();
        }
    }
    onRigthClick(){
        const menuConfig = Menu.buildFromTemplate([
            {
                label:'Quit',
                click:() => app.quit()
            }
        ]);
        this.mainTray.popUpContextMenu(menuConfig);
    }
}

module.exports = MainTray;