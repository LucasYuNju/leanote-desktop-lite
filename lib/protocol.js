const { protocol } = require('electron');

const { qs } = require('./util');

const defaultUrl = 'https://leanote.com';
const leanoteUrl = defaultUrl;
let token = null;

function getImage(fileId) {
  const query = qs({
    fileId,
    token,
  });
  return `${leanoteUrl}/api/file/getImage?${query}`;
}

function unregister(callback) {
	protocol.unregisterProtocol('leanote', function () {
		callback();
	});
}

function register(userToken) {
  console.log('####### register token', userToken);
  if (token === userToken) {
    return;
  }
  token = userToken;
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
