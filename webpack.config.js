// @AngularClass

/*
 * Helper: root(), and rootDir() are defined at the bottom
 */
var path = require('path');
var webpack = require('webpack');

var AssetsPlugin = require('assets-webpack-plugin');
var assetsPluginInstance = new AssetsPlugin({path: path.join(__dirname, 'frontend')});

// Webpack Plugins
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

var production = process.env.NODE_ENV === 'production';

var plugins = [
  new CommonsChunkPlugin({ name: 'vendor', filename: 'vendor_[hash].bundle.js', minChunks: Infinity }),
  // new CommonsChunkPlugin({ name: 'common', filename: 'common_[hash].bundle.js', minChunks: 2, chunks: ['app', 'vendor'] }),
  assetsPluginInstance
];

var entries = {
  'vendor': './frontend/src/vendor.ts',
  'dashboard': './frontend/src/dashboard/dashboard.bootstrap.ts', // dashboard page
  'customer-search': './frontend/src/customer/customer-search.bootstrap.ts', // customer search page
  'customer-details': './frontend/src/customer/customer-details-form.bootstrap.ts', // customer details page
};

if (production) {
  plugins = plugins.concat([
    // This plugin look for similar chunks and files
    // and merges them for better caching by the user
    new webpack.optimize.DedupePlugin(),

    // This plugin minifies all the Javascript code of the final bundle
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warning: false
      }
    })
  ]);
}

/*
 * Config
 */
module.exports = {
  // for faster builds use 'eval'
  devtool: production ? false : 'source-map',
  debug: !production, // remove in production

  entry: entries,

  // Config for our build files
  output: {
    path: path.join(__dirname, "public", "wassets"),
    filename: '[name]_[hash].bundle.js',
    sourceMapFilename: '[name]_[hash].map',
    chunkFilename: '[id].chunk.js',
    publicPath: "wassets/"
  },

  resolve: {
    // ensure loader extensions match
    extensions: ['','.ts','.js','.json', '.css', '.html']
  },

  module: {
    // preLoaders: [ { test: /\.ts$/, loader: 'tslint-loader' } ],
    loaders: [
      // Support for .ts files.
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        query: {
          'ignoreDiagnostics': [
            2403, // 2403 -> Subsequent variable declarations
            2300, // 2300 -> Duplicate identifier
            2374, // 2374 -> Duplicate number index signature
            2375  // 2375 -> Duplicate string index signature
          ]
        },
        exclude: [ /\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/ ]
      },

      // Support for *.json files.
      { test: /\.json$/,  loader: 'json-loader' },

      // Support for CSS as raw text
      { test: /\.css$/,   loader: 'raw-loader' },

      // ngtemplate-loader
      {test: /\.html$/, loader: 'file-loader' }
    ],
    noParse: [ /.+zone\.js\/dist\/.+/, /.+angular2\/bundles\/.+/ ]
  },

  plugins: plugins,

  // Other module loader config
  tslint: {
    emitErrors: false,
    failOnHint: false
  },

  // for vagrant
  watchOptions: {
    poll: 1000
  }
};

// Helper functions

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}

function rootNode(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return root.apply(path, ['node_modules'].concat(args));
}
