function qs(obj = {}) {
  const esc = encodeURIComponent;
  return Object.keys(obj)
    .map(k => esc(k) + '=' + esc(obj[k]))
    .join('&');
}

module.exports = {
  qs,
};
