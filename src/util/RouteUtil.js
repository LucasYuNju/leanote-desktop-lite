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
  const { path, query } = route;
  let result = path.join('/');
  let queryArr = [];
  if (query && typeof query === 'object') {
    queryArr = Object.keys(query).sort()
      .filter(key => query[key] !== null)
      .map(key => `${key}=${query[key]}`);
  }
  if (queryArr.length > 0) {
    result += `?${queryArr.join('&')}`;
  }
  return result;
}
