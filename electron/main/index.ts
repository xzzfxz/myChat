import { app, BrowserWindow } from 'electron';
import path from 'path';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      sandbox: true,
      // 是否开启隔离上下文
      contextIsolation: true,
      // 渲染进程使用Node API
      nodeIntegration: false,
      preload: '../main/index.js',
    },
  });
  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, './index.html'), { hash: 'login' });
  } else {
    const url = 'http://localhost:5173/';
    win.webContents.openDevTools();
    win.loadURL(url);
  }
};

app.whenReady().then(() => {
  createWindow();
});
