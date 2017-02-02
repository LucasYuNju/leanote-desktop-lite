const https = require('https');
const fs = require('fs');
const request = require('request');
// 下载涉及https和重定向，使用request要比http(s)更方便

function download(url, dest) {
  return new Promise((resolve, reject) => {
    request(url)
      .pipe(fs.createWriteStream(dest))
      .on('close', resolve)
      .on('error', err => {
        fs.unlink(dest);  // Delete the file async. (But we don't check the result)
        reject(err.message);
      });
  });
};

module.exports = {
  download,
};
