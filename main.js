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
  // remote pages have no node integration
  authWindow.loadURL(`file://${__dirname}/dist/auth.html`);

  authWindow.on('ready-to-show', () => {
    authWindow.show();
  })

  authWindow.on('closed', function () {
    authWindow = null;
  });
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    center: true,
    fullscreenable: false,
    width: 1000,
    height: 660,
    show: false,
    titleBarStyle: 'hidden-inset',
  });
  // 使用loadURL(`http:xxx`)的话，影响renderer process加载node模块
  mainWindow.loadURL(`file://${__dirname}/dist/main.html`);

  // mainWindow.once('did-finish-load', () => {
  //   mainWindow.show();
  // });
  
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

ipcMain.on('main-window-ready', (event, arg) => {
  setTimeout(() => {
    mainWindow.show();    
  }, 100);
});
