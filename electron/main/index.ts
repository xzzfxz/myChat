import { app, BrowserWindow, ipcMain } from 'electron';
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
      preload: path.join(__dirname, '../preload/index.js'),
    },
  });
  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, '../front/index.html'), {
      hash: 'login',
    });
  } else {
    const url = 'http://localhost:5173/#/login';
    win.webContents.openDevTools();
    win.loadURL(url);
  }
};

app.whenReady().then(() => {
  createWindow();
});

// 监听渲染层的事件(双向)
ipcMain.handle('eventName', async (e: Event, data: string) => {
  return {};
});
// 单向
ipcMain.on('sendEvent', (e: Event, data: any) => {});
