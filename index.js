var fs = require('fs');
var semver = require('semver');

/**
 * @param {string} filePath
 * @returns {string}
 */
function getNodeEngine(filePath) {
  var engines;

  try {
    engines = (JSON.parse(fs.readFileSync(filePath, 'utf8')) || {}).engines || {};
  } catch (e) {
    engines = {};
  }

  return engines.node || '*';
}

/**
 * @param {string} version
 * @param {string} range
 * @returns {boolean}
 */
function isValidVersion(version, range) {
  return semver.satisfies(version, range);
}

/**
 * @param {string} packagePath
 */
function checkCompat(packagePath) {
  var rangeSupported = getNodeEngine(packagePath);
  var currentVersion = process.version;

  if (!isValidVersion(currentVersion, rangeSupported)) {
    throw new Error('Unsupported Nodejs version: Expected ' +
        rangeSupported + ', got ' + currentVersion);
  }
}

module.exports = checkCompat;
