const remote = require('electron').remote;
const { Menu, MenuItem } = require('electron').remote;

class SystemMenu {
  constructor(template) {
    if (template) {
      this._menu = Menu.buildFromTemplate(template);
      this._menuHeight = 4;
      template.forEach((menuItem, i) => {
        if (menuItem.type === 'separator') {
          if (i !== 0 && i !== template.length - 1) {
            this._menuHeight += 10;            
          }
        }
        else {
          this._menuHeight += 19;
        }
      });
    }
    else {
      throw new Error(`Menu template is required`);
    }
  }
  
  popupAt(x, y) {
    this._menu.popup(remote.getCurrentWindow(), x, y);
  }
  
  popup(event, dropdown = true) {
    const targetDOM = event.currentTarget;
    const rect = targetDOM.getBoundingClientRect();
    if (dropdown) {
      this._menu.popup(remote.getCurrentWindow(), event.clientX, rect.bottom);
    }
    else {
      this._menu.popup(remote.getCurrentWindow(), event.clientX, rect.top - this._menuHeight);
    }
  }
}

export default SystemMenu;
