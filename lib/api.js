// static file related service

const defaultUrl = 'https://leanote.com';
const leanoteUrl = defaultUrl;

let userId = null;
let token = null;

function setUser(value) {
	userId = value;
}

function setToken(value) {
	token = value;
}

function getUrl(url, param) {
	var url = leanoteUrl + '/api/' + url;
	param = param || {};
	param.token = token;
	var paramStr = '';
	for(var i in param) {
		paramStr += i + '=' + param[i] + '&';
	}
	if(url.indexOf('?') >= 0) {
		url =  url + '&' + paramStr;
	}
	else {
		url =  url + '?' + paramStr;
	}
	return url;
}

function getImage(fileId, callback) {
	const url = getUrl('file/getImage', { fileId });
	return url;
}

module.exports = {
	setUser,
	setToken,
	getImage,
}
