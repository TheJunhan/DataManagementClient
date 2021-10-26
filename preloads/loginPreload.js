/*
 * @Copyrights: 2021 @TheJunhan
 * @Date: 2021-10-20 16:06:14
 * @LastEditor: TheJunhan
 * @LastEditTime: 2021-10-26 14:11:33
 */
const {ipcRenderer} = require('electron');
window.addEventListener('DOMContentLoaded', 
() => {
    // 登录
    const loginButton = document.getElementById('loginButton')
    const username = document.getElementById('username')
    const password = document.getElementById('password')
    const rememberBox = document.getElementById('rememberMe')
    loginButton.addEventListener('click', ()=>{
        loginButton.innerText = '点了'
        let arg = new Array()
        arg[0] = username.value
        arg[1] = password.value
        ipcRenderer.send('on-click-login', arg)
    })
})