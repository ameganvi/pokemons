'use strict';

// Modules
var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var LiveReloadPlugin = require('webpack-livereload-plugin');
var VersionFile = require('webpack-version-file-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
// Utils
function clone(obj) {
  if (null == obj || "object" != typeof obj) return obj;
  var copy = obj.constructor();
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  return copy;
}

/**
 * WEBPACK CONF
 */
module.exports = function makeWebpackConfig(options) {
  var packageFile = path.join(__dirname.replace('.config', ''), 'package.json');
  var buildDirectory = __dirname.replace('.config', '') + '/build';
  var appVersion = JSON.stringify(require(packageFile).version).replace(/\"/g, '');
  var conf = {

    BUILD: {
      entry: {
        main: [
          './src/index.js',
          './src/app/modules/home/home.module.js',
          './src/app/modules/random-pokemon/random-pokemon.module.js'
        ]
      },
      output: {
        path: __dirname.replace('.config', '') + '/build',
        publicPath: 'http://localhost:3000/', // Output path from the view of the page
        filename: '[name].' + appVersion + '.bundle.js', // Filename for entry points
        chunkFilename: '[name].' + appVersion + '.bundle.js' // Filename for non-entry points
      },
      devtool: 'eval',
      module: {}, // Defined below
      postcss: [ // Add vendor prefixes to your css
        autoprefixer({
          browsers: ['last 2 version']
        })
      ],
      plugins: [
        // Extract css files
        // Disabled when in test mode or not in build mode
        new CleanWebpackPlugin(['build'],{
          root: __dirname.replace('.config',''),
          exclude :['version.json'],
          verbose :true
        }),
        new ExtractTextPlugin('[name].[hash].css', {
          disable: false
        }),
        new HtmlWebpackPlugin({
          template: './src/index.html',
          inject: 'body'
        }),
        new VersionFile({
          packageFile: packageFile,
          template: path.join(__dirname, 'version.ejs'),
          outputFile: path.join(buildDirectory, 'version.json')
        }),
        new webpack.NoErrorsPlugin(), // Only emit files when there are no errors
        new webpack.optimize.DedupePlugin(), // Dedupe modules in the output
        new LiveReloadPlugin(options)
      ],
      devServer: {
        contentBase: '../build',
        stats: {
          modules: false,
          cached: false,
          colors: true,
          chunk: false
        }
      }
    },

    DIST: {
      entry: {
        main: [
          './src/app/modules/home/home.module.js'
        ]
      },
      output: {
        path: __dirname.replace('.config', '') + '/dist',
        publicPath: '/', // Output path from the view of the page
        filename: '[name].' + appVersion + '.[hash].js', // Filename for entry points
        chunkFilename: '[name].' + appVersion + '.[hash].js' // Filename for non-entry points
      },
      devtool: 'source-map',
      module: {}, // Defined below
      postcss: [ // Add vendor prefixes to your css
        autoprefixer({
          browsers: ['last 2 version']
        })
      ],
      plugins: [
        // Extract css files
        // Disabled when in test mode or not in build mode
        new ExtractTextPlugin('[name].[hash].css', {
          disable: false
        }),
        new VersionFile({
          packageFile: packageFile,
          template: path.join(__dirname, 'version.ejs'),
          outputFile: path.join(buildDirectory, 'version.json')
        }),
        new webpack.NoErrorsPlugin(), // Only emit files when there are no errors
        new webpack.optimize.DedupePlugin(), // Dedupe modules in the output
        new webpack.optimize.UglifyJsPlugin() // Minify all javascript, switch loaders to minimizing mode
      ],
      devServer: {
        contentBase: '../build',
        stats: {
          modules: false,
          cached: false,
          colors: true,
          chunk: false
        }
      }
    },

    TEST: {
      entry: {},
      output: {},
      devtool: 'inline-source-map',
      module: {}, // Defined below
      postcss: [ // Add vendor prefixes to your css
        autoprefixer({
          browsers: ['last 2 version']
        })
      ],
      plugins: [
        // Extract css files
        // Disabled when in test mode or not in build mode
        new ExtractTextPlugin('[name].[hash].css', {
          disable: true
        })
      ],
      devServer: {
        contentBase: '../build',
        stats: {
          modules: false,
          cached: false,
          colors: true,
          chunk: false
        }
      }
    }
  };

  /**
   * Environment type
   * BUILD is for generating minified builds
   * TEST is for generating test builds
   */
  var BUILD = !!options.BUILD;
  var DIST = !!options.DIST;
  var TEST = !!options.TEST;
  var currentEnv = DIST ? 'DIST' : (TEST ? 'TEST' : 'BUILD');

  /**
   * Config
   * Reference: http://webpack.github.io/docs/configuration.html
   * This is the object where all configuration gets set
   */
  var config = {};

  /**
   * Loaders
   * Default loader
   */
  var default_module = {
    preLoaders: [],
    loaders: [{
        test: /\.js$/,
        loader: 'babel', // Transpile .js using babel-loader : compiles ES6 & ES7 into ES5 code
        exclude: /node_modules/
      },
      {
        // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
        // Rename the file using the asset hash
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: 'file'
      },
      {
        test: /\.html$/,
        loader: 'raw' // Loading html through js
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      {
        // Allow loading css through js & postprocess your css with PostCSS plugins
        // Extract css files in production builds & use style-loader in development
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
      }
    ]
  };
  conf['BUILD'].module = clone(default_module);
  conf['DIST'].module = clone(default_module);
  conf['TEST'].module = clone(default_module);

  if (TEST) {
    // ISPARTA LOADER
    // Instrument JS files with Isparta for subsequent code coverage reporting
    // Skips node_modules and files that end with .test.js
    conf['TEST'].module.preLoaders.push({
      test: /\.js$/,
      exclude: [
        /node_modules/,
        /\.test\.js$/
      ],
      loader: 'isparta-instrumenter'
    });

    // Skip loading css in test mode
    conf['TEST'].module.loaders[4].loader = 'null';
  }

  return conf[currentEnv];
};
