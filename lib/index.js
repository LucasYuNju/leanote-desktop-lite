const api = require('./api');
const protocol = require('./protocol');

let inited = false;
function init(token) {
  if (!inited) {
  	api.setToken(token);
  	protocol.register();
  }
  inited = true;
}

module.exports.init = init;
