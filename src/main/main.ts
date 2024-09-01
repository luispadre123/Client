import { app, BrowserWindow, ipcMain, Notification, screen } from 'electron';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import Datastore from 'nedb';
import { dialog } from 'electron';

import { execFile } from 'child_process';

let mainWindow: BrowserWindow;
let createRoomWin: BrowserWindow | null = null;
let joinRoomWin: BrowserWindow | null = null;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getStoragePath = () => {
    const userDataPath = app.getPath('userData');
    const storageDir = path.join(userDataPath, 'game_client');

    if (!fs.existsSync(storageDir)) {
        fs.mkdirSync(storageDir, { recursive: true });
    }

    return path.join(storageDir, 'token.json');
};

const db = new Datastore({ filename: path.join(app.getPath('userData'), 'database.db'), autoload: true });

// Cached token para reducir lecturas de disco
let cachedToken: string | null = null;

ipcMain.handle('open-app', async (event, appPath: string) => {
    try {
        execFile(appPath, (error) => {
            if (error) {
                console.error('Error al abrir la aplicación:', error);
            }
        });
    } catch (error) {
        console.error('Error en el manejo de la apertura de la aplicación:', error);
    }
});

ipcMain.handle('select-app', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [{ name: 'Applications', extensions: ['exe', 'app'] }] // Filtro para archivos de aplicaciones
    });

    if (canceled || filePaths.length === 0) {
        return null;
    }

    const selectedAppPath = filePaths[0];
    return selectedAppPath;
});

ipcMain.handle('create-room', async () => {
    await createRoomWindow();
});

ipcMain.handle('join-room', async () => {
    await joinRoomWindow();
});

ipcMain.handle('save-token', async (event, token) => {
    const storagePath = getStoragePath();
    try {
        fs.writeFileSync(storagePath, JSON.stringify({ token }));
        cachedToken = token;  // Cache the token
    } catch (error) {
        console.error('Error al guardar el token:', error);
    }
});

async function loadToken() {
    if (cachedToken !== null) return cachedToken;  // Return cached token if available

    const storagePath = getStoragePath();
    try {
        if (fs.existsSync(storagePath)) {
            const data = fs.readFileSync(storagePath);
            const { token } = JSON.parse(data);
            cachedToken = token;  // Cache the token after reading
            return token;
        }
    } catch (error) {
        console.error('Error al leer el token:', error);
    }
    return null;
}

ipcMain.on('send-notification', (event, { title, body }) => {
    new Notification({ title, body }).show();
});

// Utilizar asincronía efectiva para evitar bloqueos
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

async function createRoomWindow() {
    if (joinRoomWin) {
        joinRoomWin.close();
        joinRoomWin = null;
    }

    if (!createRoomWin) {
        createRoomWin = new BrowserWindow({
            width: 600,
            height: 400,
            parent: mainWindow,
            modal: false,
            show: false,
            webPreferences: {
                preload: path.join(__dirname, '../preload/preload.js'),
                contextIsolation: true,
                enableRemoteModule: false,
                nodeIntegration: false,
                devTools: true,
            },
        });

        createRoomWin.loadURL('http://localhost:5173/create-room');
        createRoomWin.webContents.on('did-finish-load', () => {
            createRoomWin?.show();
        });

        createRoomWin.on('closed', () => {
            createRoomWin = null;
        });
    }
}

async function joinRoomWindow() {
    if (createRoomWin) {
        createRoomWin.close();
        createRoomWin = null;
    }

    if (!joinRoomWin) {
        joinRoomWin = new BrowserWindow({
            width: 600,
            height: 400,
            parent: mainWindow,
            modal: false,
            show: false,
            webPreferences: {
                preload: path.join(__dirname, '../preload/preload.js'),
                contextIsolation: true,
                enableRemoteModule: false,
                nodeIntegration: false,
                devTools: true,
            },
        });

        joinRoomWin.loadURL('http://localhost:5173/join-room');
        joinRoomWin.webContents.on('did-finish-load', () => {
            joinRoomWin?.show();
        });

        joinRoomWin.on('closed', () => {
            joinRoomWin = null;
        });
    }
}

// Main window creation streamlined with token handling
async function createMainWindow() {
    const token = await loadToken();
    const isAuthenticated = token && token !== "undefined";

    const windowOptions = isAuthenticated
        ? { width: 1200, height: 900 }
        : { width: 400, height :480 };

    mainWindow = new BrowserWindow({
        ...windowOptions,
        frame: true,
        backgroundColor: '#ffffff',
        webPreferences: {
            preload: path.join(__dirname, '../preload/preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
            nodeIntegration: false,
            devTools: true,
        },
    });

    mainWindow.loadURL('http://localhost:5173');

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

    if (!ipcMain.eventNames().includes('resize-window')) {
        ipcMain.handle('resize-window', (event, { width, height }) => {
            if (mainWindow && typeof width === 'number' && typeof height === 'number') {
                centerWindow(width, height);
            } else {
                console.error('Invalid width or height for window resize:', { width, height });
            }
        });
    }

    if (!ipcMain.eventNames().includes('load-token')) {
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
                throw error;
            }
            return null;
        });
    }
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

function centerWindow(width: number, height: number) {
    if (typeof width !== 'number' || typeof height !== 'number') {
        console.error('Invalid dimensions for window resize:', { width, height });
        return;
    }

    const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize;
    const x = Math.round((screenWidth - width) / 2);
    const y = Math.round((screenHeight - height) / 2);

    mainWindow.setBounds({ x, y, width, height });
}
