const isProd    = process.env.NODE_ENV === 'production';
const sourceMap = isProd ? 'nosources-source-map' : 'eval-source-map';


const
    myDirect              = require('./direct'),
    path                  = require('path'),
    webpack               = require('webpack'),
    CleanWebpackPlugin    = require('clean-webpack-plugin'),
    HtmlWebpackPlugin     = require('html-webpack-plugin'),
    ExtractTextPlugin     = require('extract-text-webpack-plugin'),
    FaviconsWebpackPlugin = require('favicons-webpack-plugin');


const
    develop = myDirect.develop,
    production = myDirect.production;
const
    SRC_DIR = path.join(__dirname, develop),
    DIST_DIR = path.join(__dirname, production);


//============================================================
// Plugins
const cleanFolderProd = new CleanWebpackPlugin(production);

const commonsChunk = new webpack.optimize.CommonsChunkPlugin({
  name: ['app', 'vendor', 'webpack'],
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
      chunks: ['app', 'vendor', 'webpack'],
    });

const extractCss = new ExtractTextPlugin({
      disable: !isProd,
      filename: 'style/[name].[chunkhash].css',
    });

const uglifyJs = new webpack.optimize.UglifyJsPlugin({
      parallel: {cache: true, workers: 2},
      sourceMap: true,
    });

const definePlugin = new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify('production')},
    });


//============================================================
// Config html
const htmlConfig = [
  {
    loader: 'html-loader',
    options: {minimize: isProd},
  }];

// Config css
const
    cssDev  = ['css-loader', 'sass-loader'],
    cssProd = [
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          plugins() { return [require('autoprefixer'), require('cssnano')]; },
        },
      },
      'sass-loader',
    ],
    cssConfig = isProd ? cssProd : cssDev;

// Config fonts
const fontConfig = [
  {
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
      outputPath: 'fonts/',
    },
  }];

// Config svg
const svgConfig = [
  {
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
      outputPath: 'svg/',
    },
  }];

// Config img
const
    imgDev = [
      {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'images/',
        },
      }],
    imgProd = [
      {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'images/',
        },
      },
      {
        loader: 'image-webpack-loader',
        options: {
          optipng: {optimizationLevel: 7},
          pngquant: {quality: '65-90', speed: 4},
          mozjpeg: {progressive: true, quality: 65},
        },
      },
    ],
    imgConfig = isProd ? imgProd : imgDev;


//============================================================
// WebPack
const config = {
  devtool: sourceMap,

  entry: {
    vendor: ['react', 'react-dom'],
    app: SRC_DIR + '/App',
  },

  output: {
    path: DIST_DIR + '/',
    filename: 'js/[name].[chunkhash].bundle.js',
    sourceMapFilename: '[file].map',
    publicPath: '/',
  },

  module: {
    rules: [
      // html-loader
      {
        include: SRC_DIR,
        test: /\.html$/,
        use: htmlConfig,
      },
      // css-loader
      {
        include: [
          path.resolve(__dirname, `${develop}`),
        ],
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: cssConfig,
          publicPath: './',
        }),
      },
      // babel-loader
      {
        include: [
          path.resolve(__dirname, `${develop}`),
        ],
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
      },
      // img via file-loader
      {
        include: path.resolve(__dirname, `${develop}/images/`),
        test: /\.(jpg|png)$/,
        use: imgConfig,
      },
      // fonts via file-loader
      {
        include: path.resolve(__dirname, `${develop}/fonts/`),
        test: /\.(woff|woff2|svg)$/,
        use: fontConfig,
      },
      // svg via file-loader
      {
        include: path.resolve(__dirname, `${develop}/svg/`),
        test: /\.(svg)$/,
        use: svgConfig,
      },
    ],
  },

  devServer: {
    port: 9000,
    open: true,
    inline: true,
    historyApiFallback: true,
  },

  // shortcuts
  resolve: {
    alias: {
      'root': path.resolve(__dirname, develop),
    },
  },

  plugins: isProd ? [
   cleanFolderProd,
    commonsChunk,
    favicons,
    htmlIndex,
    extractCss,
    definePlugin,
    uglifyJs,
  ] : [
    commonsChunk,
    htmlIndex,
    extractCss,
  ],
};

module.exports = config;
