const WebpackMerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const WebpackBaseConfig = require('./webpack.base.conf');
const resolve = require('../helpers/resolve');

const distPath = resolve('dist');

const WebpackProdConfig = {
  output: {
    path: distPath,
  },
  plugins: [
    new CleanWebpackPlugin(
      ['dist'],
      { root: resolve() },
    ),
  ],
};

module.exports = WebpackMerge(WebpackBaseConfig, WebpackProdConfig);