 /**
  * 简化版querystring
  */
export function qs(obj = {}) {
  const encode = encodeURIComponent;
  return Object.keys(obj)
    .map(k => encode(k) + '=' + encode(obj[k]))
    .join('&');
}

/**
 * 和qs类似，用于发送application/x-www-urlencoded表单
 */
export function urlencode(obj = {}) {
  return stringify(obj);
}

// 拷贝自needle，为了保证encode结果和leanote-desktop完全一致
function stringify(obj, prefix) {
  if (prefix && (obj === null || typeof obj == 'undefined')) {
    return prefix + '=';
  } else if (obj.constructor == Array) {
    return stringifyArray(obj, prefix);
  } else if (obj !== null && typeof obj == 'object') {
    return stringifyObject(obj, prefix);
  } else if (prefix) { // string inside array or hash
    return prefix + '=' + encodeURIComponent(String(obj));
  } else if (String(obj).indexOf('=') !== -1) { // string with equal sign
    return String(obj);
  } else {
    throw new TypeError('Cannot build a querystring out of: ' + obj);
  }
};

function stringifyArray(arr, prefix) {
  var ret = [];

  for (var i = 0, len = arr.length; i < len; i++) {
    if (prefix)
      ret.push(stringify(arr[i], prefix + '[' + i + ']'));
    else
      ret.push(stringify(arr[i]));
  }

  return ret.join('&');
}

function stringifyObject(obj, prefix) {
  var ret = [];

  Object.keys(obj).forEach(function(key) {
    ret.push(stringify(obj[key], prefix
      ? prefix + '[' + encodeURIComponent(key) + ']'
      : encodeURIComponent(key)));
  })

  return ret.join('&');
}
