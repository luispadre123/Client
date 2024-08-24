import { contextBridge, ipcRenderer } from 'electron';

// Exponer funciones a través de contextBridge para ser usadas en React
contextBridge.exposeInMainWorld('api', {
  minimizeWindow: () => ipcRenderer.send('minimize-window'),
  closeWindow: () => ipcRenderer.send('close-window'),
  maximizeWindow: () => ipcRenderer.send('maximize-window'),
  unmaximizeWindow: () => ipcRenderer.send('unmaximize-window'),
  onWindowMaximize: (callback) => ipcRenderer.on('window-maximized', callback),
  onWindowUnmaximize: (callback) => ipcRenderer.on('window-unmaximized', callback),
  offWindowMaximize: (callback) => ipcRenderer.removeListener('window-maximized', callback),
  offWindowUnmaximize: (callback) => ipcRenderer.removeListener('window-unmaximized', callback),

  // Funciones de manejo de tokens
  saveToken: (token) => ipcRenderer.invoke('save-token', token),
  loadToken: () => ipcRenderer.invoke('load-token'),

  // Función para enviar notificaciones
  sendNotification: (title, body) => ipcRenderer.send('send-notification', { title, body }),

  // Funciones de NeDB
  insertDocument: (doc) => ipcRenderer.invoke('insert-document', doc),
  getDocument: (id) => ipcRenderer.invoke('get-document', id),
  getAllDocuments: () => ipcRenderer.invoke('get-all-documents'),
  updateDocument: (id, updates) => ipcRenderer.invoke('update-document', id, updates),
  deleteDocument: (id) => ipcRenderer.invoke('delete-document', id),
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
