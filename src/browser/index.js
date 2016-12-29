const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const protocol = require('./protocol');

let mainWindow;
let authWindow;
const DEV = process.env.NODE_ENV === 'development';
const BASE_URL = DEV ? 'http://localhost:3000' : `file://${path.join(__dirname, '..', '..', 'static')}`;

function createAuthWindow() {
  authWindow = new BrowserWindow({
    center: true,
    fullscreenable: false,
    resizable: DEV,
    width: 320,
    height: 420,
    show: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      webSecurity: false,
    },
  });
  authWindow.loadURL(path.join(BASE_URL, 'auth.html'));

  authWindow.on('ready-to-show', () => {
    authWindow.show();
  });

  authWindow.on('closed', function () {
    authWindow = null;
  });
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    center: true,
    fullscreenable: false,
    width: 1080,
    height: 680,
    show: DEV,
    titleBarStyle: 'hidden-inset',
    useContentSize: true,
    webPreferences: {
      webSecurity: false,
    },
  });
  mainWindow.loadURL(path.join(BASE_URL, 'main.html'));

  mainWindow.once('ready-to-show', () => {

  });

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createMainWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (authWindow === null && mainWindow === null) {
    createMainWindow();
  }
});

ipcMain.on('auth-request', (event, arg) => {
  if (mainWindow) {
    mainWindow.close();
    createAuthWindow();
  }
});

ipcMain.on('auth-success', (event, arg) => {
  authWindow.close();
  createMainWindow();
});

ipcMain.on('register-protocol', (event, token) => {
  protocol.register(token);
});

// ready-to-show is triggered too early, did-finish-load may be blocked by image downloading
ipcMain.on('main-window-ready', (event, arg) => {
  setTimeout(() => {
    mainWindow.show();
  }, 200);
});
