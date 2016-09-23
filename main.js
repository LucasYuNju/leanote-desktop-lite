const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;
let baseUrl;
if(process.env.ENV === "development") {
  baseUrl = "http://localhost:9000";
}
else {
  baseUrl = `file://${__dirname}/public`;
}

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    titleBarStyle: 'hidden'
  });
  let url;
  mainWindow.loadURL(`${baseUrl}/login.html`);
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
})
