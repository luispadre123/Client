import { app, BrowserWindow, ipcMain, Notification } from 'electron';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

let mainWindow: BrowserWindow;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Ruta para almacenar el token en el directorio de datos del usuario
const getStoragePath = () => {
  const userDataPath = app.getPath('userData');
  const storageDir = path.join(userDataPath, 'game_client');

  if (!fs.existsSync(storageDir)) {
    fs.mkdirSync(storageDir, { recursive: true });
  }

  return path.join(storageDir, 'token.json');
};

// Guardar el token
ipcMain.handle('save-token', async (event, token) => {
  const storagePath = getStoragePath();
  try {
    fs.writeFileSync(storagePath, JSON.stringify({ token }));
  } catch (error) {
    console.error('Error al guardar el token:', error);
  }
});

// Leer el token
ipcMain.handle('load-token', async () => {
  const storagePath = getStoragePath();
  try {
    if (fs.existsSync(storagePath)) {
      const data = fs.readFileSync(storagePath);
      const { token } = JSON.parse(data);
      return token;
    }
  } catch (error) {
    console.error('Error al leer el token:', error);
  }
  return null;
});

// Manejar las notificaciones
ipcMain.on('send-notification', (event, { title, body }) => {
  new Notification({ title, body }).show();
});

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 550,
    frame: true,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, '../preload/preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    },
  });

  mainWindow.loadURL('http://localhost:5173');
  // Mostrar la ventana cuando el contenido esté listo
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
  });

  mainWindow.on('maximize', () => {
    mainWindow.webContents.send('window-maximized');
  });

  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send('window-unmaximized');
  });

  ipcMain.on('minimize-window', () => {
    mainWindow.minimize();
  });

  ipcMain.on('close-window', () => {
    mainWindow.close();
  });

  ipcMain.on('maximize-window', () => {
    mainWindow.maximize();
  });

  ipcMain.on('unmaximize-window', () => {
    mainWindow.unmaximize();
  });
}

app.whenReady().then(createMainWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});
