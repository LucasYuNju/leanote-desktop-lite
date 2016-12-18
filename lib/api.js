// static file related service
const defaultUrl = 'https://leanote.com';
const leanoteUrl = defaultUrl;

let token = null;

function setToken(value) {
	token = value;
}

function getImage(fileId, callback) {
	const url = getUrl('file/getImage', { fileId });
	return url;
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

module.exports = {
	setUser,
	setToken,
	getImage,
}
