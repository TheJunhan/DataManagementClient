/*
 * @Copyrights: 2021 @TheJunhan
 * @Date: 2021-10-26 10:48:35
 * @LastEditor: TheJunhan
 * @LastEditTime: 2021-10-26 10:54:55
 */
const {ipcRenderer} = require('electron');
window.addEventListener('DOMContentLoaded', 
() => {
    // 登录
    const loginButton = document.getElementById('loginButton')
    const username = document.getElementById('username')
    const password = document.getElementById('password')
    username.value = '高压锅大神'
    password.value = 'xixixxixi'
    const rememberBox = document.getElementById('rememberMe')
    loginButton.addEventListener('click', ()=>{
        const arg = new Array()
        arg[0] = username.value
        arg[1] = password.value
        arg[2] = rememberBox.checked
        ipcRenderer.send('on-click-login', arg)
    })
})