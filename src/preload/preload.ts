window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type]);
  }
});
import { contextBridge, ipcRenderer } from 'electron';



contextBridge.exposeInMainWorld('api', {
  minimizeWindow: () => ipcRenderer.send('minimize-window'),
  closeWindow: () => ipcRenderer.send('close-window'),
  maximizeWindow: () => ipcRenderer.send('maximize-window'),
  unmaximizeWindow: () => ipcRenderer.send('unmaximize-window'),
  onWindowMaximize: (callback: () => void) => ipcRenderer.on('window-maximized', callback),
  onWindowUnmaximize: (callback: () => void) => ipcRenderer.on('window-unmaximized', callback),
  offWindowMaximize: (callback: () => void) => ipcRenderer.removeListener('window-maximized', callback),
  offWindowUnmaximize: (callback: () => void) => ipcRenderer.removeListener('window-unmaximized', callback),
});
