"use strict";
const electron = require("electron");
const createWindow = () => {
  const win = new electron.BrowserWindow({
    width: 300,
    height: 200,
    webPreferences: {
      sandbox: true,
      // 是否开启隔离上下文
      contextIsolation: true,
      // 渲染进程使用Node API
      nodeIntegration: false
    }
  });
  const url = "http://localhost:5173/#/";
  win.loadURL(url);
};
electron.app.whenReady().then(() => {
  createWindow();
});
//# sourceMappingURL=index.js.map
