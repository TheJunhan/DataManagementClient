/*
 * @Copyrights: 2021 @TheJunhan
 * @Date: 2021-10-21 17:03:25
 * @LastEditor: TheJunhan
 * @LastEditTime: 2021-10-26 13:36:01
 */
const {BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

class LoginWindow {
  
  // constructor(mode) {
  //   this.window = null;
  //   this.createWindow(mode);
  // }

  constructor(mode) {
    this.window = null
    this.createWindow(mode)
    return this.window
  }

  createWindow(mode) {
    console.log('not use in login')
    this.window = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
          preload: path.join(__dirname, '../preloads/loginPreload.js')
      }
    })
    // window.loadFile(path.join(__dirname, './pages/login/index.html'))
      if(mode === 'dev') { 
        this.window.loadURL('http://localhost:1334')
      } else { 
        this.window.loadURL(url.format({
          pathname:path.join(__dirname, '../pages/login/index.html'), 
          protocol:'file:', 
          slashes:true 
        }))
      }
  }
  
  close() {
    this.window.close()
  }
}
module.exports = LoginWindow