import { app, BrowserWindow, ipcMain, Notification, screen } from 'electron';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import Datastore from 'nedb';

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

// Inicializar NeDB
const db = new Datastore({ filename: path.join(app.getPath('userData'), 'database.db'), autoload: true });

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
async function loadToken() {
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
}

// Manejar las notificaciones
ipcMain.on('send-notification', (event, { title, body }) => {
  new Notification({ title, body }).show();
});

// Funciones de NeDB

ipcMain.handle('insert-document', async (event, doc) => {
  return new Promise((resolve, reject) => {
    db.insert(doc, (err, newDoc) => {
      if (err) {
        console.error('Error al insertar documento:', err);
        reject(err);
      } else {
        resolve(newDoc);
      }
    });
  });
});

ipcMain.handle('get-document', async (event, id) => {
  return new Promise((resolve, reject) => {
    db.findOne({ _id: id }, (err, doc) => {
      if (err) {
        console.error('Error al obtener documento:', err);
        reject(err);
      } else {
        resolve(doc);
      }
    });
  });
});

ipcMain.handle('get-all-documents', async () => {
  return new Promise((resolve, reject) => {
    db.find({}, (err, docs) => {
      if (err) {
        console.error('Error al obtener todos los documentos:', err);
        reject(err);
      } else {
        resolve(docs);
      }
    });
  });
});

ipcMain.handle('update-document', async (event, id, updates) => {
  return new Promise((resolve, reject) => {
    db.update({ _id: id }, { $set: updates }, {}, (err, numReplaced) => {
      if (err) {
        console.error('Error al actualizar documento:', err);
        reject(err);
      } else {
        resolve(numReplaced);
      }
    });
  });
});

ipcMain.handle('delete-document', async (event, id) => {
  return new Promise((resolve, reject) => {
    db.remove({ _id: id }, {}, (err, numRemoved) => {
      if (err) {
        console.error('Error al eliminar documento:', err);
        reject(err);
      } else {
        resolve(numRemoved);
      }
    });
  });
});

async function createMainWindow() {
  // Cargar el token antes de crear la ventana
  const token = await loadToken();
  const isAuthenticated = token && token !== "undefined";

  // Definir dimensiones dependiendo de la autenticación
  const windowOptions = isAuthenticated
      ? { width: 1200, height: 900 }  // Tamaño para usuarios autenticados
      : { width: 400, height: 480 }; // Tamaño para no autenticados

  mainWindow = new BrowserWindow({
    // ...windowOptions,
    frame: true,
    webPreferences: {
      preload: path.join(__dirname, '../preload/preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
      devTools: true
    },
  });

  mainWindow.loadURL('http://localhost:5173');

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

  ipcMain.on('resize-window', (event, { width, height }) => {
    if (mainWindow) {
      mainWindow.setSize(width, height);
    }
  });

  ipcMain.handle('resize-window', (event, width, height) => {
    centerWindow(width, height);
  });

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

// Función para centrar la ventana en la pantalla
function centerWindow(width: number, height: number) {
  const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize;
  const x = Math.round((screenWidth - width) / 2);
  const y = Math.round((screenHeight - height) / 2);

  mainWindow.setBounds({ x, y, width, height });
}
