/*
 * @Copyrights: 2021 @TheJunhan
 * @Date: 2021-10-15 11:03:06
 * @LastEditor: TheJunhan
 * @LastEditTime: 2021-10-26 14:48:00
 */
const {app, shell, Tray, nativeImage, ipcMain} = require('electron')
const path = require('path')
const url = require('url')
const fs = require('fs')
const LoginWindow = require('./pageControllers/loginWindow');
const MainPageWindow = require('./pageControllers/mainPageWindow');
const ContextMenu = require('./components/contextMenu');
const { fstat } = require('fs');
// path
const AppIconPath = './img/project_icon.png'
const MessageIconPath = './img/message.png'
const IndexPath = './build/index.html'
const PortPath = 'http://localhost:3000/'

// 获取在 package.json 中的命令脚本传入的参数，来判断是开发还是生产环境
const mode = process.argv[2];

class Main {
  constructor() {
    this.loginWindow = null;
    this.mainPageWindow = null;
    this.tray = null;
    this.contextMenu = null;
    // 应当开始闪烁和闪烁函数
    this.isFlickering = false;
    this.flickerInterval = null;
    // 用户信息
    this.username = null;
    this.password = null;
  }
  init() {
    // 登录窗口
    app.on('ready', ()=>{     
      this.loginWindow = new LoginWindow(mode);
      // 创建托盘
      this.createTray()
    })
    // 登录事件
    ipcMain.on('on-click-login', (event, arg)=> {
      console.log('receive login')
      event.reply(this.loginEvent(arg))
    })
    // 打开默认浏览器
    ipcMain.on('openDefaultBrowser', (event, url)=>{
      shell.openExternal(url)
    })
    // 闪烁事件
    ipcMain.on('startFlicker', ()=>{
      this.startFlicker()
    })
    // 右键菜单
    this.contextMenu = new ContextMenu()
  }
  
  loginEvent(arg) {
    console.log('diaoyonglewo')
    console.log(arg)
    let hasAuth = false
    /**check auth code here */
    hasAuth = true
    /** */
    if(hasAuth) {
      this.mainPageWindow = new MainPageWindow(mode)
      this.loginWindow.close()
      return 'success'
    }
    else {
      return 'fail'
    }
  }

  createTray() {
    const icon = nativeImage.createFromPath(AppIconPath)
    this.tray = new Tray(icon)
    this.tray.setToolTip('This is my application')
    this.tray.setTitle('This is my title')
    this.tray.on('click', ()=>{
      this.mainPageWindow.show()
    })
    this.tray.on('right-click', ()=>{
      this.tray.popUpContextMenu(this.contextMenu.getMenu())
    })
  }

  startFlicker() {
    var msg = false
    this.flickerInterval = setInterval(() => {
      if(msg) {
        this.tray.setImage(nativeImage.createFromPath(AppIconPath))
      }
      else {
        this.tray.setImage(nativeImage.createFromPath(MessageIconPath))
      }
      msg = !msg
    }, 500)
  }

  endFlicker() {
    clearInterval(this.flickerInterval)
  }
}
new Main().init()
