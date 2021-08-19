const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = merge(common, {
  watch: true,
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: '/src',
    historyApiFallback: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
    new HtmlWebpackPlugin({
      title: 'Production',
      template: __dirname + '/src/index.html',
      filename: 'index.html',
      inject: 'body'
    })
  ],
  module: {
    rules: [{
      test: /\.(scss|css)$/,
      use: [
        "style-loader", // creates style nodes from JS strings
        "css-loader", // translates CSS into CommonJS
        "sass-loader" // compiles Sass to CSS, using Node Sass by default
      ]
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/'
  }
});