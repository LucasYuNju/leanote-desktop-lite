// https example: https://leanote.com/api/file/getImage?fileId=583fd1f5ab64417032004b51
const httpsRegex = /(https:\/\/leanote\.com\/api\/)(file\/getImage\?fileId=[^"']*)/g;

// leanote example: leanote://file/getImage?fileId=583fd1f5ab64417032004b51
const leanoteRegex = /(leanote:\/\/)(file\/getImage\?fileId=[^"']*)/g;

export function httpsToLeanote(text) {
	const replaced = text.replace(httpsRegex, 'leanote://$2');
	return replaced;
}

export function leanoteToHttps(text) {
  const replaced = text.replace(leanoteRegex, 'https://leanote.com/api/$2');
  return replaced;
}

export function getThumbnail(text) {
  const matches = httpsRegex.exec(text);
  if (matches) {
    return matches[0];
  }
  return null;
}

export function getAbstract(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  const text = div.innerText || div.textContext || '';
  return text.substring(0, 100);
}
