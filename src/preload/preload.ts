import { contextBridge, ipcRenderer } from 'electron';

// Exponer funciones a través de contextBridge para ser usadas en React
contextBridge.exposeInMainWorld('api', {
  // Control de ventanas
  minimizeWindow: () => ipcRenderer.send('minimize-window'),
  closeWindow: () => ipcRenderer.send('close-window'),
  maximizeWindow: () => ipcRenderer.send('maximize-window'),
  unmaximizeWindow: () => ipcRenderer.send('unmaximize-window'),
  onWindowMaximize: (callback: () => void) => ipcRenderer.on('window-maximized', callback),
  onWindowUnmaximize: (callback: () => void) => ipcRenderer.on('window-unmaximized', callback),
  offWindowMaximize: (callback: () => void) => ipcRenderer.removeListener('window-maximized', callback),
  offWindowUnmaximize: (callback: () => void) => ipcRenderer.removeListener('window-unmaximized', callback),

  // Funciones de manejo de tokens
  saveToken: (token: string) => ipcRenderer.invoke('save-token', token),
  loadToken: () => ipcRenderer.invoke('load-token'),

  // Función para enviar notificaciones
  sendNotification: (title: string, body: string) => ipcRenderer.send('send-notification', { title, body }),

  // Configuración STUN/TURN para WebRTC
  getIceServers: () => {
    return [
      { urls: 'stun:swift-cloths-search.loca.lt:3478' },
      { urls: 'turn:swift-cloths-search.loca.lt:3478', username: 'exampleuser', credential: 'examplepassword' }
    ];
  }
});


window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type]);
  }
});
