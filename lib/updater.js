const extract = require('extract-zip');
const unzip = require('unzip');
const zlib = require('zlib');
const tar = require('tar');
const fetch = require('node-fetch');
const semver = require('semver');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');

const { download } = require('./util/download');

/**
 * 检查github的release，进行更新
 */

const APP_ROOT_DIR = path.resolve(__dirname, '..');
const PATCH_DIR = path.resolve(__dirname, '..', 'patch');
const RELEASE_URL = 'https://api.github.com/repos/LucasYuNju/leanote-desktop-lite/releases/latest';

let nextVersion = null;

function fetchLatestRelease() {
  const packageJson = require('../package.json');
  const version = packageJson.version;
  return fetch(RELEASE_URL)
    .then(res => res.json())
    .then(json => {
      nextVersion = json.name;
      if (!semver.valid(nextVersion) || semver.lte(json.name, packageJson.version)) {
        return;
      }
      if (semver.major(nextVersion) > semver.major(version) || semver.minor(nextVersion) > semver.minor(version)) {
        // major release or minor release，提示用户下载完整安装包
      } else {
        // patch release，下载源代码，增量更新
        for(let i = 0; i < json.assets.length; i++) {
          if (json.assets[i].name.toLowerCase() === 'patch.tar.gz') {
            // 下载
            const url = json.assets[i].browser_download_url;
            const file = path.join(PATCH_DIR, `${nextVersion}.tar.gz`);
            if (!fs.existsSync(PATCH_DIR)) {
              fs.mkdirSync(PATCH_DIR);
            }
            const message = {
              content: json.body,
              version,
              nextVersion,
              isPatch: true,
            };
            if (fs.existsSync(file)) {
              return message;
            }
            return download(url, file).then(() => message);
          }
        }
      }
    });
}

function updateToLatestRelease() {
  const file = path.join(PATCH_DIR, `${nextVersion}.tar.gz`);
  if (!nextVersion || !fs.existsSync(file)) {
    return;
  }
  // TODO: clean up
  fs.createReadStream(file)
    .pipe(zlib.createGunzip())
    .pipe(tar.Extract({ path: PATCH_DIR }))
    .on("end", function () {
      console.log(APP_ROOT_DIR);
      console.log(PATCH_DIR);
      if (fs,existsSync(path.join(PATCH_DIR, 'static'))) {
        fse.move(path.join(PATCH_DIR, 'static'), path.join(APP_ROOT_DIR, 'static'))
        console.log('static pathed');
      }
      if (fs,existsSync(path.join(PATCH_DIR, 'package.json'))) {

      }
    });
}

module.exports = {
  fetchLatestRelease,
  updateToLatestRelease
}
