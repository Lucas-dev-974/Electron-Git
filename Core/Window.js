const { BrowserWindow } = require("electron")

const default_props = {
    width: 1280,
    heihgt: 780,
    show: false,
    // frame: false, // Permet d'afficher que le contenue sans les bordure
    webPreferences: {
        nodeIntegration: true,
    }
}

class Window extends BrowserWindow{
    constructor({file, ...WindowSettings}){
        super({...default_props, ...WindowSettings})
        this.loadFile(file)
        
        this.webContents.openDevTools()
        this.once('ready-to-show', () => {
            this.show()
        })
    }
}

module.exports = Window