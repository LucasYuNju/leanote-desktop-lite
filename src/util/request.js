// query string
export function qs(obj = {}) {
  const esc = encodeURIComponent;
  return Object.keys(obj)
    .map(k => esc(k) + '=' + esc(obj[k]))
    .join('&');
}

export function formData(obj = {}) {
  if (Object.keys(obj).length) {
    return Object.keys(obj)
      .reduce((formData, k) => {
        formData.append(k, obj[k]);
        return formData;
      }, new FormData());
  }
  return null;
}
