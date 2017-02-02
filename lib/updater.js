const extract = require('extract-zip');
const unzip = require('unzip');
const zlib = require('zlib');
const tar = require('tar');
const fetch = require('node-fetch');
const semver = require('semver');
const fs = require('fs');
const path = require('path');

const { download } = require('./util/download');

/**
 * 检查github的release，进行更新
 */

const RELEASE_URL = 'https://api.github.com/repos/LucasYuNju/leanote-desktop-lite/releases/latest'

function fetchLatestRelease() {
  const packageJson = require('../package.json');
  const version = packageJson.version;
  return fetch(RELEASE_URL)
    .then(res => res.json())
    .then(json => {
      const nextVersion = json.name;
      if (!semver.valid(nextVersion) || semver.lte(json.name, packageJson.version)) {
        return;
      }
      if (semver.major(nextVersion) > semver.major(version) || semver.minor(nextVersion) > semver.minor(version)) {
        // major release or minor release，提示用户下载完整安装包
      } else {
        // patch release，下载相应的js和css文件，替换源代码，增量更新
        for(let i = 0; i < json.assets.length; i++) {
          if (json.assets[i].name.toLowerCase() === 'patch.tar.gz') {
            // 下载
            const url = json.assets[i].browser_download_url;
            const dir = path.join(__dirname, '..', 'patch');
            const file = path.join(dir, 'patch.tar.gz');
            if (!fs.existsSync(dir)){
              fs.mkdirSync(dir);
            }
            return download(url, file);
          }
        }
      }
    });
}

function upgradeToLatestRelease() {
  const file = path.join(__dirname, '..', 'patch', 'patch.tar.gz');
  const target = path.join(__dirname, '..', 'patch');

  fs.createReadStream(file)
    .pipe(zlib.createGunzip())
    .pipe(tar.Extract({ path: target }))
    .on("end", function () {
      console.log('done');
    });
}

module.exports = {
  fetchLatestRelease,
  upgradeToLatestRelease
}
