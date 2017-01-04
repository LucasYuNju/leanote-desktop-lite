const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const protocol = require('./protocol');

class Application {
  start(options) {
    this.mainWindow = null;
    this.authWindow = null;
    this.devMode = options.devMode;
    this.baseUrl = options.devMode ? 'http://localhost:3000' : `file://${path.join(__dirname, '..', '..', 'static')}`
    this.handleEvents();
  }

  handleEvents() {
    app.on('ready', this.createMainWindow.bind(this));

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    app.on('activate', () => {
      if (this.authWindow === null && this.mainWindow === null) {
        this.createMainWindow();
      }
    });

    ipcMain.on('auth-request', (event, arg) => {
      if (this.mainWindow) {
        this.mainWindow.close();
        this.createAuthWindow();
      }
    });

    ipcMain.on('auth-success', (event, arg) => {
      this.authWindow.close();
      this.createMainWindow();
    });

    ipcMain.on('register-protocol', (event, token) => {
      protocol.register(token);
    });

    // ready-to-show is triggered too early, did-finish-load may be blocked by image downloading
    ipcMain.on('main-window-ready', (event, arg) => {
      setTimeout(() => {
        this.mainWindow.show();
      }, 200);
    });
  }

  createMainWindow() {
    this.mainWindow = new BrowserWindow({
      center: true,
      fullscreenable: false,
      width: 1080,
      height: 680,
      show: this.devMode,
      titleBarStyle: 'hidden-inset',
      useContentSize: true,
      webPreferences: {
        webSecurity: false,
      },
    });
    this.mainWindow.loadURL(path.join(this.baseUrl, 'main.html'));

    this.mainWindow.on('closed', () => {
      this.mainWindow = null;
    });

    // ctrl click链接的时候，会触发new-window事件
    this.mainWindow.webContents.on('new-window', (event) => {
      event.preventDefault();
    });
  }

  createAuthWindow() {
    this.authWindow = new BrowserWindow({
      center: true,
      fullscreenable: false,
      resizable: this.devMode,
      width: 320,
      height: 420,
      show: false,
      titleBarStyle: 'hidden',
      webPreferences: {
        webSecurity: false,
      },
    });
    this.authWindow.loadURL(path.join(this.baseUrl, 'auth.html'));

    this.authWindow.on('ready-to-show', () => {
      this.authWindow.show();
    });

    this.authWindow.on('closed', function () {
      this.authWindow = null;
    });
  }
}

module.exports = Application;
