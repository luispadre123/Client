import { contextBridge, ipcRenderer } from 'electron';

// Exponer funciones a través de contextBridge para ser usadas en React
contextBridge.exposeInMainWorld('api', {
    selectApp: () => ipcRenderer.invoke('select-app'),
    openApp: (appPath: string) => ipcRenderer.invoke('open-app', appPath),

    minimizeWindow: () => ipcRenderer.send('minimize-window'),
    closeWindow: () => ipcRenderer.send('close-window'),
    maximizeWindow: () => ipcRenderer.send('maximize-window'),
    unmaximizeWindow: () => ipcRenderer.send('unmaximize-window'),
    onWindowMaximize: (callback) => ipcRenderer.on('window-maximized', callback),
    onWindowUnmaximize: (callback) => ipcRenderer.on('window-unmaximized', callback),
    offWindowMaximize: (callback) => ipcRenderer.removeListener('window-maximized', callback),
    offWindowUnmaximize: (callback) => ipcRenderer.removeListener('window-unmaximized', callback),
    saveToken: (token) => ipcRenderer.invoke('save-token', token),
    loadToken: () => ipcRenderer.invoke('load-token'),
    resizeWindow: (width, height) => ipcRenderer.invoke('resize-window', { width, height }),
    sendNotification: (title, body) => ipcRenderer.send('send-notification', { title, body }),
    insertDocument: (doc) => ipcRenderer.invoke('insert-document', doc),
    getDocument: (id) => ipcRenderer.invoke('get-document', id),
    getAllDocuments: () => ipcRenderer.invoke('get-all-documents'),
    updateDocument: (id, updates) => ipcRenderer.invoke('update-document', id, updates),
    deleteDocument: (id) => ipcRenderer.invoke('delete-document', id),
    createRoom: () => ipcRenderer.invoke('create-room'),
    joinRoom: () => ipcRenderer.invoke('join-room'),
    openSettings: () => ipcRenderer.invoke('open-settings'),
});
