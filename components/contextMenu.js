/*
 * @Copyrights: 2021 @TheJunhan
 * @Date: 2021-10-25 15:29:39
 * @LastEditor: TheJunhan
 * @LastEditTime: 2021-10-26 14:46:52
 */
const {Menu, app} = require('electron')
class ContextMenu {
    constructor() {
        this.menu = Menu.buildFromTemplate([
            {label: '退出', icon: './img/exit.png', click: ()=>app.exit(0)}
        ])
    }
    getMenu() {
        return this.menu;
    }
}
module.exports = ContextMenu