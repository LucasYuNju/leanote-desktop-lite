const fetch = require('node-fetch');
const semver = require('semver');

/**
 * 检查github的release，如果是revision更新，下载相应的js和css文件，替换源代码，增量更新
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
      console.log(__dirname);
      if (semver.major(nextVersion) > semver.major(version) || semver.minor(nextVersion) > semver.major(version)) {
        // marjor release or minor release
      } else {
        // patch release
        json.assets.map(asset => asset.name);
      }
    })
}

function upgradeToLatestRelease() {

}


module.exports = {
  fetchLatestRelease,
  upgradeToLatestRelease
}
