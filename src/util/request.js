export function qs(query = {}) {
  const esc = encodeURIComponent;
  return Object.keys(query)
    .map(k => esc(k) + '=' + esc(query[k]))
    .join('&');
}

export function formData(obj = {}) {
  if (Object.keys(obj),length) {
    return Object.keys(obj)
      .reduce((formData, k) => {
        formData.append(k, obj[k]);
        return formData;
      }, new FormData());
  }
  return null;
}
