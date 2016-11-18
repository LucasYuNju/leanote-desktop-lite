import toRegex from 'path-to-regexp';

export function parseUrl(pattern, url) {
	if (!pattern.startsWith("#")) {
		pattern = "#" + pattern;
	}
  const keys = [];
  const regex = toRegex(pattern, keys);
  const match = regex.exec(url);
  if (!match) {
		return null;
	}
  const params = Object.create(null);
  for (let i = 1; i < match.length; i++) {
    params[keys[i - 1].name] =
      match[i] !== undefined ? match[i] : undefined;
  }
  return params;
}

export function constructUrl(route) {
	return '#/' + route.join('/');
}

export function destructUrl(route) {
	const regex = /\/([^\/]*)/g;
	const result = [];
	let matches = null;
	while(matches = regex.exec(route)) {
		result.push(matches[0]);
	}
	return result;
}

// console.log(parseUrl('/:type*/:id*', '#/'));
// console.log(parseUrl('/:type/:id', '#/notebooks/57b2c855ab644133ed050e63'));
// console.log(parseUrl('#/*', '#/notebooks'));
// console.log(parseUrl('#/notebooks/*', '#/notebooks/a/b/c'));
