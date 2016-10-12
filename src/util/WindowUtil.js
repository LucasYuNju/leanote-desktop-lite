const window = require('electron').remote.getCurrentWindow();

class WindowUtil {
  static setProperties(options) {
    const {
      resizable,
      width,
      height,
    } = options;
    if (resizable !== undefined && resizable !== null) {
      window.setResizable(resizable);
    }
    if (width && height) {
      window.setSize(width, height);
    }
    window.center();
  }
}

export default WindowUtil;
