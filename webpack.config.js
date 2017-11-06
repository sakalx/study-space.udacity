const isProd = process.env.NODE_ENV === 'production';
const sourceMap = isProd ? 'nosources-source-map' : 'eval-source-map';

const
    path = require('path'),
    webpack = require('webpack'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const
    develop = 'meals.app',
    production = 'dist';

const
    SRC_DIR = path.join(__dirname, develop),
    DIST_DIR = path.join(__dirname, production);

//============================================================
// Plugins
const cleanFolderProd = new CleanWebpackPlugin(production);

const commonsChunk = new webpack.optimize.CommonsChunkPlugin({
  name: ['index', 'vendor'],
});

const favicons = new FaviconsWebpackPlugin({
  logo: `./${develop}/favicon/logo.png`,
  prefix: 'favicon/',
  emitStats: false,
  inject: true,
  background: '#fff',
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: true,
    coast: false,
    favicons: true,
    firefox: true,
    opengraph: false,
    twitter: false,
    yandex: false,
    windows: true,
  },
});

const htmlIndex = new HtmlWebpackPlugin({
  template: path.join(__dirname, develop, 'index.html'),
  inject: 'body',
  hash: true,
  filename: 'index.html',
  chunks: ['index', 'vendor'],
});

const uglifyJs = new webpack.optimize.UglifyJsPlugin({
  parallel: {cache: true, workers: 2},
  sourceMap: true,
});

const definePlugin = new webpack.DefinePlugin({
  'process.env': {NODE_ENV: JSON.stringify('production')},
});

//============================================================
// WebPack
const config = {
  devtool: sourceMap,

  entry: {
    vendor: ['react', 'react-dom'],
    index: SRC_DIR + '/index',
  },

  output: {
    path: DIST_DIR + '/',
    filename: 'js/[name].[chunkhash].bundle.js',
    sourceMapFilename: '[file].map',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        include: SRC_DIR,
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {minimize: isProd},
        },
      },
      {
        include: path.resolve(__dirname, `${develop}`),
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
      },
    ],
  },

  devServer: {
    port: 3000,
    open: true,
    inline: true,
    historyApiFallback: true,
  },

  resolve: {
    alias: {'root': path.resolve(__dirname, develop)},
  },

  plugins: isProd ? [
    cleanFolderProd,
    commonsChunk,
    favicons,
    htmlIndex,
    definePlugin,
    uglifyJs,
  ] : [
    commonsChunk,
    htmlIndex,
  ],
};

module.exports = config;