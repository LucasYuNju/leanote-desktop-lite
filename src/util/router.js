import toRegex from 'path-to-regexp';

export function parseUrl(pattern, url) {
  const keys = [];
  const regex = toRegex(pattern, keys);
  const match = regex.exec(url);
  if (!match) {
		return {};
	}
  const params = Object.create(null);
  for (let i = 1; i < match.length; i++) {
    params[keys[i - 1].name] = match[i] !== undefined ? match[i] : undefined;
  }
  return params;
}
