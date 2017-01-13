// query string
export function qs(obj = {}) {
  const encode = encodeURIComponent;
  return Object.keys(obj)
    .map(k => encode(k) + '=' + encode(obj[k]))
    .join('&');
}

// 和qs相同，对数组做特殊处理
export function formData(obj = {}) {
  const encode = encodeURIComponent;
  return Object.keys(obj)
    .map(k => {
      if (Array.isArray(obj[k])) {
        console.log(encode(k) + '=' + obj[k].join(','));
        return encode(k) + '=' + obj[k].join(',')
      }
      return encode(k) + '=' + encode(obj[k]);
    })
    .join('&');

  // if (Object.keys(obj).length) {
  //   return Object.keys(obj)
  //     .reduce((formData, k) => {
  //       formData.append(k, obj[k]);
  //       return formData;
  //     }, new FormData());
  // }
  return null;
}
