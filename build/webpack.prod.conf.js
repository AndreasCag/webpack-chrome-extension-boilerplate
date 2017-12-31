const WebpackMerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const webpack = require('webpack');

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
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      sourceMap: true,
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true,
      },
    }),
  ],
};

module.exports = WebpackMerge(WebpackBaseConfig, WebpackProdConfig);