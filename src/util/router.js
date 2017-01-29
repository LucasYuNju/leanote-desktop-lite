import toRegex from 'path-to-regexp';

function parseParams(pattern, url) {
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

export function parseHash(hash) {
  const params = parseParams('#/:subject/:noteStackType?-:noteStackId?/:noteId?', hash);
  if (Object.keys(params).length) {
    return params;
  }
  // path-to-regex的问题，处理不了带连字符的情况，只能分两种情况分别parse
  return parseParams('#/:subject/*', hash);
}
