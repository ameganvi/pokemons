/**
 * Webpack config env switching
 */

var envBuild = process.env.ENV === "BUILD" ? true : false;
var envDist = process.env.ENV === "DIST" ? true : false;
var envTest = process.env.ENV === "TEST" ? true : false;

module.exports = require('./webpack.make')({
  BUILD: envBuild,
  DIST: envDist,
  TEST: envTest
});
