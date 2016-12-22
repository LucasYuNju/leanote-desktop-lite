const { remote } = require('electron');
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
    console.log('client x y', event.clientX, event.clientY, rect);
    if (dropdown) {
      this._menu.popup(remote.getCurrentWindow(), rect.left - 1, parseInt(rect.bottom) + 6);
    }
    else {
      this._menu.popup(remote.getCurrentWindow(), event.clientX - 10, parseInt(rect.top - this._menuHeight));
    }
  }
}

export default SystemMenu;
