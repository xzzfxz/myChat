import {contextBridge, ipcRenderer} from 'electron'

// 暴露变量
contextBridge.exposeInMainWorld('store', {
  test: 'abc'
})

// 进程间通信
contextBridge.exposeInMainWorld('ipcRenderer', {
  // 双向，会等待主进程返回消息
  test: (options) =>
    ipcRenderer.invoke('eventName', options),
  // 单向，只会向主进程发送消息
  testSend: (options) => ipcRenderer.send('sendEvent', options)
});

// 静态方法
contextBridge.exposeInMainWorld('proxy', {
  test: () => {}
});