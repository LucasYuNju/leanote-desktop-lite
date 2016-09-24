const ipc = require('electron').ipcRenderer;

function toLogin() {
  ipc.send('show-login');
}

function init() {
  Service.user.init((userInfo) => {
    if (userInfo) {
      const $element = document.getElementById('username');
      $element.innerHTML = userInfo.Username;
    }
    else {
      toLogin();
    }
  });
}

export default init;
