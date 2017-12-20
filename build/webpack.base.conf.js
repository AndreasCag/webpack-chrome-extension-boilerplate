const HtmlWebpackPlugin = require('html-webpack-plugin');
const _ = require('lodash');

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
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: 'pug-loader',
      },
      {
        test: /\.styl$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'stylus-loader' },
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
    ],
  },
  plugins: [
    ..._.map(
      entryPoints,
      entryPoint => (
        new HtmlWebpackPlugin({
          template: resolve('src', 'pug', `${entryPoint}.pug`),
          filename: `${entryPoint}.html`,
          chunks: [entryPoint],
        })
      ),
    ),
  ],
};