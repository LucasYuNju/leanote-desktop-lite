const { app, BrowserWindow, ipcMain } = require('electron');

let mainWindow;
let authWindow;

function createAuthWindow() {
  authWindow = new BrowserWindow({
    center: true,
    fullscreenable: false,
    resizable: process.env.ENV === 'development',
    width: 320,
    height: 420,
    show: false,
    titleBarStyle: 'hidden',
  });
  // remote pages do not have node integration
  authWindow.loadURL(`file://${__dirname}/dist/auth.html`);

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
    show: process.env.ENV === 'development',
    titleBarStyle: 'hidden-inset',
    useContentSize: true,
  });
  mainWindow.loadURL(`file://${__dirname}/dist/main.html`);

  mainWindow.once('ready-to-show', () => {
    
  });
  
  mainWindow.on('closed', function () {
    mainWindow = null;
  });  
}

// app.commandLine.appendSwitch('disable-renderer-backgrounding');

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

ipcMain.on('auth-requested', (event, arg) => {
  mainWindow.close();
  createAuthWindow();
});

ipcMain.on('auth-succeeded', (event, arg) => {
  authWindow.close();    
  createMainWindow();
});

// ready-to-show is too early, did-finish-load may be blocked by image downloading
ipcMain.on('main-window-ready', (event, arg) => {
  setTimeout(() => {
    mainWindow.show();    
  }, 200);
});
