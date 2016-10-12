const { app, BrowserWindow } = require('electron');

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    center: true,
    fullscreenable: false,
    width: 1000,
    height: 660,
    show: true,
    titleBarStyle: 'hidden-inset',
  });
  // 使用loadURL(`http:xxx`)的话，影响renderer process加载node模块
  mainWindow.loadURL(`file://${__dirname}/dist/index.html`);

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
