const electron = require('electron');
const ipc = electron.ipcMain;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow, loginWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    titleBarStyle: 'hidden',
  });
  // 使用loadURL(`http:xxx`)的话，影响renderer process的node模块加载
  mainWindow.loadURL(`file://${__dirname}/public/index.html`);

  loginWindow = new BrowserWindow({
    width: 280,
    height: 375,
    titleBarStyle: 'hidden',
    show: false,
  });
  loginWindow.loadURL(`file://${__dirname}/public/login.html`);
  
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

ipc.on("show-login", () => {
  mainWindow.hide();
  loginWindow.show();
});

ipc.on("show-note", () => {
  loginWindow.hide();
  mainWindow.show();
});
