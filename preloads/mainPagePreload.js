/*
 * @Copyrights: 2021 @TheJunhan
 * @Date: 2021-10-24 15:59:12
 * @LastEditor: TheJunhan
 * @LastEditTime: 2021-10-25 19:23:42
 */
const {ipcRenderer} = require('electron')
window.addEventListener('DOMContentLoaded', ()=>{
    // 收到消息按钮
    const bt = document.getElementById('startFlickerButton')
    bt.addEventListener('click', ()=>{
        ipcRenderer.send('startFlicker', 'start')
    })
    // 进入主网站
    const gotoWeb = document.getElementById('GoToWebButton')
    gotoWeb.addEventListener('click', ()=>{
        ipcRenderer.send('openDefaultBrowser', 'https://www.baidu.com')
    })
})