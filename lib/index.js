const api = require('./api');
const protocol = require('./protocol');

function init(userId, token) {
	api.setUser(userId);
	api.setToken(token);
	protocol.register();
}

module.exports.init = init;
