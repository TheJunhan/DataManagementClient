/*
 * @Copyrights: 2021 @TheJunhan
 * @Date: 2021-10-21 17:03:35
 * @LastEditor: TheJunhan
 * @LastEditTime: 2021-10-25 19:25:10
 */
const { BrowserWindow } = require("electron")
const path = require('path')

class MainPageWindow {
    constructor(mode) {
        this.window = null
        this.createWindow(mode)
    }
    createWindow(mode) {
        this.window = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                preload: path.join(__dirname, '../preloads/mainPagePreload.js')
            }
        })
        if(mode == 'dev') {
            this.window.loadURL('http://localhost:12727')
        }
        else {
            this.window.loadFile(path.join(__dirname, '../pages/mainPage/index.html'))
        }
        this.window.on('close', (event)=>{
            this.window.hide()
            event.preventDefault()
        })
    }
    hide() {
        this.window.hide()
    }
    show() {
        this.window.show()
    }
}
module.exports = MainPageWindow