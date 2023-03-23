import { app, BrowserWindow } from 'electron';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 300,
    height: 200,
    webPreferences: {
      sandbox: true,
      // 是否开启隔离上下文
      contextIsolation: true,
      // 渲染进程使用Node API
      nodeIntegration: false,
    },
  });
  const url = 'http://localhost:5173/#/';
  win.loadURL(url);
};

app.whenReady().then(() => {
  createWindow();
});
