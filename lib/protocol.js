const { app, protocol } = require('electron').remote;
const { getImage } = require('./api');

function unregister(callback) {
	protocol.unregisterProtocol('leanote', function () {
		callback();
	});
}

function register() {
	unregister(() => {
		protocol.registerHttpProtocol('leanote', function(request, callback) {
			var url = request.url;
			var matches = /fileId=([a-zA-Z0-9]{24})/.exec(url);
			if (matches && matches[1]) {
				const url = getImage(matches[1]);
				callback({
					url,
					method: 'GET',
				});
			}
			else {
				console.error('invalid file path', request);
			}
		}, function (error) {
			if (error) {
				console.error(error);
			}
		});
	});
}

module.exports = {
	register,
	unregister,
};
