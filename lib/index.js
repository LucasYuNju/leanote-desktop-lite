const protocol = require('./protocol');

let inited = false;
function init(token) {
  if (!inited) {
  	protocol.register(token);
  }
  inited = true;
}

module.exports = {
  init,
};
