const httpsFileRegex = /(https:\/\/leanote\.com\/api\/)(file\/getImage\?fileId=[^&"]*)/g;

export function httpsToLeanote(text) {
	const replaced = text.replace(httpsFileRegex, 'leanote://$2');
	return replaced;
}

export function leanoteToHttps(text) {

}
