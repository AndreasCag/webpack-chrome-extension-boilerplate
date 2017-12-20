const WebpackMerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

const WebpackBaseConfig = require('./webpack.base.conf');
const resolve = require('../helpers/resolve');

const serverPath = resolve('server-source');

const WebpackDevConfig = {
  output: {
    path: serverPath,
  },
  devServer: {
    contentBase: serverPath,
    port: 9000,
  },
  plugins: [
    new WriteFilePlugin(),
    new CleanWebpackPlugin(
      ['server-source'],
      { root: resolve() },
    ),
  ],
  devtool: 'inline-source-map',
};

module.exports = WebpackMerge(WebpackBaseConfig, WebpackDevConfig);