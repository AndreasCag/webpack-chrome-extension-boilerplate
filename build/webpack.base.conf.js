const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const _ = require('lodash');
const path = require('path');

const resolve = require('../helpers/resolve');

const entryPoints = [
  'popup',
  'options',
  'background',
];

module.exports = {
  entry: {
    ..._.zipObject(
      entryPoints,
      _.map(entryPoints, entryPoint => resolve('src', 'js', entryPoint)),
    ),
  },
  output: {
    filename: '[name].[hash].bundle.js',
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, '..', 'src'),
      root: resolve('.'),
      public: resolve('public'),
    },
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          { loader: 'html-loader' },
          { loader: 'pug-html-loader' },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'env',
              'es2015',
            ],
          },
        },
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              outputPath: '/public/',
            },
          },
        ],
      },
    ],
  },
  plugins: [

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: 3,
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor'],
    }),

    ..._.map(
      entryPoints,
      entryPoint => (
        new HtmlWebpackPlugin({
          template: resolve('src', 'pug', `${entryPoint}.pug`),
          filename: `${entryPoint}.html`,
          chunks: ['manifest', 'vendor', entryPoint],
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            // more options:
            // https://github.com/kangax/html-minifier#options-quick-reference
          },
        })
      ),
    ),

  ],
};